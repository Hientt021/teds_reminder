import PageContainer from "@/components/card/PageContainer";
import * as React from "react";
import MyProfileForm from "./components/MyProfileForm";
import TabsComponent from "@/components/tabs/TabsComponent";
import PasswordForm from "./components/PasswordForm";

export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
  const tabs = [
    {
      label: "Basic Info",
      value: "info",
      render: <MyProfileForm />,
    },
    {
      label: "Password",
      value: "password",
      render: <PasswordForm />,
    },
  ];
  return (
    <PageContainer title="Settings">
      <TabsComponent tabs={tabs} />
    </PageContainer>
  );
}
