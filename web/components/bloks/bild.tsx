export default function Bild({ blok }) {
  return (
    <div className="flex gap-2 bg- w-full">
      <img src={blok.bild.filename} />
      <p>{blok.beschreibung}</p>
    </div>
  );
}
