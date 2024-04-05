import { Box, BoxProps } from "@mui/material";

export interface ICardComponentProps {
  className?: string;
  children: React.ReactNode;
}

export default function CardComponent(props: ICardComponentProps) {
  const { className, children } = props;
  return <div className={`${className} rounded-2xl shadow-lg`}>{children}</div>;
}
