import { SocialRegisterParams } from "@/types/social-register-params";
import apiClient from "./api-client";

export const register = (params: SocialRegisterParams) => {
  return apiClient.post(`/auth/${params.provider}/callback`, params);
};