import { Suspense } from "react";
import { useMemo, useContext} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { Mesh, Vector3, Points } from 'three';
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
    const pcdContext = useContext(PcdFilePropsContext);

    // Load points from PCD
    const points = usePCDLoader(pcdContext.pcdProps.file);

    // Apply properties
    useMemo(()=>{
        if(points != null){
            points.material.size = 0.15;
        }
        return points
    },[points])

    // Calcurate grid range
    const grid_range = useMemo(() => {
        let grid_range;
        if(points != null){
            const itemSize = points.geometry.attributes.position.itemSize;
            const points_x = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===0);
            const points_y = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===1);
            const points_z = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===2);
            const range_x = calcMinMax(points_x);
            const range_y = calcMinMax(points_y);
            const range_z = calcMinMax(points_z);
            grid_range = calcGridProps(range_x, range_y);
        }else{
            grid_range = {range:100, split_step:10};
        }
        return grid_range;
    })
    
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
                    <MapPoints points={points}/>

                    
                </Suspense>
                
                {/* <Stats /> */}
            </Canvas>
        </div>
    );
}
