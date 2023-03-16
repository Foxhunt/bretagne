import { useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Object from "../components/object";

export default function Objects({ projekte }) {
  const three = useThree();
  const router = useRouter();

  useEffect(() => {
    for (const { path } of projekte) {
      router.prefetch("/projekte/[postID]", path);
    }
  }, [projekte, router]);

  return (
    <>
      {projekte.map(({ path, titelBild }) => (
        <Object
          key={path}
          onClick={(e) => router.push(path)}
          titelBild={titelBild}
          position={[
            three.viewport.width * 0.8 * Math.random() -
              (three.viewport.width * 0.8) / 2,
            -20 * Math.random() + 1.5,
            -200 * Math.random() - 20,
          ]}
        />
      ))}
    </>
  );
}
