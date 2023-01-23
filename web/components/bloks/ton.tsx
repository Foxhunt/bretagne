export default function Ton({ blok }) {
  return <audio src={blok.ton.filename} controls autoPlay loop />;
}
