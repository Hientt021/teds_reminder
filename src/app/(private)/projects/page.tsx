"use client";
import AddNewProject from "@/app/(private)/projects/components/AddNewProject";
import TaskDashboard from "./components/ProjectDashboard";
import { useEffect, useState } from "react";
import api from "@/api";

export interface IToDoProps {}

export default function ToDo(props: IToDoProps) {
  const [data, setData] = useState([]);
  const getTasks = async () => {
    const res = await api.getTasks();

    if (res) setData(data);
  };
  useEffect(() => {}, []);
  return (
    <div>
      <AddNewProject />
      {!!data.length && <TaskDashboard data={data} />}
    </div>
  );
}
