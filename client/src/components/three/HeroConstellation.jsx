import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useThemePalette from './useThemePalette.js';

function StarField({ accent, muted }) {
  const pointsRef = useRef(null);
  const lineRef = useRef(null);
  const pointer = useRef(new THREE.Vector2(0, 0));

  const stars = useMemo(() => {
    const arr = new Float32Array(240 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 18;
      arr[i + 1] = (Math.random() - 0.5) * 10;
      arr[i + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const lineGeometry = useMemo(() => {
    const arr = new Float32Array(54 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 12;
      arr[i + 1] = (Math.random() - 0.5) * 5;
      arr[i + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(t * 0.24) * 0.03 + pointer.current.y * 0.08;
      pointsRef.current.rotation.z = pointer.current.x * 0.08;
    }
    if (lineRef.current) {
      lineRef.current.rotation.y -= delta * 0.03;
      lineRef.current.rotation.x = Math.cos(t * 0.2) * 0.03;
      lineRef.current.position.x = pointer.current.x * 0.35;
      lineRef.current.position.y = pointer.current.y * 0.2;
    }
  });

  return (
    <group
      onPointerMove={(event) => {
        pointer.current.set(event.pointer.x, event.pointer.y);
      }}
      onPointerLeave={() => pointer.current.set(0, 0)}
    >
      <Points ref={pointsRef} positions={stars} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={muted} size={0.06} sizeAttenuation depthWrite={false} />
      </Points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lineGeometry.length / 3} array={lineGeometry} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.24} />
      </lineSegments>
    </group>
  );
}

export default function HeroConstellation() {
  const { accent, muted } = useThemePalette();

  return (
    <div className="hero-three-layer" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 52 }}>
        <ambientLight intensity={0.35} />
        <StarField accent={accent} muted={muted} />
      </Canvas>
    </div>
  );
}
