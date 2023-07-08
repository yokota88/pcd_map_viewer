import { useContext, useState, useMemo } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PcdFilePropsContext } from "./components/providers/PcdFilePropsProvider";

type tempSliderVal = {
  current_min: number;
  current_max: number;
};

export default function RangeSlider() {
  const {pcdProps, setPcdProps} = useContext(PcdFilePropsContext);
  const [tempVals, setTempVals] = useState<tempSliderVal>({current_min:pcdProps.min_height,current_max:pcdProps.max_height});

  // Callback of slider operation
  const handleChange = (event: Event, newValue: number | number[]) => {
      const new_val = newValue as number[];
      setTempVals({current_min:new_val[0], current_max:new_val[1]})
  };

  // Callback of mouseup
  const onChangeCommitted = () => {
    setPcdProps( {
      file: pcdProps.file,
      min_height: pcdProps.min_height,
      max_height: pcdProps.max_height,
      current_min_height:tempVals.current_min,
      current_max_height:tempVals.current_max}
      )
}

  const height_range = [pcdProps.min_height, pcdProps.max_height];
  const current_range = [tempVals.current_min, tempVals.current_max];
  const current_range_view = [Math.ceil(current_range[0]*10)/10, Math.ceil(current_range[1]*10)/10];

  return (
    <Box component="div" sx={{ width: 250, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", padding:"0px", margin:"5px"}}>
      <Typography id="pcd-height-slider" gutterBottom sx={{padding:"0px"}}>
        Height range[m]: {current_range_view[0]} 〜 {current_range_view[1]}
      </Typography>
      <Slider
        value={current_range}
        min={height_range[0]}
        step={0.1}
        max={height_range[1]}
        onChange={handleChange}
        onChangeCommitted={onChangeCommitted}
        // valueLabelDisplay="auto"
        aria-labelledby="pcd-height-slider"
        sx={{padding:"0px"}}
      />
    </Box>
  );
}
