"use client";

interface ClassicItemProps {
  title: string;
  image: string;
  href: string;
}

const ClassicItem = ({ title, image, href }: ClassicItemProps) => {
  return (
    <a href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <div className="aspect-square w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-black group-hover:text-gray-600 transition-colors">
        {title}
      </h3>
    </a>
  );
};

const ParkingTypes = () => {
  const classicItems = [
    {
      title: "Overnight Parking",
      image: "/overnight.jpg",
      href: "/book/overnight",
    },
    {
      title: "Mall Parking",
      image: "mall.jpg",
      href: "/book/mall",
    },
    {
      title: "Event Parking",
      image: "event.jpg",
      href: "/book/event",
    },
    {
      title: "Basement Parking",
      image: "Basement.jpg",
      href: "/book/basement",
    },
    {
      title: "Outdoor Parking",
      image: "Outdoor.jpg",
      href: "/book/outdoor",
    },
    {
      title: "Reserved Spots",
      image: "Reserved Spots.jpg",
      href: "/book/reserved",
    },
    {
      title: "Airport Parking",
      image: "Airport.jpg",
      href: "/book/airport",
    },
    {
      title: "EV Charging",
      image: "EVCharging.jpg",
      href: "/book/ev",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Parking Types
          </h2>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {classicItems.map((item) => (
              <div key={item.title} className="flex-shrink-0 w-48">
                <ClassicItem
                  title={item.title}
                  image={item.image}
                  href={item.href}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {classicItems.map((item) => (
            <ClassicItem
              key={item.title}
              title={item.title}
              image={item.image}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParkingTypes;
