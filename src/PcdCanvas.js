import { Suspense } from "react";
import { useMemo, useContext, useCallback, useEffect} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { Mesh, Vector3, Points, BufferGeometry} from 'three';
import { PcdFilePropsContext } from "./components/providers/PcdFilePropsProvider";
import { usePCDLoader } from "./loader";
import "./styles.css";


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

const calcGridProps = (range1, range2) => {
    const val1 = Math.abs(range1.min) + Math.abs(range1.max);
    const val2 = Math.abs(range2.min) + Math.abs(range2.max);

    const range = Math.ceil(Math.max(val1, val2)/10)*10;
    const split_step = range/10;

    return {range:range, split_step:split_step};
} 

const Rig = ({ v = new Vector3() }) => {
    return useFrame((state) => {
    //   console.log(state);
    })
  };

export default function PcdCanvas() {
    const deg2rad = deg => (deg * Math.PI) / 180.0;
    const {pcdProps, setPcdProps} = useContext(PcdFilePropsContext);

    // Load points from PCD
    const points = usePCDLoader(pcdProps.file);

    let points_filter = useMemo(()=>{
        return points;
    },[points, pcdProps.current_min_height, pcdProps.current_max_height]);

    // Filter by height range
    useMemo(()=>{
        if(points_filter != null){
            console.log('Chanege!!!!!!!!!!!!')
            // Filter
            const itemSize = points.geometry.attributes.position.itemSize;
            // const points_z = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===2);
            // const points_filter_arr = new Array(new Vector3(points.geometry.attributes.position.array.length));
            const points_filter_arr = [];
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
            points_filter = new Points(geometry, points.material);
            points_filter.material.size = 0.15;
        }
        return points_filter
    },[pcdProps.current_min_height, pcdProps.current_max_height])

    // Calcurate points range
    const range = useMemo(()=>{
        let range;
        if(points != null){
            console.log(points)
            const itemSize = points.geometry.attributes.position.itemSize;
            const points_x = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===0);
            const points_y = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===1);
            const points_z = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===2);
            const range_x = calcMinMax(points_x);
            const range_y = calcMinMax(points_y);
            const range_z = calcMinMax(points_z);
            range = {x:range_x, y:range_y, z:range_z};
        }
        return(range)
    }, [points])

    // Set PCD props
    useEffect(() => {
        if(points != null){
            setPcdProps({
                file:pcdProps.file,
                min_height:range.z.min,
                max_height:range.z.max,
                current_min_height:range.z.min,
                current_max_height:range.z.max            
            });
        }
      },[range])

    // Calcurate grid range
    const grid_range = useMemo(() => {
        let grid_range;
        if(range != null){
            grid_range = calcGridProps(range.x, range.y);
        }else{
            grid_range = {range:100, split_step:10};
        }
        return grid_range;
    },[range])
    
    // Retrun PCD map points
    const MapPoints = ({points}) => {
        if(points === null){
            points = new Points();
        }
        return (
            <Suspense fallback={null}>
              <primitive object={points} />
            </Suspense>
          )
    };

    // Render
    return (
        <div className="Canvas" style={{ width: '100vw', height: '100vh' }}>
            <Canvas
                // Default camera position
                camera={{
                    position: [0, 0, 100],
                    fov: 50,
                    aspect: window.innerWidth / window.innerHeight,
                    near: 0.1,
                    far: 2000
                }}
                dpr={window.devicePixelRatio}
				shadows>
                
                <axesHelper args={[0.5]} />
                <gridHelper 
                    args = {[grid_range.range, grid_range.split_step]}//[100, 100]
                    rotation = {[deg2rad(90), 0, 0]}
                    position = {[0, 0, 0]} //[0, 0, 0]
                    
                />

                <Rig />
                <OrthographicCamera position={[0, 0, 5]} zoom={170} />
                <Suspense fallback={null}>
                    {/* Control */}
                    <OrbitControls />
                    
                    {/* PointCloud */}
                    <MapPoints points={points_filter}/>

                    
                </Suspense>
                
                {/* <Stats /> */}
            </Canvas>
        </div>
    );
}
