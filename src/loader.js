import { useEffect, useState } from "react";
import { BufferGeometry, Geometry, Material, Points } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";

export const useLocal = (file) => {
  const loader = new PCDLoader();
  const [frame, setFrame] = useState(null);
  useEffect(() => {
    if (!file) {
      setFrame(null);
    } else {
      (file)
        .arrayBuffer()
        .then((blob) => loader.parse(blob, file.name))
        .then(setFrame);
    }
  }, [file]);
  return frame;
};
