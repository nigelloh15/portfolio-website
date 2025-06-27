"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExpoScaleEase } from "gsap/EasePack";
import Image from "next/image";
import { Span } from "next/dist/trace";

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

  useGSAP(() => {

    gsap.registerPlugin(TextPlugin, ScrollTrigger, ExpoScaleEase);


    const tl = gsap.timeline();

    tl.to(".header", {
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut",
      delay: 1,
    });
    tl.set(".later", {
      display: "block",
    })


    gsap.to(".nigeltext", {
      scale: 0.3,
      yoyo: true,
      transformOrigin: "center top",
      ease: "expoScale(1, 2, power1.in)",
      scrollTrigger: {
        trigger: ".start",
        start: "clamp(top bottom)",    // when .nigel’s top hits the viewport top
        end: "-75% top",          // finish the tween when you've scrolled 10% of the viewport height
        scrub: 0.5,         // link tween to scroll
        pinSpacing: false,   // remove extra space below it if you don’t want padding
        markers: true,
      }
    });


    const opactiytl = gsap.timeline();

    opactiytl.set(".about", {
      opacity: 0
    })
    opactiytl.to(".about", {
      opacity: 1,
      ease: "power1.in",
      duration: 1,
    });

    opactiytl.set(".about", {
      opacity: 1
    })

    gsap.to(".about", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".start",
        start: "clamp(top bottom)",    // when .nigel’s top hits the viewport top
        end: "bottom-=45% top",          // finish the tween when you've scrolled 10% of the viewport height
        scrub: 0.5,         // link tween to scroll
        markers: true        // handy for debugging start/end
      },
    });


  });


  return (
    <div className="main">
      <div className="header fixed w-screen h-8 top-4 left-0 opacity-0 flex items-center space-x-2 px-4 z-50">
        <a href="https://www.linkedin.com/in/nigelloh15" target="_blank" className="relative w-9 h-9 backdrop-blur-lg bg-[rgba(242,238,233,0.5)] rounded-[0.4vw]">
          <Image src="/linkedin.svg" alt="linkedin" fill className="object-contain p-2" />

        </a>
        <a href="https://www.github.com/nigelloh15" target="_blank" className="relative w-9 h-9 backdrop-blur-lg bg-[rgba(242,238,233,0.5)] rounded-[0.4vw]">
          <Image src="/github.svg" alt="github" fill className="object-contain p-2" />
        </a>
      </div>
      <div className="spacer h-[12vh]">
      </div>
      <div className="stickybox sticky top-0 z-10 pt-4">
        <div className="nigelbox flex flex-col items-center w-full h-[40vh]">
          <div className="nigeltext text-[min(20vh,20vw)] md:pt-0 md:text-[min(15vw,15vh)] lg:text-[10vw]">NIGEL</div>
        </div>
      </div>

      <div className="start w-screen h-[48vh]">
        <div className="about px-[5vw] z-10 sticky">
          <div className="text-[min(4vw, 4vh)] md:text-[3vw] lg:text-[2.3vw] font-light">
            <span>
              Software Engineer from Vancouver, Math + CS @ University of Toronto
            </span>
            <span>&nbsp;</span>
            <span className="text-[var(--light)]">
              -  Strong interest in quant finance and machine learning, open to oppurtunities in both areas.
            </span>
          </div>
        </div>
      </div>
      <div className="later hidden w-screen h-[200vh] z-20">
        <div className="skills bg-[var(--light)] rounded-[2vw] h-[150vh]">
          
        </div>
      </div>
    </div>
  );
}
