"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
export interface ITabsComponentProps {
  tabs: ITab[];
}

interface ITab {
  value: any;
  label: string;
  render: React.ReactNode;
}

export default function TabsComponent(props: ITabsComponentProps) {
  const { tabs } = props;
  const [value, setValue] = useState(tabs[0].value);
  return (
    <TabContext value={value}>
      <Box className="flex w-full gap-10">
        <Box sx={{ minWidth: 300 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {tabs.map((tab, i) => (
              <Tab key={i} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Box className="flex-1">
          {tabs.map((tab, i) => (
            <TabPanel key={i} value={tab.value}>
              {tab.render}
            </TabPanel>
          ))}
        </Box>
      </Box>
    </TabContext>
  );
}
