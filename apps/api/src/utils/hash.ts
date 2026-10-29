import bcrypt from "bcryptjs";
import { env } from "../config/env.js";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(env.PASSWORD_HASH_COST);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
