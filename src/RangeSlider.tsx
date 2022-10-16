import * as React from 'react';
import { useContext, useEffect, useMemo } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PcdFilePropsContext } from "./components/providers/PcdFilePropsProvider";

export default function RangeSlider() {
  const {pcdProps, setPcdProps} = useContext(PcdFilePropsContext);

  const handleChange = (event: Event, newValue: number | number[]) => {
      console.log(event);
      const new_val = newValue as number[];
      setPcdProps( {
        file: pcdProps.file,
        min_height: pcdProps.min_height,
        max_height: pcdProps.max_height,
        current_min_height:new_val[0],
        current_max_height:new_val[1]}
        )
  };

  const height_range = [pcdProps.min_height, pcdProps.max_height];
  const current_range = [pcdProps.current_min_height, pcdProps.current_max_height];
  const current_range_view = [Math.ceil(current_range[0]*10)/10, Math.ceil(current_range[1]*10)/10];

  return (
    <Box component="div" sx={{ width: 250, padding: '10px'}}>
      <Typography id="pcd-height-slider" gutterBottom>
        Height range[m]: {current_range_view[0]} 〜 {current_range_view[1]}
      </Typography>
      <Slider
        value={current_range}
        min={height_range[0]}
        step={0.1}
        max={height_range[1]}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        aria-labelledby="pcd-height-slider"
      />
    </Box>
  );
}
