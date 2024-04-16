export interface IResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface IError {
  message: string;
  status: number;
}

export type IMessageType = "info" | "error" | "success" | "warning";

export interface IProject {
  title: string;
  created_by: string;
  id: string;
  members: string[];
  product_type: string[];
  status: string;
  boards: IBoard[];
}

export interface IBoard {
  title: string;
  id: string;
}

export interface ITaskPayload {
  title: string;
  description: string;
  members: string[];
  priority: string;
  deadline: number;
  scopes: string;
  status: string;
  project_id: string;
  board: string;
}

export interface ITask extends ITaskPayload {
  id: string;
  created_by: string;
}

export interface IUser {
  email: string;
  userName: string;
  created_at?: string;
  updated_at?: string;
  id: string;
  avatar?: string;
}
