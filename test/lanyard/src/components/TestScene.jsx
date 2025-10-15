import { Canvas } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

export default function TestScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Box position={[0, 0, 0]} args={[2, 2, 2]}>
          <meshStandardMaterial color="orange" />
        </Box>

        <Text
          position={[0, -3, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          3D 场景测试成功！
        </Text>
      </Canvas>
    </div>
  );
}