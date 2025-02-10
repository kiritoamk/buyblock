"use client"

import { useEffect, useRef, useState } from "react";
import { Group, Box3, Vector3 } from "three";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function CoinModel() {
  const { scene } = useGLTF("/bbcoinfinbgb.glb"); // Load your model
  const [centeredModel, setCenteredModel] = useState<Group | null>(null);
  const coinRef = useRef<Group | null>(null);

  useEffect(() => {
    if (scene) {
      // Compute the bounding box of the model
      const boundingBox = new Box3().setFromObject(scene);
      const center = new Vector3();
      boundingBox.getCenter(center);

      // Adjust the model's position to center it
      scene.position.sub(center);

      // Adjust rotation to face the camera (try different values)

      scene.rotation.set(-Math.PI / 2, 0, 0); // Try this if needed

      // Set the updated model
      setCenteredModel(scene);
    }
  }, [scene]);

  // Apply rotation animation
  useFrame(() => {
    if (coinRef.current) {
      coinRef.current.rotation.z += 0.02; // Rotate around Y-axis
    }
  });

  if (!centeredModel) {
    return (
      <Html center>
        <div className="text-white bg-gray-800/80 px-4 py-2 rounded-lg">
          Loading model...
        </div>
      </Html>
    );
  }

  return <primitive object={centeredModel} scale={1.5} ref={coinRef} />;
}

// Preload the model
useGLTF.preload("/bbcoinfinbgb.glb");
