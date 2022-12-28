import { useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import Object from "../components/object";

export default function Objects({ projekte }) {
  const three = useThree();
  const router = useRouter();

  return (
    <>
      {projekte.map((projekt) => (
        <Object
          key={projekt}
          onClick={(e) => router.push(projekt)}
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
