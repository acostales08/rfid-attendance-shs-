import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import TabPanel from './TabPanel'; // Adjust the path based on your project structure

const ReusableTabs = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="h-full w-full ">
      <Box>
        <Paper elevation={3}  style={{ overflowX: 'auto' }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable"
              scrollButtons="auto">
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>
            {tabs.map((tab, index) => (
              <TabPanel key={index} value={value} index={index}>
                {tab.content}
              </TabPanel>
            ))}     
        </Paper>
      </Box>
    </div>
  );
};

export default ReusableTabs;
