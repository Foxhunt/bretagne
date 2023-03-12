export default function Bild({ blok }) {
  return <div className="h-full w-full flex-1 flex place-items-center justify-center">
    <img src={blok.bild.filename} />
    </div>;
}
