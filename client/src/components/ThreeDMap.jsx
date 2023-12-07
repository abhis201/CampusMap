import React, { useRef, useState, Suspense } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const ThreeDMap = ({ modelPath, scale = 40, position = [-20, -20, -250] }) => {
    return (
        <div style={{width:"100%", height:"93vh", backgroundColor:"black"}}>
            <Canvas>
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.30} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Suspense fallback={null}>
                    <GltfModel modelPath={modelPath} scale={scale} position={position} />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </div>
    );
};

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
    const ref = useRef();
    const gltf = useLoader(GLTFLoader, modelPath);
    const [hovered, hover] = useState(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.y += 0.003));
    return (
        <>
            <primitive
                ref={ref}
                object={gltf.scene}
                position={position}
                scale={hovered ? scale * 1.2 : scale}
                // onPointerOver={(event) => hover(true)}
                // onPointerOut={(event) => hover(false)}
            />
        </>
    );
};