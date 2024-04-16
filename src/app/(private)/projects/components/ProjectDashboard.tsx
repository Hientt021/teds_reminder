"use client";

import Dropdown from "@/components/dropdown/Dropdown";
import DataTable from "@/components/table/DataTable";
import { ROUTES } from "@/routes/const";
import { useAppDispatch } from "@/store";
import { projectActions } from "@/store/features/projectSlice";
import { IProject } from "@/type";
import { toast } from "@/utils/toast";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import BasicModal from "../../../../components/modal/BasicModal";
import CreateProjectForm from "./CreateProjectForm";
export interface IProjectDashboardProps {}

export default function ProjectDashboard(props: IProjectDashboardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [open, setOpen] = useState(false);

  const actionOptions = [
    {
      label: "View",
      value: "view",
      icon: <VisibilityIcon />,
      onclick: (projectId: string) =>
        router.push(ROUTES.PROJECTS + "/" + projectId),
    },
    {
      label: "Delete",
      value: "delete",
      icon: <DeleteIcon />,
      onclick: (projectId: string) => handleDeleteProject(projectId),
    },
  ];

  const columns: GridColDef[] = [
    { field: "title", headerName: "Project title", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "start_date",
      headerName: "Start date",
      flex: 1,
      renderCell: (params) =>
        dayjs.unix(params.row.start_date).format("MMM DD, YYYY"),
    },
    {
      field: "end_date",
      headerName: "End date",
      flex: 1,
      renderCell: (params) =>
        dayjs.unix(params.row.end_date).format("MMM DD, YYYY"),
    },
    {
      field: "tasks",
      headerName: "Tasks",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Dropdown
          onValueChange={(value) => {
            const option = actionOptions.find((el) => el.value === value);
            option?.onclick(row.id);
          }}
          options={actionOptions}
          icon={<MoreHorizIcon />}
        />
      ),
    },
  ];

  const getProjects = async () => {
    try {
      const res = await dispatch(projectActions.getProjects());
      if (res) {
        setProjects((res.payload as any)?.data);
      }
    } catch (e: any) {
      toast(e.message, "error");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await dispatch(
        projectActions.deleteProject({ id: projectId })
      );
      if (res) {
        toast("Delete project successfully", "success");
        getProjects();
      }
    } catch (e: any) {
      toast(e.message, "error");
    }
  };

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Box>
      <Button
        sx={{ float: "right", mb: 2 }}
        variant="outlined"
        onClick={onOpen}
      >
        Add New Project
      </Button>

      <BasicModal
        open={open}
        onClose={onClose}
        header={<Typography variant="h6">Create new project</Typography>}
      >
        <CreateProjectForm onSuccess={getProjects} onClose={onClose} />
      </BasicModal>

      <DataTable columns={columns} rows={projects} />
    </Box>
  );
}
