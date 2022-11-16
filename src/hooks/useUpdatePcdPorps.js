import { useEffect, useState } from "react";

export const useUpdatePcdPorps = ({points_range, setPcdProps}) =>{
    useEffect(()=>{
        if(points_range != null){
            setPcdProps((prevState) => (
                { ...prevState,
                     min_height: points_range.z.min,
                     max_height: points_range.z.max,
                     current_min_height: points_range.z.min,
                     current_max_height:points_range.z.max
                }))
        }
    },[points_range])
    // return updateProps
}