export default function Ton({ blok }) {
  return (
    <div className="h-full w-full flex-1 flex place-items-center justify-center">
      <audio className="" src={blok.ton.filename} controls loop />
    </div>
  );
}
