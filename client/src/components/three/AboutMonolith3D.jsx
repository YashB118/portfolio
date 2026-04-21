import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useThemePalette from './useThemePalette.js';

function Monolith({ accent, muted }) {
  const meshRef = useRef(null);
  const ringRef = useRef(null);
  const geom = useMemo(() => new THREE.BoxGeometry(2.2, 3, 0.25, 8, 8, 2), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.35) * 0.16;
      meshRef.current.rotation.x = Math.cos(t * 0.25) * 0.05;
      meshRef.current.position.y = Math.sin(t * 0.7) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.004;
      ringRef.current.scale.setScalar(1 + Math.sin(t * 0.85) * 0.04);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geom}>
        <meshPhysicalMaterial
          color={muted}
          transparent
          opacity={0.35}
          roughness={0.22}
          transmission={0.72}
          thickness={1.2}
          ior={1.12}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.04, 10, 80]} />
        <meshBasicMaterial color={accent} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function AboutMonolith3D() {
  const { accent, muted } = useThemePalette();

  return (
    <div className="about-monolith-three" aria-hidden>
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 4]} intensity={0.7} color={accent} />
        <Monolith accent={accent} muted={muted} />
      </Canvas>
    </div>
  );
}
