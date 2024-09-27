// "use client"

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import { gsap } from "gsap";
    
// import { ScrollTrigger } from "gsap/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);

// type ProjectCardProps = {
//     title: string,
//     tags: string[],
//     imageSrc: string,
//     imageWidth: number,
//     imageHeight: number,
//     titleColor: string,
//     tagBgColor: string,
//     tagTextColor: string,
//     gradient1: string,
//     gradient2: string
//     path: string

// };

// const ProjectCard: React.FC<ProjectCardProps> = ({
//     title,
//     tags,
//     imageSrc,
//     imageWidth,
//     imageHeight,
//     titleColor,
//     tagBgColor,
//     tagTextColor,
//     gradient1,
//     gradient2,
//     path
// }) => {
//     const [isHovered, setIsHovered] = useState(false);


//     return (

//         <div className="flex justify-center items-center  pt-10 px-2">





//             <div
//                 // className={`relative max-w-[1020px] h-[350px] p-6 rounded-3xl bg-gradient-to-r from-[#A7BFE8] to-[#6190e8] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full`}
//                 // className={`relative max-w-[1020px] h-[350px] p-6 rounded-3xl bg-gradient-to-r from-${gradient1} to-${gradient2} overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full`}

//                 className="relative max-w-[1020px] h-[400px] p-6 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full"
//                 style={{
//                     background: `linear-gradient(to bottom, ${gradient1}, ${gradient2})` // Gradient applied via inline styles
//                 }}

//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <Link
//                     key={path}
//                     href={path}>
//                     {/* Static title and subtitle */}
//                     <div className="absolute bottom-4 left-4 z-20 align-bottom">
//                         {/* <span className="inline-block px-3 py-1 mb-2 text-sm font-medium text-white bg-gray-700 rounded-full">
//                       {title}
//                     </span> */}
//                         <h2 className={`text-4xl font-medium `} style={{
//                             color: `${titleColor}`,  // Gradient applied via inline styles
//                         }}>{title}</h2>
//                         <div className="mt-2 flex space-x-2">
//                             {tags.map((tag) => {

//                                 return (
//                                     <span
//                                         key={tag}
//                                         className={`px-2 py-1 text-xs  rounded`}
//                                         style={{
//                                             color: `${tagTextColor}`,
//                                             background: `${tagBgColor}` // Gradient applied via inline styles
//                                         }}
//                                     >{tag}</span>
//                                 );
//                             })}


//                             {/* <span className="px-2 py-1 text-xs text-white bg-gray-800 rounded">iOS</span>
//                         <span className="px-2 py-1 text-xs text-white bg-gray-800 rounded">Design direction</span>
//                         <span className="px-2 py-1 text-xs text-white bg-gray-800 rounded">Team lead</span> */}
//                         </div>
//                     </div>

//                     {/* Image of the mobile phone */}
//                     <div className={`relative z-1 flex justify-center mt-10 ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-500 ease-in-out`}>


//                         <Image
//                             src={imageSrc} // Replace with the actual image path
//                             alt="Mobile phone"
//                             width={imageWidth}
//                             height={imageHeight}
//                             className="object-cover"
//                         />

//                     </div>

//                     {/* Gradient background */}
//                     {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E86190]  z-15"></div> */}
//                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black mt-40 opacity-70 z-15"></div>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ProjectCard;

"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectCardProps = {
    title: string,
    tags: string[],
    imageSrc: string,
    imageWidth: number,
    imageHeight: number,
    titleColor: string,
    tagBgColor: string,
    tagTextColor: string,
    gradient1: string,
    gradient2: string,
    path: string
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    tags,
    imageSrc,
    imageWidth,
    imageHeight,
    titleColor,
    tagBgColor,
    tagTextColor,
    gradient1,
    gradient2,
    path
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animation for the card scale and fade-in effect
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { scale: 0.9, opacity:0.6 }, // Starting state
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 80%", // Start when the card is 80% from the top of the viewport
                        end: "bottom 80%",
                        toggleActions: "play none none reverse",
                        scrub: 4, // Smooth animation tied to scroll
                    },
                }
            );
        }

        // Animation for zooming the image as the user scrolls
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { scale: 0.8 }, // Start with normal size
                {
                    scale: 1.2, // Zoom in
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current, // Use the card as the trigger
                        start: "top 80%", // Start zoom when the card is 80% from the top
                        end: "bottom 20%", // Finish zooming at this point
                        scrub: 6, // Smooth zoom based on scroll
                    },
                }
            );
        }
    }, []);

    return (
        <div className="flex justify-center items-center pt-10 px-2">
            <div
                ref={cardRef}
                className="relative max-w-[1020px] h-[400px] p-6 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full"
                style={{
                    background: `linear-gradient(to bottom, ${gradient1}, ${gradient2})` // Gradient applied via inline styles
                }}
            >
                <Link href={path}>
                    {/* Title and Tags */}
                    <div className="absolute bottom-4 left-4 z-20">
                        <h2 className="text-4xl font-medium" style={{ color: titleColor }}>
                            {title}
                        </h2>
                        <div className="mt-2 flex space-x-2">
                            {tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-xs rounded"
                                    style={{ color: tagTextColor, background: tagBgColor }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="relative z-1 flex justify-center mt-10">
                        <Image
                            src={imageSrc}
                            alt="Mobile phone"
                            width={imageWidth}
                            height={imageHeight}
                            className="object-cover"
                        />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-15"></div>
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;