import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useThemePalette from './useThemePalette.js';

function Orb({ accent, muted }) {
  const orbRef = useRef(null);
  const shellRef = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.y += 0.004;
      orbRef.current.rotation.x = Math.sin(t * 0.45) * 0.12;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= 0.003;
      shellRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1.35, 12]} />
        <meshStandardMaterial color={accent} roughness={0.45} metalness={0.2} transparent opacity={0.45} />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.9, 4]} />
        <meshBasicMaterial color={muted} wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.32, 18, 18]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  );
}

export default function ContactOrb3D() {
  const { accent, muted } = useThemePalette();

  return (
    <div className="contact-orb-three" aria-hidden>
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 2, 3]} intensity={1.1} color={accent} />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color={muted} />
        <Orb accent={accent} muted={muted} />
      </Canvas>
    </div>
  );
}
