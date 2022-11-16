import { useEffect, useState, useMemo } from "react";

const calcGridProps = (range1, range2) => {
    const val1 = Math.abs(range1.min) + Math.abs(range1.max);
    const val2 = Math.abs(range2.min) + Math.abs(range2.max);

    const range = Math.ceil(Math.max(val1, val2)/10)*10;
    const split_step = range/10;

    return {range:range, split_step:split_step};
} 

export const useCalcGridRange = ({points_range}) => {
    const init_range = useMemo(()=>{
        return {range:100, split_step:10};
    },[]);
    const [grid_range, setGridRange] = useState(init_range);
    useEffect(()=>{
        let grid_range;
        if(points_range != null){
            grid_range = calcGridProps(points_range.x, points_range.y);
        }else{
            grid_range = init_range;
        }
        setGridRange(grid_range);
    },[points_range])
    return grid_range;
}