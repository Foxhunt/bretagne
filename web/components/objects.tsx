import { useThree } from "@react-three/fiber";
import Object from "../components/object";

export default function Objects({ count = 10 }) {
  const three = useThree();

  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <Object
            key={i}
            position={[
              three.viewport.width * Math.random() - three.viewport.width / 2,
              5,
              -5 * Math.random() - 10,
            ]}
          />
        ))}
    </>
  );
}
