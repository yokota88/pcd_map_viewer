import "./styles.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Stats, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { Suspense } from "react";
import { useRef, useState, useEffect } from "react";
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { Mesh, Vector3, Points } from 'three';
import { useContext } from "react";
import { PcdFilePropsContext } from "./components/providers/PcdFilePropsProvider";
// import { GridHelperContext } from "./components/providers/GridHelperProvider";
import { usePCDLoader } from "./loader";

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

    const range = Math.ceil(Math.max(val1, val2));
    const split_step = range/10;

    console.log(val1,val2,Math.max(val1, val2),range,{range:range, split_step:split_step})
    return {range:range, split_step:split_step};
} 

const GridHelper = (props) => {
    
}

const Rig = ({ v = new Vector3() }) => {
    return useFrame((state) => {
    //   console.log(state);
    })
  };
  

export default function PcdCanvas() {
    const deg2rad = deg => (deg * Math.PI) / 180.0;
    const contextValue = useContext(PcdFilePropsContext);
    // const gridHelperValue = useContext(GridHelperContext);
    const [gridProps, setGridProps] = useState({range:100, split_step:10});
    let range = 100;
    let split_step = 10;

    const Model = (props) => {
        let points = usePCDLoader(props.file_path);
        if(points != null){
            const itemSize = points.geometry.attributes.position.itemSize;
            const points_x = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===0);
            const points_y = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===1);
            const points_z = points.geometry.attributes.position.array.filter((val,idx)=>idx%itemSize===2);
            const range_x = calcMinMax(points_x);
            const range_y = calcMinMax(points_y);
            const range_z = calcMinMax(points_z);
            // console.log(calcGridProps(range_x, range_y))
            const gridProps = calcGridProps(range_x, range_y);
            range = gridProps.range;
            split_step = gridProps.split_step;
            console.log(gridProps)
            points.material.size = 0.15;
        }else{
            points = new Points();
        }
    
        return (
            <Suspense fallback={null}>
              <primitive object={points} />
            </Suspense>
          )
    };



    console.log(range)
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
                <Rig />
                <OrthographicCamera position={[0, 0, 5]} zoom={170} />
                <Suspense fallback={null}>
                    {/* Control */}
                    <OrbitControls />
                    
                    {/* PointCloud */}
                    <Model file_path = {contextValue.pcdData}/>

                    
                </Suspense>
                
                {/* <Stats /> */}
                <axesHelper args={[0.5]} />
                <gridHelper 
                    args = {[range, split_step]}//[100, 100]
                    rotation = {[deg2rad(90), 0, 0]}
                    position = {[0, 0, 0]} //[0, 0, 0]
                    
                />
                {/* <GizmoHelper
                    alignment="bottom-left" // widget alignment within scene
                    margin={[80, 80]} // widget margins (X, Y)
                    // onTarget={() => ref.current.lookAt}
                    // onUpdate={() => ref.current.update()}
                >
                    <GizmoViewport axisColors={['#f00', '#398400', '#00f']} labelColor="#fff" />
                </GizmoHelper> */}
            </Canvas>
        </div>
    );
}
