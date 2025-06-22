// app/parking/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { parkingData } from "@/app/parkingData";

const vehicleMap: Record<string, string> = {
  "car/4-5-seats": "Car (4–5 Seats)",
  "car/7-9-seats": "Car (7–9 Seats)",
  "car/electric": "Car (Electric)",
  "car/suv": "Car (SUV / Crossover)",
  "motorbike/petrol": "Motorbike (Petrol)",
  "motorbike/electric": "Motorbike (Electric)",
  "truck/pickup": "Truck (Pickup)",
  "truck/light": "Truck (Light Truck)",
  "truck/heavy": "Truck (Heavy Truck)",
  "coach/29-35": "Coach (29–35 Seats)",
  "coach/36-45": "Coach (36–45 Seats)",
  "coach/sleeper": "Coach (Sleeper Bus)",
  "minibus/10-12": "Mini Bus (10–12 Seats)",
  "minibus/13-16": "Mini Bus (13–16 Seats)",
  "minibus/luxury": "Mini Bus (Luxury Van)",
};

export default function ParkingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const spot = parkingData.find((p) => p.id === params?.id);

  const [selectedVehicle, setSelectedVehicle] = useState("");

  if (!spot) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Parking spot not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Banner */}
      <div className="relative w-full h-72">
        <Image
          src={spot.images[0]}
          alt={spot.name}
          fill
          className="object-cover rounded-b-xl"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Title */}
        <section>
          <h1 className="text-4xl font-bold mb-1">{spot.name}</h1>
          <p className="text-gray-500">{spot.address}</p>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
          <p className="leading-relaxed text-gray-700">{spot.description}</p>
        </section>

        {/* Amenities */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {spot.amenities.map((item) => (
              <div
                key={item}
                className="flex items-center space-x-2 text-gray-800"
              >
                <CheckCircle className="text-green-500 w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ratings */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Customer Ratings</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(spot.ratings).map(([key, value]) => (
              <Card key={key} className="p-4 shadow-sm border-gray-200">
                <CardContent className="p-0">
                  <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 capitalize">
                    <span>{key.replace(/([A-Z])/g, " $1")}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={value} className="h-2 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Nearby */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">What’s Nearby?</h2>
          <Card className="p-4 bg-gray-100">
            <CardContent className="p-0">
              <ul className="list-disc ml-5 space-y-2 text-gray-700">
                {spot.nearby.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Booking Section */}
        <section className="border-t pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            {/* Vehicle Type + Book Button */}
            <div>
              <p className="text-xl font-bold">
                {spot.pricePerHour.toLocaleString("vi-VN")}đ / hour
              </p>

              <div className="mt-3 space-y-3">
                <div>
                  <Label className="mb-1 block">Select Vehicle Type</Label>
                  <Select onValueChange={setSelectedVehicle}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choose vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vehicleMap).map(([slug, label]) => (
                        <SelectItem key={slug} value={slug}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  disabled={!selectedVehicle}
                  onClick={() => {
                    const query = new URLSearchParams({
                      vehicle: selectedVehicle,
                      spot: spot.name,
                      city: spot.city,
                      district: spot.district,
                    }).toString();
                    router.push(`/booking?${query}`);
                  }}
                  className="w-full sm:w-64 bg-black text-white hover:bg-gray-800"
                >
                  Book This Spot
                </Button>
              </div>
            </div>

            {/* Optionally: Add additional details / promotion / time picker here */}
          </div>
        </section>
      </main>
    </div>
  );
}
