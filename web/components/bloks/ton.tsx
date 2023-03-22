export default function Ton({ blok }) {
  return (
    <div className="">
      <audio
        className="w-full min-w-[250px]"
        src={blok.ton.filename}
        controls
        loop
      />
      {blok.titel && <p className="pt-5">{blok.titel}</p>}
    </div>
  );
}
