import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useThemePalette from './useThemePalette.js';

function Spine({ accent, muted, progress }) {
  const meshRef = useRef(null);
  const glowRef = useRef(null);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 4.8, 0),
        new THREE.Vector3(0.55, 2.6, 0),
        new THREE.Vector3(-0.55, 0.7, 0),
        new THREE.Vector3(0.45, -1.2, 0),
        new THREE.Vector3(-0.4, -3.1, 0),
        new THREE.Vector3(0, -5.2, 0)
      ]),
    []
  );

  const tube = useMemo(() => new THREE.TubeGeometry(curve, 220, 0.08, 12, false), [curve]);
  const orb = useMemo(() => new THREE.SphereGeometry(0.2, 18, 18), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = curve.getPoint(Math.max(0.02, Math.min(0.98, progress.current)));
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.24) * 0.07;
    }
    if (glowRef.current) {
      glowRef.current.position.copy(p);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={tube}>
        <meshStandardMaterial color={muted} transparent opacity={0.35} />
      </mesh>
      <mesh ref={glowRef} geometry={orb}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

export default function ProjectsSpine3D({ progressRef }) {
  const { accent, muted } = useThemePalette();

  return (
    <div className="projects-tree-three" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[2, 4, 4]} intensity={0.7} />
        <Spine accent={accent} muted={muted} progress={progressRef} />
      </Canvas>
    </div>
  );
}
