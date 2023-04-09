import Image from "next/image";
import Link from "next/link";

export default function Header({ story, projekte }) {
  const links = projekte[Math.floor(Math.random() * projekte.length)];
  const rechts = projekte[Math.floor(Math.random() * projekte.length)];
  return (
    <header className="flex justify-between items-center w-full relative">
      <Link href={"/" + links.path}>
        <div className="h-[20vw] aspect-[1/2] relative" key={links.titelbild}>
          <Image
            className="object-cover object-right rounded-r-full brightness-50 hover:scale-105"
            src={links.titelbild}
            alt={links.name}
            fill
            priority
          />
        </div>
      </Link>
      <div className="h-[40vw] aspect-square relative">
        <Image
          className="object-cover rounded-full"
          src={story.content.titelbild?.filename}
          alt={story.content.name}
          fill
          priority
        />
      </div>
      <Link href={"/" + rechts.path}>
        <div className="h-[20vw] aspect-[1/2] relative" key={rechts.titelbild}>
          <Image
            className="object-cover object-left rounded-l-full brightness-50 hover:scale-105"
            src={rechts.titelbild}
            alt={rechts.name}
            fill
            priority
          />
        </div>
      </Link>
    </header>
  );
}
