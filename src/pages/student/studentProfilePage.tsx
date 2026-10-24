import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Mail,
  CheckCircle2,
  Save,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

export default function StudentProfilePage() {
  const { user, updateUserBio } = useAuth();
  const [bio, setBio] = useState(user?.bio || "Pre-final year CSE student passionate about distributed systems and Go.");
  const [skills, setSkills] = useState<string[]>(user?.skills || ["Go", "TypeScript", "React", "Docker"]);
  const [newSkill, setNewSkill] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserBio(bio, skills);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            My Student Profile
          </h1>
          <p className="text-xs text-secondary">
            Manage your academic credentials, technical summary, and skills visible to alumni mentors.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          Demo Profile
        </Badge>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes updated in your demo session!</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-sm bg-accent text-white font-bold text-xl flex items-center justify-center shadow-sm">
            {user?.initials || "AR"}
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-primary">
              {user?.fullName || "Alex Rivera"}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                {user?.department || "Computer Science & Engineering"} (Class of {user?.graduationYear || 2026})
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5 text-accent" />
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary">
              Professional Biography &amp; Career Aspirations
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-sm border border-border bg-[#F8F8F5] p-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <p className="text-[11px] text-secondary">
              Mention your primary technical interests, recent projects, and target role types.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary">
              Technical Skills &amp; Stack
            </label>
            <div className="flex flex-wrap gap-1.5 pb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#F2F2EC] border border-border text-xs font-mono text-primary"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-secondary hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-sm">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. Kubernetes, Python)..."
                className="h-8 text-xs bg-[#F8F8F5]"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddSkill}
                className="h-8 text-xs gap-1 border-border shrink-0"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" size="sm" className="text-xs gap-1.5 px-4">
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
