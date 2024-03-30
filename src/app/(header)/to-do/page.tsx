"use client";
import AddNewTask from "@/components/task/AddNewTask";
import TaskDashboard from "./components/TaskDashboard";
import { useEffect, useState } from "react";
import api from "@/api";

export interface IToDoProps {}

export default function ToDo(props: IToDoProps) {
  const [data, setData] = useState([]);
  const getTasks = async () => {
    const res = await api.getTasks();

    if (res) setData(data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <AddNewTask />
      {!!data.length && <TaskDashboard data={data} />}
    </div>
  );
}
