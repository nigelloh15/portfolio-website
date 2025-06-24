"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";

export default function Home() {


  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  const first = "NIGEL";
  const last = "LOH";

  useGSAP(() => {

    // Register GSAP plugins
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(ScrollToPlugin);

    const typetl = gsap.timeline();

    function subType() {

      let tl = gsap.timeline();

      tl.to(".firstname", {
        duration: 1,
        text: first,
        ease: "power2.out",
      })
      tl.to(".space", {
        duration: 0.5,
        text: " ",
        ease: "none",
      })
      tl.to(".lastname", {
        duration: 1,
        text: last,
        ease: "power1.out",
      })

      return tl;
    }


    typetl.to(".cursor", { opacity: 0, duration: 0, repeat: 5, yoyo: true, repeatDelay: 0.5 });
    typetl.to(".cursor", { opacity: 1, duration: 0 });
    typetl.add(subType());
    typetl.to(".cursor", { opacity: 0, duration: 0, repeat: 5, yoyo: true, repeatDelay: 0.5 });
    typetl.to(".cursor", { opacity: 1, duration: 0 });

    let reverseSub = subType();
    typetl.add(reverseSub.progress(1), "-=1.5");
    typetl.add(reverseSub.reverse(), "-=1.5");
    typetl.to(".cursor", { opacity: 0, duration: 0 });
    typetl.set(".textbox", {
      display: "none",
    });
    typetl.set(".scenery", {
      display: "flex",
    });
    typetl.set(".header", {
      display: "block",
    });
    typetl.to(".scenery", {
      duration: 1.5,
      ease: "power1.inOut",
      opacity: 1,
      delay: 0.5,
    });
    typetl.to(".header", {
      duration: 1.5,
      ease: "power1.inOut",
      opacity: 1,
    });
    typetl.set(".later", {
      display: "block",
    })


  });

  useGSAP(() => {

    const images = gsap.utils.toArray<HTMLElement>(".projectimage");

    images.forEach(imgEl => {
      const tl = gsap.timeline({ paused: true })
        .to(imgEl, {
          filter: "brightness(1) saturate(1)",
          duration: 0.3,
          ease: "power1.out"
        });

      imgEl.addEventListener("mouseenter", () => tl.play());
      imgEl.addEventListener("mouseleave", () => tl.reverse());

      console.log("Image element:", imgEl);

    });
  });

  return (
    <div className="tracking-tighter">
      <div className="header hidden fixed opacity-0 w-full h-[10%] z-20">
        <div className="absolute flex flex-row justify-evenly items-center w-[20%] h-full text-[5vw] z-30">
          <a target="_blank" href="https://www.github.com/nigelloh15" className="w-[5vw] h-[5vw] md:w-[3vw] md:h-[3vw] lg:w-[1.5vw] lg:h-[1.5vw] mx-2">
            <Image src="/github.svg" alt="github" width={128} height={128} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/nigelloh15" className="w-[5vw] h-[5vw] md:w-[3vw] md:h-[3vw] lg:w-[1.5vw] lg:h-[1.5vw] mx-2">
            <Image src="/linkedin.svg" alt="github" width={128} height={128} />
          </a>
        </div>
        <div className="absolute flex justify-center items-center w-full h-full">
          <span className="text-[6vw] md:text-[5vw] tracking-tighter">
            NIGEL LOH
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="textbox text-[10vw] md:text-[8vw]">
          <span className="invisible">
            |
          </ span>
          <span className="firstname tracking-tighter" />
          <span className="space tracking-tighter" />
          <span className="lastname tracking-tighter" />
          <span className="cursor font-extralight">
            |
          </ span>
        </div>
        <div className="scenery hidden opacity-0 w-full md:w-[60%] h-[70%] lg:w-[50%] px-12 flex-col">
          {/* 1. image container gets 80% of the parent height */}
          <div className="relative w-full h-[95%]">
            <Image
              src="/scenery.jpg"
              alt="scenery"
              fill
              className="object-cover filter-[brightness(0.6)]"
            />
          </div>

          {/* 2. caption below, pushes the image up */}
          <div className="flex flex-row pt-2">
            <span className="h-full w-[50%] text-[3vw] md:text-[2vw] lg:text-[1.5vw] tracking-tight">
              Math + CS @ UofT, SWE from Vancouver
            </span>
            <div className="h-full w-[50%] bg-gradient-to-r from-[#262626] to-[#b8b8b8]">

            </div>
          </div>
        </div>
      </div>
      <div className="h-[200vh] hidden later">
        <div className="projects flex justify-center items-center h-screen w-screen">
          <div className="w-[80%] h-[60%]">
            <p className="italic text-[6vw]">
              PROJECTS
            </p>
            <div className="projectbox flex flex-row w-full h-full">
              <div className="relative w-1/3 h-full">
                <Image
                  src="/scenery.jpg"
                  alt="scenery"
                  fill
                  className="projectimage object-cover filter-[brightness(0.6)] px-2"
                />
              </div>
              <div className="relative w-1/3 h-full">
                <Image
                  src="/scenery.jpg"
                  alt="scenery"
                  fill
                  className="projectimage object-cover filter-[brightness(0.6)] px-2"
                />
              </div>
              <div className="relative w-1/3 h-full">
                <Image
                  src="/scenery.jpg"
                  alt="scenery"
                  fill
                  className="projectimage object-cover filter-[brightness(0.6)] px-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
