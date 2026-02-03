import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, "Username at least 2 characters").max(32),
  password: z.string().min(6, "Password at least 6 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
