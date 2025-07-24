import React, { useRef, useState, Suspense } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme, useMediaQuery } from "@mui/material";

export const ThreeDMap = ({ modelPath, scale = 40, position = [-20, -20, -250] }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // Adjust scale and position for mobile
    const responsiveScale = isMobile ? scale * 0.7 : scale;
    const responsivePosition = isMobile ? [-10, -10, -150] : position;
    
    return (
        <div style={{
            width:"100%", 
            height: isMobile ? "91vh" : "93vh", 
            backgroundColor:"black"
        }}>
            <Canvas
                camera={{
                    fov: isMobile ? 60 : 75,
                    position: isMobile ? [0, 0, 100] : [0, 0, 150]
                }}
            >
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.30} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Suspense fallback={null}>
                    <GltfModel 
                        modelPath={modelPath} 
                        scale={responsiveScale} 
                        position={responsivePosition}
                        isMobile={isMobile}
                    />
                    <OrbitControls 
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={isMobile ? 50 : 100}
                        maxDistance={isMobile ? 300 : 500}
                        touches={{
                            ONE: isMobile ? 2 : 1, // Touch rotate
                            TWO: isMobile ? 0 : 2  // Touch zoom
                        }}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0], isMobile = false }) => {
    const ref = useRef();
    const gltf = useLoader(GLTFLoader, modelPath);
    const [hovered, hover] = useState(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // Slower rotation on mobile to reduce battery usage
    useFrame((state, delta) => (ref.current.rotation.y += isMobile ? 0.002 : 0.003));
    
    return (
        <>
            <primitive
                ref={ref}
                object={gltf.scene}
                position={position}
                scale={hovered ? scale * 1.2 : scale}
                // Disable hover effects on mobile for better performance
                onPointerOver={!isMobile ? (event) => hover(true) : undefined}
                onPointerOut={!isMobile ? (event) => hover(false) : undefined}
            />
        </>
    );
};