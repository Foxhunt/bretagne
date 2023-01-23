export default function Video({ blok }) {
  return <video src={blok.video.filename} controls autoPlay muted loop />;
}
