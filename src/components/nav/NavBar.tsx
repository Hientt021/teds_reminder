import { useAppSelector } from "@/store";
import UserDropdown from "../dropdown/UserDropdown";
export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  return (
    <div className="flex justify-between w-full items-center p-5 shadow-lg">
      <div></div>
      <div className="flex gap-3">
        <UserDropdown />
      </div>
    </div>
  );
}
