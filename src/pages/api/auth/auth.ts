import { SocialRegisterParams } from "@/types/social-register-params";
import apiClient from "./api-client";

export const register = (params: SocialRegisterParams) => {
  console.log(params)
  console.log(params.provider)
  return apiClient.post(`/auth/${params.provider}/callback`, params);
};