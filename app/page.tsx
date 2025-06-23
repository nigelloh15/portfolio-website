"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Home() {

  // Register GSAP plugins
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollToPlugin);

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
    typetl.set(".later", {
      display: "block",
    })

  });

  useGSAP(() => {



  });

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="textbox text-[10vw] md:text-[8vw]">
          <span className="invisible">
            |
          </ span>
          <span className="firstname" />
          <span className="space" />
          <span className="lastname" />
          <span className="cursor font-extralight">
            |
          </ span>
        </div>
      </div>
      <div className="bg-white h-screen hidden later">
        test
      </div>
    </div>
  );
}
