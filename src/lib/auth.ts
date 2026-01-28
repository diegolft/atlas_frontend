import Cookies from "js-cookie";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { LoginInput, LoginResponse } from "@/types/auth.types";

export const authLib = {
  login: async (data: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      data,
    );

    const { token } = response.data;

    // Set token in cookie (expires in 7 days)
    Cookies.set("token", token, { expires: 7 });

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout failed on server", error);
    } finally {
      // Always remove cookie on client
      Cookies.remove("token");
    }
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get("token");
  },

  getToken: (): string | undefined => {
    return Cookies.get("token");
  },
};
