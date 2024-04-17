"use client";

import { BASE_URL } from "@/const";
import { useAppSelector } from "@/store";
import { Box, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
export interface IAvatarProps {
  src?: string;
  size?: number;
  editable?: boolean;
  onChange?: (file: File) => void;
}

const defaultSize = 50;

export default function Avatar(props: IAvatarProps) {
  const { src, size = defaultSize, editable = false, onChange } = props;
  const [uploadFile, setUploadFile] = useState("");

  const onUpload = (event: any) => {
    const files = event.target.files;
    const avatar = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(avatar);

    reader.addEventListener("load", (e: any) => {
      const url = e?.target?.result;

      onChange && onChange(avatar);
      setUploadFile(url);
    });
  };

  useEffect(() => {
    if (src) setUploadFile(src);
  }, [src]);

  return (
    <Box
      width={size}
      height={size}
      sx={{
        border: "1px solid #33ab9f",
        borderRadius: "50%",
        boxSizing: "border-box",
      }}
      className={"flex justify-center items-center relative"}
    >
      <img
        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        src={uploadFile}
      />
      {editable && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            cursor: "pointer",
            transform: "translate(-25%, -25%)",
            border: "1px solid " + teal[500],
            borderRadius: "50%",
            p: "5px",
            background: "#F5F5F9",
            zIndex: 3,
          }}
          onClick={() => document.getElementById("upload")?.click()}
        >
          <EditIcon color={"primary"} />
          <TextField
            sx={{ display: "none" }}
            id="upload"
            type="file"
            name="avatar"
            onChange={onUpload}
          >
            Upload
          </TextField>
        </Box>
      )}
    </Box>
  );
}
