// components/FavoritesSheet.tsx
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const favorites = [
  {
    id: "1",
    name: "Ly Thuong Kiet Parking Lot",
    image: "/images/parking1.jpg",
    district: "District 10",
    city: "Ho Chi Minh City",
    pricePerHour: 15000,
  },
  {
    id: "2",
    name: "Da Nang Riverside Parking Lot",
    image: "/images/parking2.jpg",
    district: "Hai Chau",
    city: "Da Nang",
    pricePerHour: 10000,
  },
];

export function FavoritesSheet() {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-96">
        <h2 className="text-lg font-bold mb-4">Favorite Parking Spots</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">You don't have any favorite spots yet.</p>
        ) : (
          <div className="space-y-4">
            {favorites.map((spot) => (
              <div key={spot.id} className="flex space-x-4">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{spot.name}</h3>
                  <p className="text-sm text-gray-500">
                    {spot.district}, {spot.city}
                  </p>
                  <p className="text-sm text-green-600">
                    {spot.pricePerHour.toLocaleString()}₫ / hour
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/parking/${spot.id}`)}
                    >
                      View Details
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
