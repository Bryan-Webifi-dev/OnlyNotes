/*********************************************************************
 * @module Tabs
 * @author 
 * @version 1.0.0
 *********************************************************************/

import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Badge } from '@chakra-ui/react';

interface TabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  noteCount: number;
  taskCount: number;
}

/**
 * Tabs component
 * @param {TabsProps} props
 * @return {React.FC} Tabs component
 */
const CustomTabs: React.FC<TabsProps> = ({ currentTab, onTabChange, noteCount, taskCount }) => {
  const handleTabChange = (index: number) => {
    const tab = ['notes', 'tasks'][index];
    onTabChange(tab);
  };

  return (
    <Tabs variant="soft-rounded" onChange={handleTabChange} index={['notes', 'tasks'].indexOf(currentTab)}>
      <TabList
      >
        <Tab>Notes {noteCount > 0 && <Badge ml="1" colorScheme="green">{noteCount}</Badge>}</Tab>
        <Tab>Tasks {taskCount > 0 && <Badge ml="1" colorScheme="green">{taskCount}</Badge>}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* Content for Notes Tab */}
        </TabPanel>
        <TabPanel>
          {/* Content for Tasks Tab */}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export { CustomTabs };


