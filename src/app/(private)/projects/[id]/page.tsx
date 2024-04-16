"use client";

import PageContainer from "@/components/card/PageContainer";
import { useAppDispatch } from "@/store";
import { projectActions } from "@/store/features/projectSlice";
import { toast } from "@/utils/toast";
import { Box, Button } from "@mui/material";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BoardComponent from "../components/BoardComponent";
import { IBoard, IProject, ITask } from "@/type";

export interface IProjectDetailsProps {}

export default function ProjectDetails(props: IProjectDetailsProps) {
  const params = useParams();
  const projectId = params?.id as string;
  const dispatch = useAppDispatch();
  const [projectDetails, setProjectDetails] = useState<IProject | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getProjectDetails = async () => {
    try {
      const res = await dispatch(projectActions.getProjectDetails(projectId));
      if (res) {
        const details = (res.payload as any).data;
        setProjectDetails(details);
      }
    } catch (e: any) {
      toast(e.message, "error");
    }
  };

  const getProjectTasks = async () => {
    try {
      const res = await dispatch(
        projectActions.getProjectTasks({ project_id: projectId })
      );
      if (res) {
        const taskList = (res.payload as any).data;
        setTasks(taskList);
      }
    } catch (e: any) {
      toast(e.message, "error");
    }
  };

  const updateProjectDetails = async (values: any) => {
    try {
      const res = await dispatch(
        projectActions.updateProject({ project_id: projectId, ...values })
      );
      if (res) {
        const details = (res.payload as any).data;
        console.log(details);
        setProjectDetails(details);
      }
    } catch (e: any) {
      toast(e.message, "error");
    }
  };

  const init = async () => {
    await getProjectDetails();
    await getProjectTasks();
  };

  useEffect(() => {
    init();
  }, []);

  const boards = useMemo(() => {
    return projectDetails ? projectDetails?.boards : [];
  }, [projectDetails]);

  return (
    <PageContainer title={projectDetails?.title || ""}>
      <Box className="flex justify-end my-3">
        <Button
          variant="contained"
          onClick={() =>
            setProjectDetails(
              (prev) =>
                prev && {
                  ...prev,
                  boards: [
                    ...prev?.boards,
                    { title: "", id: (prev?.boards?.length + 1).toString() },
                  ],
                }
            )
          }
        >
          Create new board
        </Button>
      </Box>
      <Box className="flex gap-3">
        {boards.map((el, i) => (
          <BoardComponent
            key={i}
            board={el}
            tasks={tasks.filter((task) => task.board === el.id)}
            onDelete={() => {
              const newBoards = boards.filter((board, index) => i !== index);
              updateProjectDetails({ boards: newBoards });
            }}
            onBoardChange={(newTitle: string) => {
              const newBoards = boards.map((board, index) =>
                i === index ? { ...board, title: newTitle } : board
              );

              updateProjectDetails({ boards: newBoards });
            }}
          />
        ))}
      </Box>
    </PageContainer>
  );
}
