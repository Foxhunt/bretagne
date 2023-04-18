export default function Video({ blok }) {
  return (
    <div>
      <video
        className="rounded-3xl"
        src={blok.video.filename}
        preload={"metadata"}
        controls
        muted
        loop
      />
      {blok.titel && <p className="pt-5">{blok.titel}</p>}
    </div>
  );
}
