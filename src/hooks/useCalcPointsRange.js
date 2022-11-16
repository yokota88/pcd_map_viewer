import { useState, useEffect } from "react";

const calcMinMax = (target) => {
    let i;
    let min;
    let max;
    i = target.length;
    min = Infinity;
    max = -Infinity;
    while (i--) {
        if (target[i] < min) { min = target[i] }
        if (target[i] > max) { max = target[i] }
    }

    return {max:max, min:min};
}

export const useCalcPointsRange = ({ points }) => {
    const [range, setRange] = useState(null);
    useEffect(()=>{
        if(points != null){
            const itemSize = points.geometry.attributes.position.itemSize;
            const points_x = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===0);
            const points_y = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===1);
            const points_z = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===2);
            const range_x = calcMinMax(points_x);
            const range_y = calcMinMax(points_y);
            const range_z = calcMinMax(points_z);
            setRange({x:range_x, y:range_y, z:range_z});
        }
    },[points])

    return range
}