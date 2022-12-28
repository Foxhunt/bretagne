export default function Pointcloud({ blok }) {
  return (
    <>
      <img src={blok.depth.filename} />
      <img src={blok.image.filename} />
    </>
  );
}
