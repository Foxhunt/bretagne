export default function Video({ blok }) {
  return (
    <div>
      <video
        className="rounded-3xl"
        src={blok.video.filename}
        controls
        autoPlay
        muted
        loop
      />
      {blok.titel && <p className="pt-3">{blok.titel}</p>}
    </div>
  );
}
