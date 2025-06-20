"use client";

import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage: string;
  textPosition?: 'left' | 'center' | 'right';
  textColor?: 'white' | 'black';
}

const HeroSection = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonHref,
  backgroundImage,
  textPosition = 'center',
  textColor = 'white'
}: HeroSectionProps) => {
  const textAlignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const textColorClass = textColor === 'white' ? 'text-white' : 'text-black';

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto ${textAlignment[textPosition]} ${textColorClass}`}>
          {subtitle && (
            <p className="text-sm font-medium mb-2 opacity-90">
              {subtitle}
            </p>
          )}

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">
            {description}
          </p>

          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            <a href={buttonHref} className="no-underline text-white">
              {buttonText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Specific hero components for different sections
export const MetconHero = () => (
  <HeroSection
    title="Smart Parking for Your Car"
    description="Easily find and book nearby parking spots with GoPark."
    buttonText="Book"
    buttonHref="/book/car"
    backgroundImage="/park1.jpg"
    textPosition="left"
    textColor="white"
  />
);

export const StyleByTeeTeeHero = () => (
  <HeroSection
    subtitle="Motorbike"
    title="Fast & Easy Parking"
    description="Book a safe spot for your motorbike in seconds."
    buttonText="Book"
    buttonHref="/book/motorbike"
    backgroundImage="/park2.jpg"
    textPosition="left"
    textColor="white"
  />
);

export const StyleByJordanLoveHero = () => (
  <HeroSection
    subtitle="Large Vehicles"
    title="Parking Made Easy"
    description="Spacious spots for buses and trucks."
    buttonText="Book"
    buttonHref="/book/large-vehicles"
    backgroundImage="/park3.jpg"
    textPosition="left"
    textColor="white"
  />
);


export default HeroSection;
