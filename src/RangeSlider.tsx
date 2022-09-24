import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([10,15]);

  const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
  };

  return (
    <Box component="div" sx={{ width: 250, padding: '10px'}}>
      <Typography id="pcd-height-slider" gutterBottom>
        Height range: {value[0]} - {value[1]}
      </Typography>
      <Slider
        value={value}
        min={5}
        step={0.1}
        max={30}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        aria-labelledby="pcd-height-slider"
      />
    </Box>
  );
}
