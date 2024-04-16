import PageContainer from "@/components/card/PageContainer";
import ProjectDashboard from "./components/ProjectDashboard";

export interface ITProjectsProps {}

export default function Projects(props: ITProjectsProps) {
  return (
    <PageContainer title="Projects">
      <ProjectDashboard />
    </PageContainer>
  );
}
