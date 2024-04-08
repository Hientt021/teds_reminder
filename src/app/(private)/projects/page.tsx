import AddNewProject from "@/app/(private)/projects/components/AddNewProject";
import ProjectDashboard from "./components/ProjectDashboard";

export interface ITProjectsProps {}

export default function Projects(props: ITProjectsProps) {
  return (
    <div>
      <AddNewProject />
      <ProjectDashboard />
    </div>
  );
}
