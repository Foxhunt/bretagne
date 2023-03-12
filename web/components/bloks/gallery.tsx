export default function Gallery({ blok }) {
  return (
    <div className="flex gap-2 bg- w-full">
      {blok.bilder.map((bild, index) => (
        <img src={bild.filename} key={index} />
      ))}
    </div>
  );
}
