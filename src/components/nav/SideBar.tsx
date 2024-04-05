import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import Link from "next/link";
import Logo from "./Logo";
import { ROUTES } from "@/routes/const";
import SideBarItem from "./SideBarItem";
import CardComponent from "../card/CardComponent";
export interface ISideBarProps {}

export default function SideBar(props: ISideBarProps) {
  const links = [
    {
      value: ROUTES.DASHBOARD,
      icon: <DashboardIcon />,
    },
    {
      value: ROUTES.CALENDAR,
      icon: <CalendarTodayIcon />,
    },
    {
      value: ROUTES.ORGANIZATIONS,
      icon: <BusinessIcon />,
    },
    {
      value: ROUTES.PROJECTS,
      icon: <AssignmentIcon />,
    },
  ];

  return (
    <div
      className="flex flex-col h-full p-5 pr-0"
      style={{ background: "#009688" }}
    >
      <div className="p-3 mb-10">
        <Logo />
      </div>
      {links.map((el) => (
        <Link key={el.value} href={el.value}>
          <SideBarItem icon={el.icon} label={el.value} />
        </Link>
      ))}
    </div>
  );
}
