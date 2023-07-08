import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RangeSlider from './RangeSlider';
import PcdLoadUI from './PcdLoadUI';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" sx={{ p: 0, width:"100%", height: '70px'}}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
      <Box  component="div" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Project" {...a11yProps(0)} />
          <Tab label="PointCloud" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box component="div" sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", height:"100%"}}>
          <PcdLoadUI name="PCD Map"/>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Height */}
        <RangeSlider />
      </TabPanel>
    </Box>
  );
}
