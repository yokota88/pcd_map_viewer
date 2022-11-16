import { useEffect, useState } from "react";
import { Vector3, Points, BufferGeometry} from 'three';

export const useFilterPoints = ({points, pcdProps}) => {
    console.log("[Process]useFilterPoints")
    const [points_filter, setPpointsFilter] = useState(null);
    useEffect(()=>{
        if(points != null){
            console.log('Chanege!!!!!!!!!!!!')
            // Filter
            const itemSize = points.geometry.attributes.position.itemSize;
            // const points_z = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===2);
            // const points_filter_arr = new Array(new Vector3(points.geometry.attributes.position.array.length));
            const points_filter_arr = [];
            console.log(points_filter_arr)
            points.geometry.attributes.position.array.map(function(val, idx, array) {
                if (pcdProps.current_min_height < val & val < pcdProps.current_max_height & idx%itemSize===2) {
                    points_filter_arr.push(new Vector3(
                    points.geometry.attributes.position.array[idx-2],
                    points.geometry.attributes.position.array[idx-1],
                    points.geometry.attributes.position.array[idx],
                    ))
                }
            });
    
            // Create new points geometry
            const geometry = new BufferGeometry().setFromPoints(points_filter_arr);
            const new_points = new Points(geometry, points.material);
            new_points.material.size = 0.15;
            setPpointsFilter(new_points);
        }else{
            setPpointsFilter(null);
        }
    }, [points, pcdProps.current_min_height, pcdProps.current_max_height])

    return points_filter
}