import { Suspense } from "react";
import { useMemo, useContext, useEffect} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { Vector3}  from 'three';
import { PcdFilePropsContext } from "./components/providers/PcdFilePropsProvider";
import "./styles.css";
import { MapPoints } from "./components/MapPoints";
import { useFilterPoints } from "./hooks/useFilterPoints"
import { useGetPcdPoints } from "./hooks/useGetPcdPoints"
import { useCalcPointsRange } from "./hooks/useCalcPointsRange"
import { useUpdatePcdPorps } from "./hooks/useUpdatePcdPorps"
import { useCalcGridRange } from "./hooks/useCalcGridRange"

const Rig = ({ v = new Vector3() }) => {
    return useFrame((state) => {
    //   console.log(state);
    })
  };

export default function PcdCanvas() {
    const deg2rad = deg => (deg * Math.PI) / 180.0;
    const {pcdProps, setPcdProps} = useContext(PcdFilePropsContext);

    // Load points from PCD file
    const points = useGetPcdPoints(pcdProps.file);

    // Filter by height slider val
    const points_filter = useFilterPoints({points, pcdProps});

    // Calcurate pcd points's range
    const points_range = useCalcPointsRange({points})
    
    // Calcurate grid helper range
    const grid_range = useCalcGridRange({points_range});

    // Update pcd props
    useUpdatePcdPorps({points_range, setPcdProps});

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
