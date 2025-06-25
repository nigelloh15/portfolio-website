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


    gsap.to(".nigeltext", {
      scale: 0.3,
      yoyo: true,
      transformOrigin: "center top",
      ease: "expoScale(1, 2, power1.in)",
      scrollTrigger: {
        trigger: ".nigeltext",
        start: "clamp(bottom bottom)",    // when .nigel’s top hits the viewport top
        end: "10% top",          // finish the tween when you've scrolled 10% of the viewport height
        scrub: 0.5,         // link tween to scroll
        pinSpacing: false,   // remove extra space below it if you don’t want padding
        markers: true        // handy for debugging start/end
      }
    });

    gsap.to(".frontimagebox", {
      width: "95%",
      height: "100vh",
      yoyo: true,
      transformOrigin: "center top",
      ease: "expoScale(1, 2, power1.in)",
      scrollTrigger: {
        trigger: ".nigeltext",
        start: "clamp(bottom bottom)",    // when .nigel’s top hits the viewport top
        end: "10% top",          // finish the tween when you've scrolled 10% of the viewport height
        scrub: 0.5,         // link tween to scroll
        pinSpacing: false,   // remove extra space below it if you don’t want padding
        markers: true        // handy for debugging start/end
      }
    });

    gsap.to(".header", {
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut",
      delay: 1,
    });



  });


  return (
    <div className="main">
      <div className="header fixed w-screen h-8 top-2 left-0 opacity-0 flex items-center space-x-2 px-4 z-50">
        <a href="https://www.linkedin.com/in/nigelloh15" target="_blank" className="relative w-9 h-9 backdrop-blur-lg bg-[rgba(242,238,233,0.5)] rounded-[0.4vw]">
          <Image src="/linkedin.svg" alt="linkedin" fill className="object-contain p-2" />

        </a>
        <a href="https://www.github.com/nigelloh15" target="_blank" className="relative w-9 h-9 backdrop-blur-lg bg-[rgba(242,238,233,0.5)] rounded-[0.4vw]">
          <Image src="/github.svg" alt="github" fill className="object-contain p-2" />
        </a>
      </div>
      <div className="spacer h-[12vh]">
      </div>
      <div className="stickybox sticky top-0 z-10">
        <div className="nigelbox flex justify-center">
          <div className="nigeltext pt-6 text-[20vw] md:pt-0 md:text-[15vw] lg:text-[10vw]">NIGEL</div>
        </div>
      </div>

      <div className="start w-screen h-[150vh]">
        <div className="spacer h-[9vh]">

        </div>
        <div className="w-full h-[64%] flex flex-col items-center">
          <div className="frontimagebox relative flex justify-center w-[85%] h-[80vh]">
            <Image src="/scenery.jpg" alt="Nigel" fill className="object-cover object-center rounded-[1vw]" />
          </div>
        </div>
        <div className="about px-[2.5vw] py-[1vh]">
          <div className="text-[4vw] md:text-[3vw] lg:text-[2.3vw] font-light">
            <span>
              Software Engineer from Vancouver, Math + CS @ University of Toronto
            </span>
            <span>&nbsp;</span>
            <span className="text-[#C2B9AC]">
              -  Strong interest in quant finance and machine learning, open to oppurtunities in both areas.
            </span>
          </div>
        </div>
      </div>

      <div className="w-screen h-[100vh] bg-gray-100">
      </div>
    </div>
  );
}
