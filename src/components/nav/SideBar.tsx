import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import Logo from "./Logo";
export interface ISideBarProps {}

export default function SideBar(props: ISideBarProps) {
  const links = [
    {
      value: "dashboard",
      icon: <DashboardIcon />,
    },
    {
      value: "calendar",
      icon: <CalendarTodayIcon />,
    },
    {
      value: "to-do",
      icon: <AssignmentIcon />,
    },
  ];

  const getLabel = (str: string) => {
    const arr = str.split("-");
    return arr.join(" ");
  };
  return (
    <div className="flex flex-col h-full shadow-lg  p-5">
      <div className="p-3 mb-10">
        <Logo />
      </div>
      {links.map((el) => (
        <Link key={el.value} href={"/" + el.value}>
          <div
            key={el.value}
            className="capitalize flex gap-2 my-4 items-center"
          >
            {el.icon}
            {getLabel(el.value)}
          </div>
        </Link>
      ))}
    </div>
  );
}
