import { z } from "zod";

// Schema mirrored from backend for validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

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
