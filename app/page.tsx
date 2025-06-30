"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { ExpoScaleEase } from "gsap/EasePack";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const [stripWidth, setStripWidth] = useState<number>(0);

  useEffect(() => {
    // Function to update the strip width
    const updateStripWidth = () => {
      const strip = document.querySelector(".toptext");
      if (strip) {
        setStripWidth(strip.scrollWidth);
      }
    };

    // Initial call to set the width
    updateStripWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateStripWidth);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", updateStripWidth);
    };
  }, [stripWidth]);

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

    const textTL = gsap.timeline();

    textTL.to(".toptext", {
      x: -stripWidth / 6,
      duration: 6,
      ease: "none",
      repeat: -1, // Repeat indefinitely
    });
    textTL.set(".toptext", {
      x: 0,
    });

  }, [stripWidth]);

  useGSAP(() => {

    const textTL = gsap.timeline();

    textTL.to(".bottomtext", {
      x: stripWidth / 6,
      duration: 6,
      ease: "none",
      repeat: -1, // Repeat indefinitely
    });
    textTL.set(".bottomtext", {
      x: 0,
    });

  }, [stripWidth]);

  useGSAP(() => {

    gsap.registerPlugin(SplitText, ScrollTrigger);

    const split = new SplitText(".projecttext", { type: "chars" });

    const chars = split.chars; // an array of all the divs that wrap each character

    gsap.from(chars, {
      scrollTrigger: {
        trigger: ".projects",
        start: "top bottom-=20%",    // when .projecttext’s top hits the viewport top
      },
      yPercent: 130,
      stagger: 0.03,
      ease: "power1.inOut",
      duration: 1,

    });

  });

  useGSAP(() => {

    gsap.registerPlugin(TextPlugin, ScrollTrigger, ExpoScaleEase);

    const tl = gsap.timeline();

    tl.to(".header", {
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut",
      delay: 0.5,
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

    ScrollTrigger.create({
      trigger: '.temp',
      start: 'top top',
      end: 'bottom top',

      onEnter: () => gsap.set('.nigeltext', { color: 'var(--foreground)' }),
      onLeaveBack: () => gsap.set('.nigeltext', { color: 'var(--light)' }), // “” → fall back to CSS
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


    gsap.fromTo(".experience",
      {
        width: "95%",
      },
      {
        width: "100%",
        scrollTrigger: {
          trigger: ".experience",
          start: "top bottom",    // when <.skills>’s top hits the viewport top
          end: "+=30%",
          scrub: 0.5,
        }
      });

    gsap.fromTo(".experience",
      {
        width: "100%",
      },
      {
        width: "95%",
        scrollTrigger: {
          trigger: ".experience",
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
        <div className="relative experience bg-[var(--light)] rounded-[2vw] h-[120vh] overflow-hidden w-full">
          <div key={stripWidth} className="toptext absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] text-[var(--background)] text-nowrap w-full">
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
          </div>
          <div key={stripWidth + 1} className="bottomtext absolute bottom-0 right-4/5 text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] text-[var(--background)] text-nowrap w-full">
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
            <span>
              EXPERIENCE-
            </span>
          </div>


          <div className="skilllist py-[22vw] sm:py-[18vw] md:py-[15vw] lg:py-[12vw] h-full w-full flex flex-col justify-center text-[var(--background)] px-6">
            <div>
              <div className="lg:inline-block text-[8vw] md:text[7vw] lg:text-[5vw]">
                PointClickCare&nbsp;
              </div>
              <div className="lg:inline-block text-[3vw] md:text-[2vw] lg:text-[1vw]">
                May 2025 - August 2025
              </div>
            </div>
            <div className="text-[5vw] md:text-[4vw] lg:text-[2vw]">
              Data Intern
            </div>
          </div>

        </div>
        <div className="quote w-screen h-[50vh] z-20 bg-[var(--background)]">
          <div className="w-full h-full flex flex-col justify-center items-center text-[var(--mid)] text-center">
            <div className="text-[6vw] md:text-[4vw] lg:text-[2vw]">
              QUOTE OF THE TIME BEING
            </div>
            <div className="text-[3vw] md:text-[2vw] lg:text-[1vw] py-3">
              "Icaraus lauged as he fell. For he knew that falling meant that he had soared."
            </div>
          </div>
        </div>
        <div className="projects w-screen h-[190vh] sm:h-[300vh]">
          <div className="w-full h-full sm:flex sm:flex-row bg-[var(--mid)] rounded-[2vw] text-[var(--light)]">
            <div className="hidden sm:block relative h-full w-[50%]">
              <div className="sticky top-0 px-[3%] pt-[23%] md:pt-[10%] lg:pt-[7%]">
                <div className="overflow-hidden">
                  <div className="projecttext text-[8vw] lg:text-[6vw]">
                    PROJECTS
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-0 sm:w-[50%] overflow-hidden">
              <div className="overflow-hidden pt-[10%]">
                <div className="projecttext sm:hidden text-[10vw] h-[10vh]">
                  PROJECTS
                </div>
              </div>
              <div className="one w-full h-[60vh] sm:h-[100vh] flex flex-col justify-center pr-4">
                <Link href="https://www.onemillionnotes.co" target="_blank" className="text-[8vw] sm:text-[4vw] z-30">
                  <span>
                    OneMillionNotes
                  </span>
                  <span>&#8599;</span>
                </Link>
                <div className="text-[4vw] sm:text-[1.3vw]">
                  Winner of UofTHacks 12. Built with Next.js and Firebase, OneMillionNotes is a social media platform based on sticky note boards. It allows  users to users to anonymously submit short messages in real time with users across the globe.
                </div>
              </div>
              <div className="two w-full h-[60vh] sm:h-[100vh] flex flex-col justify-center pr-4">
                <Link href="https://github.com/hackbio-ca/ai-cancer-cell-labelling" target="_blank" className="text-[8vw] sm:text-[4vw] z-30">
                  <span>
                    Mammonet
                  </span>
                  <span>&#8599;</span>
                </Link>
                <div className="text-[4vw] sm:text-[1.3vw]">
                  Built with Next.js, Django, and PyTorch, Mammonet is a web application that assists with classifying malignant breast cancer histopathological images. Powered by a convolutional neural network, Mammonet can successfully identify malignant breast cancer cells with 86% accuracy.
                </div>
              </div>
              <div className="three w-full h-[60vh] sm:h-[100vh] flex flex-col justify-center pr-4">
                <Link href="https://github.com/nigelloh15/modulus" target="_blank" className="text-[8vw] sm:text-[4vw] z-30">
                  <span>
                    Modulus
                  </span>
                  <span>&#8599;</span>
                </Link>
                <div className="text-[4vw] sm:text-[1.3vw]">
                  Using Vite with React.js, Express.js, PrismaORM, and MongoDB, I developed Modulus, a social media platform designed for privacy. Modulus using RSA cryptography with the Miller-Rabin primality test to create encrypted messages that are publicly posted.
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="temp w-screen h-[20vh] z-20 bg-[var(--background)]">
          <div className="text-[4vw] text-right px-8">
          </div>
        </div>

        <div className="notes w-screen flex justify-center">
          <div className="w-[92%] h-full rounded-[1vw] bg-[var(--light)] overflow-hidden text-[var(--mid)]">
            <div className="text-[8vw] lg:text-[6vw] px-6 pt-4 lg:pt-0 h-[15vh]">
              NOTES
            </div>

            <div className="flex flex-col justify-evenly h-[80%] w-full pt-[0.2vw]">
              <div className="text-left py-6">
                <div className="text-[5vw] sm:text-[3vw] px-6">
                  Contact Me
                </div>
                <div className="text-[2vw] sm:text-[1vw] px-6">
                  For work inquires, contact me on my LinkedIn, in the top right corner.
                </div>
              </div>
              <div className="text-left py-6">
                <div className="text-[5vw] sm:text-[3vw] px-6">
                  Hobbies
                </div>
                <div className="text-[2vw] sm:text-[1vw] px-6">
                  Love making my own films, have used davinci resolve, premiere pro, after effects, and blender. Also love playing sports, hockey, tennis, volleyball, and pingpong.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="end w-screen h-[20vh] flex justify-center">

      </div>
    </div>
  );
}
