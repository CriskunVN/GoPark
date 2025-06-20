"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Header from "@/components/Header";


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

const cityDistricts: Record<string, string[]> = {
  "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 5", "Quận 7"],
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Cầu Giấy", "Đống Đa"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Ngũ Hành Sơn"],
};

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const vehicleSlug = params.get("vehicle") || "";
  const vehicleType = vehicleMap[vehicleSlug] || "Select vehicle type";

  const [date, setDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [showResults, setShowResults] = useState(false);

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = String(Math.floor(i / 2)).padStart(2, "0");
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  const goToSummary = () => {
    const query = new URLSearchParams({
      vehicle: vehicleSlug,
      city,
      district,
      date: format(date!, "dd-MM-yyyy"),
      checkIn: startTime,
      checkOut: endTime,
    }).toString();
    router.push(`/booking/summary?${query}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Reserve Your Parking Spot
          </h1>
          <p className="text-gray-500">
            Vehicle type: <span className="font-semibold">{vehicleType}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>City</Label>
            <Select
              onValueChange={(val) => {
                setCity(val);
                setDistrict("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(cityDistricts).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>District</Label>
            <Select
              value={district}
              onValueChange={setDistrict}
              disabled={!city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {(cityDistricts[city] || []).map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  {date ? format(date, "dd/MM/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Check-in</Label>
            <Select onValueChange={setStartTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select check-in" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Check-out</Label>
            <Select onValueChange={setEndTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select check-out" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full mt-4"
          disabled={!date || !startTime || !endTime || !district || !city}
          onClick={handleSearch}
        >
          Find Parking
        </Button>

        {showResults && (
  <div className="mt-10 border-t pt-6 space-y-4">
    <h2 className="text-2xl font-semibold text-gray-800">
      Available Parking Lot
    </h2>

    {(() => {
      const [sh, sm] = startTime.split(":").map(Number);
      const [eh, em] = endTime.split(":").map(Number);
      const startMinutes = sh * 60 + sm;
      const endMinutes = eh * 60 + em;
      const durationHours = Math.max(Math.ceil((endMinutes - startMinutes) / 60), 0);

      const pricePerHour = 25000;
      const totalPrice = durationHours * pricePerHour;

      return (
        <div className="border p-4 rounded-xl shadow bg-white space-y-2">
          <p className="font-medium text-lg">
            Central Parking Lot - {district}, {city}
          </p>
          <p className="text-sm text-gray-500">
            {format(date!, "dd/MM/yyyy")} | {startTime} - {endTime}
          </p>
          <p className="text-sm">Vehicle type: <strong>{vehicleType}</strong></p>

          <hr className="my-2" />

          <div className="text-sm text-gray-700">
            <p>
              ⏱ Duration: <strong>{durationHours}</strong> hour(s)
            </p>
            <p>
              💸 Price per hour: <strong>{pricePerHour.toLocaleString("vi-VN")} VND</strong>
            </p>
            <p className="text-green-700 font-semibold">
              💰 Total Price: {totalPrice.toLocaleString("vi-VN")} VND
            </p>
          </div>

          <Button className="mt-4" onClick={goToSummary}>
            Continue to Reserve
          </Button>
        </div>
      );
    })()}
  </div>
)}

      </div>
    </div>
  );
}
