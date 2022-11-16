import { useEffect, useState } from "react";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";

export const useGetPcdPoints = (file) => {
  console.log("[Process]useGetPcdPoints")
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
