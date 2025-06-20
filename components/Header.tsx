"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ChevronDown } from "lucide-react";
import { FavoritesSheet } from "@/components/FavoritesSheet";
import { ShoppingBagSheet } from "@/components/ShoppingBagSheet";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const mainMenuItems = [
    {
      name: "Car",
      subMenu: [
        { name: "4–5 Seats", vehicle: "car/4-5-seats" },
        { name: "7–9 Seats", vehicle: "car/7-9-seats" },
        { name: "Electric Car", vehicle: "car/electric" },
        { name: "SUV / Crossover", vehicle: "car/suv" },
      ],
    },
    {
      name: "Mini Bus",
      subMenu: [
        { name: "10–12 Seats", vehicle: "minibus/10-12" },
        { name: "13–16 Seats", vehicle: "minibus/13-16" },
        { name: "Luxury Van", vehicle: "minibus/luxury" },
      ],
    },
    {
      name: "Truck",
      subMenu: [
        { name: "Pickup", vehicle: "truck/pickup" },
        { name: "Light Truck", vehicle: "truck/light" },
        { name: "Heavy Truck", vehicle: "truck/heavy" },
      ],
    },
    {
      name: "Coach",
      subMenu: [
        { name: "29–35 Seats", vehicle: "coach/29-35" },
        { name: "36–45 Seats", vehicle: "coach/36-45" },
        { name: "Sleeper Bus", vehicle: "coach/sleeper" },
      ],
    },
    {
      name: "Motorbike",
      subMenu: [
        { name: "Petrol Motorbike", vehicle: "motorbike/petrol" },
        { name: "Electric Motorbike", vehicle: "motorbike/electric" },
      ],
    },
  ];

  return (
    <header className="w-full">
      <div className="bg-gray-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="hidden md:flex items-center space-x-6"></div>
            <div className="flex items-center space-x-6 text-black">
              <a href="/help" className="hover:text-gray-600 transition-colors">
                Help
              </a>
              <span className="text-gray-300">|</span>
              <a href="/register" className="hover:text-gray-600 transition-colors">
                Register
              </a>
              <span className="text-gray-300">|</span>
              <a href="/login" className="hover:text-gray-600 transition-colors">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="h-8 w-24 bg-black text-white flex items-center justify-center font-bold text-lg rounded-sm">
                GoPark
              </a>
            </div>

            <nav className="hidden lg:flex space-x-8">
              {mainMenuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button className="flex items-center space-x-1 px-3 py-2 text-base font-medium text-black hover:text-gray-600 transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      {item.subMenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => router.push(`/booking?vehicle=${subItem.vehicle}`)}
                          className="block text-left w-full px-3 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded transition-colors"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                {!searchOpen ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(true)}
                    className="hover:bg-gray-100"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                ) : (
                  <div className="flex items-center">
                    <Input
                      type="search"
                      placeholder="Search"
                      className="w-48 h-10"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchOpen(false)}
                      className="ml-2"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <FavoritesSheet />
              <ShoppingBagSheet />

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <nav className="mt-8">
                    {mainMenuItems.map((item) => (
                      <div key={item.name} className="mb-4">
                        <span className="block px-4 py-2 text-lg font-medium text-black">
                          {item.name}
                        </span>
                        <div className="ml-4 mt-2">
                          {item.subMenu.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => router.push(`/booking?vehicle=${subItem.vehicle}`)}
                              className="block w-full text-left px-4 py-1 text-sm text-gray-600 hover:text-black"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
