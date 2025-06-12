import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2).max(8),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["client", "admin"])
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});