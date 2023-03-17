import Image from "next/image";

export default function Header({ story }) {
  return (
    <header className="flex justify-between items-center">
      <div className="h-[20vw] aspect-[1/2] relative">
        <Image
          className="object-cover object-right rounded-r-full"
          src={story.content.titelbild?.filename}
          alt={story.content.name}
          fill
          priority
        />
      </div>
      <div className="h-[40vw] aspect-square relative">
        <Image
          className="object-cover rounded-full"
          src={story.content.titelbild?.filename}
          alt={story.content.name}
          fill
          priority
        />
      </div>
      <div className="h-[20vw] aspect-[1/2] relative">
        <Image
          className="object-cover object-left rounded-l-full"
          src={story.content.titelbild?.filename}
          alt={story.content.name}
          fill
          priority
        />
      </div>
    </header>
  );
}
