"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Logos = () => {
    const logos = [
        { src: "/imgs/logos/logo-1.png", width: 187, height: 30 },
        { src: "/imgs/logos/logo-2.png", width: 190, height: 30 },
        { src: "/imgs/logos/logo-3.png", width: 145, height: 30 },
        { src: "/imgs/logos/logo-4.png", width: 166, height: 30 },
        { src: "/imgs/logos/logo-5.png", width: 135, height: 30 },
        { src: "/imgs/logos/logo-6.png", width: 290, height: 30 },
        { src: "/imgs/logos/logo-7.png", width: 230, height: 30 }
    ];

    const settings = {
        
        dots: false,
        arrows: false,
        infinite: true, 
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        cssEase: "ease",
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            }
        ]
    };

    return (
        <div className="py-10 container mx-auto overflow-hidden">
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <div key={index} className="px-4 flex justify-center items-center">
                        <Image 
                            src={logo.src} 
                            alt={`logo-${index+1}`} 
                            width={logo.width} 
                            height={logo.height} 
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Logos;
