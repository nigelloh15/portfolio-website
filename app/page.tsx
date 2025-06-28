"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExpoScaleEase } from "gsap/EasePack";
import Image from "next/image";

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

    // grab the element once
    const strip = document.querySelector(".toptext");
    // its full pixel width (off-screen part included)
    if (!strip) return;

    const stripWidth = strip?.scrollWidth;

    const textTL = gsap.timeline();

    textTL.to(".toptext", {
      x: -stripWidth / 6,
      duration: 6,
      ease: "none",
      repeat: -1, // Repeat indefinitely
      invalidateOnRefresh: true,
    });
    textTL.set(".toptext", {
      x: 0,
    });

  });

  useGSAP(() => {

    // grab the element once
    const strip = document.querySelector(".bottomtext");
    // its full pixel width (off-screen part included)
    if (!strip) return;

    const stripWidth = strip?.scrollWidth;

    const textTL = gsap.timeline();

    textTL.to(".bottomtext", {
      x: stripWidth / 6,
      duration: 6,
      ease: "none",
      repeat: -1, // Repeat indefinitely
      invalidateOnRefresh: true,
    });
    textTL.set(".bottomtext", {
      x: 0,
    });

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
      }
    });

    ScrollTrigger.create({
      trigger: '.quote',
      start: 'top top',
      end: 'bottom top',

      onEnter: () => gsap.set('.nigeltext', { color: 'var(--light)' }),
      onLeaveBack: () => gsap.set('.nigeltext', { color: 'var(--foreground)' }), // “” → fall back to CSS
    });

    gsap.to(".about", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".start",
        start: "clamp(top bottom)",    // when .nigel’s top hits the viewport top
        end: "bottom-=45% top",          // finish the tween when you've scrolled 10% of the viewport height
        scrub: 0.5,         // link tween to scroll
      },
    });


    gsap.fromTo(".skills",
      {
        width: "95%",
      },
      {
        width: "100%",
        scrollTrigger: {
          trigger: ".skills",
          start: "top bottom",    // when <.skills>’s top hits the viewport top
          end: "+=30%",
          scrub: 0.5,
        }
      });

    gsap.fromTo(".skills",
      {
        width: "100%",
      },
      {
        width: "95%",
        scrollTrigger: {
          trigger: ".skills",
          start: "bottom+=20% bottom",    // when <.skills>’s top hits the viewport top
          end: "+=80%",          // finish the tween when you've scrolled 10% of the viewport height
          scrub: 0.5,
        }
      });

  });


  return (
    <div className="main">
      <div className="header fixed h-8 top-4 right-0 opacity-0 flex items-center space-x-2 px-4 z-50">
        <a href="https://www.linkedin.com/in/nigelloh15" target="_blank" className="relative w-9 h-9 backdrop-blur-lg bg-[rgba(242,238,233,0.5)] rounded-[0.4vw]">
          <Image src="/linkedin.svg" alt="linkedin" fill className="object-contain p-2" />

        </a>
        <a href="https://www.github.com/nigelloh15" target="_blank" className="relative w-9 h-9 backdrop-blur-lg bg-[rgba(242,238,233,0.5)] rounded-[0.4vw]">
          <Image src="/github.svg" alt="github" fill className="object-contain p-2" />
        </a>
      </div>
      <div className="spacer h-[12vh]">
      </div>
      <div className="stickybox sticky top-0 z-10 pt-3 lg:pt-0">
        <div className="nigelbox flex flex-col items-center w-full h-[40vh]">
          <div className="nigeltext text-[var(--foreground)] text-[min(20vh,20vw)] md:pt-0 md:text-[min(15vw,15vh)] lg:text-[10vw]">NIGEL</div>
        </div>
      </div>

      <div className="start w-screen h-[48vh]">
        <div className="about px-[5vw] z-10 sticky">
          <div className="text-[min(4vw, 4vh)] md:text-[3vw] lg:text-[2.3vw] font-light text-[var(--mid)]">
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
      <div className="later flex flex-col w-screen z-20 items-center">
        <div className="relative skills bg-[var(--light)] rounded-[2vw] h-[120vh] overflow-hidden w-full">
          <div className="toptext absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] text-[var(--background)] text-nowrap w-full">
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
          </div>

          <div className="bottomtext absolute bottom-0 right-4/5 text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] text-[var(--background)] text-nowrap w-full">
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
            <span>
              SKILLS-
            </span>
          </div>
        </div>
        <div className="quote w-screen h-[50vh] z-20 bg-[var(--background)]">
          <div className="w-full h-full flex flex-col justify-center items-center text-[var(--mid)] text-center">
            <div className="text-[6vw] md:text-[4vw] lg:text-[2vw]">
              QUOTE FOR NOW
            </div>
            <div className="text-[3vw] md:text-[2vw] lg:text-[1vw] py-3">
              "Icaraus lauged as he fell. For he knew that falling meant that he had soared."
            </div>
          </div>
        </div>
        <div className="projects w-screen h-[190vh] sm:h-[300vh]">
          <div className="w-full h-full sm:flex sm:flex-row bg-[var(--mid)] rounded-[2vw] text-[var(--light)]">
            <div className="hidden sm:block relative h-full w-[50%]">
              <div className="sticky top-0 px-[2%] pt-[23%] md:pt-[10%] lg:pt-[7%]">
                <div className="text-[8vw] lg:text-[5vw]">
                  PROJECTS
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-0 sm:w-[50%] overflow-hidden">
                <div className="sm:hidden text-[10vw] pt-[10%] h-[10vh]">
                  PROJECTS
                </div>
              <div className="one w-full h-[60vh] sm:h-[100vh] flex flex-col justify-center">
                <div className="text-[8vw] sm:text-[4vw]">
                  OneMillionNotes
                </div>
                <div className="text-[4vw] sm:text-[1.3vw]">
                  This is a project I worked on with a team of 4. It is a web application that allows users to create, share, and discover notes on various topics. The application is built using React, Node.js, and MongoDB.
                </div>
              </div>
              <div className="one w-full h-[60vh] sm:h-[100vh] flex flex-col justify-center">
                <div className="text-[8vw] sm:text-[4vw]">
                  OneMillionNotes
                </div>
                <div className="text-[4vw] sm:text-[1.3vw]">
                  This is a project I worked on with a team of 4. It is a web application that allows users to create, share, and discover notes on various topics. The application is built using React, Node.js, and MongoDB.
                </div>
              </div>
              <div className="one w-full h-[60vh] sm:h-[100vh] flex flex-col justify-center">
                <div className="text-[8vw] sm:text-[4vw]">
                  OneMillionNotes
                </div>
                <div className="text-[4vw] sm:text-[1.3vw]">
                  This is a project I worked on with a team of 4. It is a web application that allows users to create, share, and discover notes on various topics. The application is built using React, Node.js, and MongoDB.
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="w-screen h-[120vh] z-20 bg-[var(--background)]">

        </div>
      </div>
    </div>
  );
}
