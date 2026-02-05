import { z } from "zod";

// Schema mirrored from backend for validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email({ message: "Email inválido" }),
    phone: z.string().min(10, "Telefone deve ter no mínimo 10 caracteres"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    birthday: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export interface AuthContextType {
  user: UserContext | null;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface UserContext {
  id: number;
  email: string;
  name: string;
  currentEmpresaId: number;
}

export interface LoginResponse {
  token: string;
}
