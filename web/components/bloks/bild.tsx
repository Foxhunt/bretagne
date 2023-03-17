import Image from "next/image";

export default function Bild({ blok }) {
  return (
    <div className="">
      <Image
        className="object-cover rounded-3xl"
        src={blok.bild.filename}
        alt={blok.titel}
        width={520}
        height={520}
        // fill
        // sizes="(min-width: 768px) 100vw, 640px"
      />
      {blok.titel && <p className="pt-3">{blok.titel}</p>}
    </div>
  );
}
