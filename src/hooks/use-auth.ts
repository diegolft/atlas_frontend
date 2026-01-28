import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authLib } from "@/lib/auth";
import type { LoginInput } from "@/types/auth.types";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authLib.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao realizar login");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authLib.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
      toast.success("Logout realizado com sucesso");
    },
  });
}
