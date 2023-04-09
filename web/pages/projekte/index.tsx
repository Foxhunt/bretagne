import { ISbStoryData } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { ISbComponentType } from "storyblok-js-client";

export default function Projekte({
  projekte,
}: {
  projekte: ISbStoryData<
    ISbComponentType<string> & {
      [index: string]: any;
    }
  >[];
}) {
  return (
    <main className="flex flex-wrap justify-evenly gap-5 py-5 px-6 sm:px-20 md:px-30 lg:px-52">
      {shuffle(projekte).map((projekt, index) => {
        return (
          <Link key={projekt.name} href={projekt.path}>
            <Image
              className="rounded-full aspect-square object-cover hover:scale-105"
              src={projekt.titelbild}
              alt={projekt.name}
              width={300}
              height={300}
              priority={index < 5}
            />
            <p className="text-center font-bold pt-5">{projekt.projektname}</p>
            <p className="text-center pt-2 pb-5">{projekt.name}</p>
          </Link>
        );
      })}
    </main>
  );
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
