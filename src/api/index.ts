"use client";
import axios, { Method } from "axios";
import endpoints from "./endpoints";
import request from "./request";

export interface IApiResponse<T = {}> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

interface IOption {
  headers?: { [key: string]: any };
  params?: object;
}

const gen = (params: string) => {
  let url = params;
  let method: Method = "GET";

  const paramsArray = params.split(" ");
  if (paramsArray.length === 2) {
    method = paramsArray[0] as Method;
    url = paramsArray[1];
  }

  return async (payload: any, options: any) => {
    return request({
      ...options,
      method,
      url,
      data: JSON.stringify(payload),
    });
  };
};

type APIMap = {
  [key in keyof typeof endpoints]: <T>(data?: any, option?: any) => Promise<T>;
};

const api: any = Object.keys(endpoints).reduce((prev, key) => {
  return (prev = {
    ...prev,
    [key]: gen((endpoints as any)[key]),
  });
}, {});

export default api as APIMap;
