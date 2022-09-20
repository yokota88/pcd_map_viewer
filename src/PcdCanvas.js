import "./styles.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Stats, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { Suspense } from "react";
import { useRef } from "react";
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { Mesh, Vector3 } from 'three';

const Model = () => {
    const result = useLoader(PCDLoader, './sample.pcd')
    // return <primitive object={result} />
    result.material.size = 0.15;
    // console.log(result)
    return (
        <Suspense fallback={null}>
          <primitive object={result} />
        </Suspense>
      )
};

const Rig = ({ v = new Vector3() }) => {
    return useFrame((state) => {
    //   console.log(state);
    })
  };
  

export default function PcdCanvas() {
    // const controlRef = useRef();
    const deg2rad = deg => (deg * Math.PI) / 180.0;

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
                    <Model />

                    
                </Suspense>
                
                {/* <Stats /> */}
                <axesHelper args={[0.5]} />
                <gridHelper 
                    args = {[100, 10]}
                    rotation = {[deg2rad(90), 0, 0]}
                    position = {[0, 0, -10]} 
                    
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
