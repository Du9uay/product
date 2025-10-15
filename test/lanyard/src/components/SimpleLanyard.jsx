/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Card() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Box
      ref={meshRef}
      args={[1.6, 2.25, 0.05]}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial
        color={hovered ? 'hotpink' : '#764ba2'}
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  );
}

function Lanyard() {
  const points = [];
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(0.5, 2, 0),
    new THREE.Vector3(0.7, 1, 0),
    new THREE.Vector3(0.5, 0.5, 0),
    new THREE.Vector3(0, 0, 0)
  ]);

  points.push(...curve.getPoints(50));

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="white" linewidth={3} />
    </line>
  );
}

export default function SimpleLanyard() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Card />
        <Lanyard />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}