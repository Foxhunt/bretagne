import { useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import Object from "../components/object";

export default function Objects({ count = 10 }) {
  const three = useThree();
  const router = useRouter();

  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <Object
            key={i}
            onClick={(e) => router.push(`/${i}`)}
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
