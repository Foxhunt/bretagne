import Image from "next/image";

export default function Bild({ blok }) {
  return (
    <div className="flex-1 flex w-full md:h-full aspect-video place-items-center justify-center relative">
      <Image
        className="object-cover"
        src={blok.bild.filename}
        alt={blok.titel}
        fill
        sizes="(min-width: 768px) 100vw, 640px"
      />
    </div>
  );
}
