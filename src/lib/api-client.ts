import Cookies from "js-cookie";
import type { ApiErrorResponse } from "@/types/api.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

export class ApiError extends Error {
  statusCode: number;
  data: ApiErrorResponse | null;

  constructor(
    message: string,
    statusCode: number,
    data: ApiErrorResponse | null = null,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, headers = {}, ...customConfig } = options;

  const token = Cookies.get("token");
  const authHeaders: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const config: RequestInit = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
  };

  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, config);
  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    // Handle 401 Unauthorized - could dispatch a logout event here if needed
    if (response.status === 401) {
      Cookies.remove("token");
    }

    throw new ApiError(
      data.message || "Something went wrong",
      response.status,
      data,
    );
  }

  return data;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),

  upload: <T>(endpoint: string, formData: FormData, options?: FetchOptions) => {
    const { params, headers = {}, ...customConfig } = options || {};
    const token = Cookies.get("token");
    const authHeaders: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    let url = `${API_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return fetch(url, {
      ...customConfig,
      method: "POST",
      headers: {
        ...authHeaders,
        ...headers,
        // Não definir Content-Type para FormData, o browser define automaticamente
      },
      body: formData,
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove("token");
        }

        throw new ApiError(
          data.message || "Something went wrong",
          response.status,
          data,
        );
      }

      return data as T;
    });
  },
};
