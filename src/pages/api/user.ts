import { GetCurrentUserParams, User } from "@/types";
import apiClient from "./api-client";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const getUsers = () => {
  return apiClient.get("/users");
};

export const getCurrentUser = (params: GetCurrentUserParams): Promise<AxiosResponse<User>> => {
  const config: AxiosRequestConfig = {
    params: params
  };
  return apiClient.get("/users", config);
};