"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";
import BasicModal from "@/components/modal/BasicModal";
import CreateTaskForm from "./CreateTaskForm";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { IBoard, ITask } from "@/type";
import TaskCard from "./TaskCard";
import Dropdown from "@/components/dropdown/Dropdown";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import WarningModal from "@/components/modal/WarningModal";
import { toast } from "@/utils/toast";
import { LoadingButton } from "@mui/lab";
export interface IBoardComponentProps {
  board: IBoard;
  tasks: ITask[];
  onDelete: () => void;
  onBoardChange: (newTitle: string) => void;
}

export default function BoardComponent(props: IBoardComponentProps) {
  const { board, onBoardChange, tasks, onDelete } = props;
  const { title } = board;
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [isEdit, setIsEdit] = useState(!title);
  const [value, setValue] = useState(title);
  const [loading, setLoading] = useState(false);
  const options = [
    {
      label: "Edit ",
      value: "edit",
      onClick: () => setIsEdit(true),
      icon: <Edit />,
    },
    {
      label: "Delete ",
      value: "delete",
      onClick: () => onDelete(),
      icon: <Delete />,
    },
  ];

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Stack minWidth={300} spacing={1}>
      <Box
        className="flex justify-between items-center gap-10"
        px={2}
        py={1}
        borderRadius={2}
      >
        {isEdit ? (
          <Box className="flex gap-3 items-center">
            <TextField
              size="small"
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
              variant="standard"
            />

            <LoadingButton
              startIcon={
                <DoneIcon
                  fontSize="small"
                  color="primary"
                  className="cursor-pointer"
                />
              }
              onClick={async () => {
                setLoading(true);
                try {
                  if (value) {
                    setIsEdit(false);
                    if (title !== value) {
                      onBoardChange(value);
                      toast("Board name is changed", "success");
                    }
                  }
                } catch (e: any) {
                  toast(e.message, "error");
                } finally {
                  setLoading(false);
                }
              }}
            />
          </Box>
        ) : (
          <Typography color="primary" fontWeight={600}>
            {title}
          </Typography>
        )}
        <Dropdown
          options={options}
          icon={<MoreHoriz />}
          onValueChange={(value) => {
            const option = options.find((el) => el.value === value);
            if (option) option.onClick();
          }}
        />
      </Box>
      {tasks.map((task: any) => (
        <TaskCard task={task} />
      ))}
      <Button
        onClick={onOpen}
        variant="text"
        sx={{ textTransform: "capitalize" }}
        startIcon={<ControlPointIcon />}
      >
        Add task
      </Button>
      <BasicModal open={open} onClose={onClose}>
        <CreateTaskForm onClose={onClose} board={title!!} />
      </BasicModal>
      <WarningModal
        confirmText="Delete this board"
        open={openWarning}
        onCancel={() => setOpenWarning(false)}
        onConfirm={onDelete}
      >
        <Typography>
          Delete this board will also remove all your tasks in this. Are you
          sure you want to continue?
        </Typography>
      </WarningModal>
    </Stack>
  );
}
