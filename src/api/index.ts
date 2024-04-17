"use client";

import { Method } from "axios";
import endpoints from "./endpoints";
import request from "./request";
import { IError, IResponse } from "@/type";
import { BASE_URL } from "@/const";

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
    const urlArr = url.split("/");

    const newArr = urlArr.map((str) => {
      if (payload && Object.keys(payload).some((key) => ":" + key === str)) {
        const curKey = str.slice(1);
        const value = payload[curKey];
        delete payload[curKey];
        return value;
      } else {
        return str;
      }
    });

    const reqOptions = {
      ...options,
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      method,
      url: newArr.join("/"),
      data: JSON.stringify(payload),
    };
    console.log(payload);
    return request(reqOptions)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        return Promise.reject(error.response as IError);
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
