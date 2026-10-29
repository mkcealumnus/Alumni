import type { FastifyPluginAsync } from "fastify";
import { directoryQuerySchema } from "@alumnux/schemas";
import type { ApiSuccessResponse, PublicDirectoryUser } from "@alumnux/types";
import { getDatabaseClient } from "../../db/connection.js";
import { getDepartmentByCode } from "@alumnux/domain";

export const directoryRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/v1/directory", async (request, reply) => {
    const parseResult = directoryQuerySchema.safeParse(request.query);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid query parameters",
          details: parseResult.error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        timestamp: new Date().toISOString(),
      });
    }

    const { page, limit, query, department, graduationYear, role } = parseResult.data;
    const db = getDatabaseClient();

    // Query active/verified users and their profiles
    const rawRows = await db.query<any>(
      `SELECT
        u.id, u.role, u.is_verified,
        p.full_name, p.headline, p.bio, p.department_code, p.graduation_year,
        p.current_company, p.current_role, p.location_city, p.skills_json,
        p.avatar_url, p.linkedin_url
       FROM \`users\` u
       JOIN \`profiles\` p ON u.id = p.user_id
       WHERE u.status IN ('ACTIVE', 'PENDING_VERIFICATION')
       ORDER BY p.graduation_year DESC;`
    );

    // Apply filtering
    let filtered = rawRows;

    if (role) {
      filtered = filtered.filter((r) => r.role === role);
    }

    if (department) {
      filtered = filtered.filter(
        (r) => r.department_code.toUpperCase() === department.toUpperCase()
      );
    }

    if (graduationYear) {
      filtered = filtered.filter((r) => r.graduation_year === graduationYear);
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter((r) => {
        const nameMatch = r.full_name?.toLowerCase().includes(q);
        const compMatch = r.current_company?.toLowerCase().includes(q);
        const roleMatch = r.current_role?.toLowerCase().includes(q);
        const skillsMatch = r.skills_json?.toLowerCase().includes(q);
        return nameMatch || compMatch || roleMatch || skillsMatch;
      });
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const offset = (page - 1) * limit;
    const pageRows = filtered.slice(offset, offset + limit);

    const data: PublicDirectoryUser[] = pageRows.map((r) => {
      let skills: string[] = [];
      if (r.skills_json) {
        try {
          skills = JSON.parse(r.skills_json);
        } catch {
          skills = [];
        }
      }
      const dept = getDepartmentByCode(r.department_code);

      return {
        id: r.id,
        fullName: r.full_name,
        role: r.role,
        departmentCode: r.department_code,
        departmentName: dept ? dept.name : r.department_code,
        graduationYear: r.graduation_year,
        headline: r.headline || undefined,
        bio: r.bio || undefined,
        currentCompany: r.current_company || undefined,
        currentRole: r.current_role || undefined,
        locationCity: r.location_city || undefined,
        skills,
        avatarUrl: r.avatar_url || undefined,
        linkedinUrl: r.linkedin_url || undefined,
        isVerified: Boolean(r.is_verified),
      };
    });

    const response: ApiSuccessResponse<PublicDirectoryUser[]> = {
      success: true,
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
    };

    return reply.status(200).send(response);
  });
};
