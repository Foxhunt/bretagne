import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.postID}</h1>
    </div>
  );
}