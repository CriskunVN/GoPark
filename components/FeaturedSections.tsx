"use client";

import { Button } from "@/components/ui/button";

interface FeaturedCardProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  href: string;
}

const FeaturedCard = ({
  title,
  subtitle,
  backgroundImage,
  href,
}: FeaturedCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer">
      <div className="aspect-[4/3] w-full">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300" />

      {/* Content */}
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4 opacity-90">{subtitle}</p>
        <Button
          size="sm"
          className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-full font-medium transition-all duration-300"
        >
          <a href={href} className="no-underline text-black">
            Book
          </a>
        </Button>
      </div>
    </div>
  );
};

const FeaturedSections = () => {
  const featuredItems = [
    {
      title: "Car Parking",
      subtitle: "Find a Spot Fast",
      backgroundImage: "park6.jpg",
      href: "/book/car",
    },
    {
      title: "Motorbike",
      subtitle: "Park in Seconds",
      backgroundImage: "park5.jpg",
      href: "/book/motorbike",
    },
    {
      title: "Truck & Bus",
      subtitle: "Big Vehicle Parking",
      backgroundImage: "park4.jpg",
      href: "/book/large-vehicles",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <FeaturedCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              backgroundImage={item.backgroundImage}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
