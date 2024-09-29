"use client"
import { useEffect, FC, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import TitleComponent from './TittleWidget';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer: FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate the text when it scrolls into view
    gsap.fromTo(
      textRef.current, // Ensure the current DOM element is referenced
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        
        scrollTrigger: {
            scrub: 3,
          trigger: textRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse', // Ensure the animation plays and reverses when scrolling back
        },
      }
    );

    gsap.fromTo(
      buttonRef.current, // Ensure the current DOM element is referenced
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { 
            scrub: 1,
          trigger: buttonRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse', // Enable reverse animation on scroll up
        },
      }
    );
    
    // Clean up ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-screen-xl ">

    
     <TitleComponent title='CONTACT US'/>
    <footer className="flex flex-col items-center justify-center py-10 bg-gradient-to-r   to-gray-900 text-white">
      <h2 ref={textRef} className="text-4xl md:text-7xl font-bold mb-6">
        Let’s create your next big idea.
      </h2>
      <button
        ref={buttonRef}
        className="px-6 py-3 my-10 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
        aria-label="Schedule a call"
      >
        Schedule a call →
      </button>
      <p className="text-sm text-gray-400 mt-8">
        © 2024 Designed by Dilshad Kallai
      </p>
    </footer>
    </div>
  );
};

export default Footer;