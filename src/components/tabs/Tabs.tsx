/*********************************************************************
 * @module Tabs
 * @author 
 * @version 1.0.0
 *********************************************************************/

import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Badge, useColorModeValue } from '@chakra-ui/react';

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

  const tabBgColor = useColorModeValue('gray.200', 'gray.700');
  const tabActiveBgColor = useColorModeValue('blue.500', 'blue.200');
  const tabTextColor = useColorModeValue('black', 'white');
  const tabSelectedTextColor = useColorModeValue('white', 'black');
  const badgeBgColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
  const badgeTextColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900');

  return (
    <Tabs variant="soft-rounded" onChange={handleTabChange} index={['notes', 'tasks'].indexOf(currentTab)}>
      <TabList display="flex" justifyContent="space-between">
        <Tab
          bg={tabBgColor}
          color={tabTextColor}
          _selected={{ color: tabSelectedTextColor, bg: tabActiveBgColor }}
          mr={2}
        >
          Notes {noteCount > 0 && <Badge ml="1" bg={badgeBgColor} color={badgeTextColor}>{noteCount}</Badge>}
        </Tab>
        <Tab
          bg={tabBgColor}
          color={tabTextColor}
          _selected={{ color: tabSelectedTextColor, bg: tabActiveBgColor }}
          mr={2}
        >
          Tasks {taskCount > 0 && <Badge ml="1" bg={badgeBgColor} color={badgeTextColor}>{taskCount}</Badge>}
        </Tab>
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
