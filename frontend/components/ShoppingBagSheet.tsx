// components/ShoppingBagSheet.tsx
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { parkingData } from "@/app/parkingData"; // adjust path if needed

const mockBooking = {
  spotId: "airport",
  vehicle: "car/4-5-seats",
  city: "Đà Nẵng",
  district: "Hải Châu",
  date: new Date(),
  checkIn: "09:00",
  checkOut: "12:00",
};

export function ShoppingBagSheet() {
  const router = useRouter();

  const selectedSpot = parkingData.find((spot) => spot.id === mockBooking.spotId);
  const duration = (() => {
    const [sh, sm] = mockBooking.checkIn.split(":").map(Number);
    const [eh, em] = mockBooking.checkOut.split(":").map(Number);
    return Math.max(Math.ceil(((eh * 60 + em) - (sh * 60 + sm)) / 60), 0);
  })();

  const total = selectedSpot ? duration * selectedSpot.pricePerHour : 0;

  const goToSummary = () => {
    const query = new URLSearchParams({
      spot: selectedSpot?.id ?? "",
      vehicle: mockBooking.vehicle,
      city: mockBooking.city,
      district: mockBooking.district,
      date: format(mockBooking.date, "dd-MM-yyyy"),
      checkIn: mockBooking.checkIn,
      checkOut: mockBooking.checkOut,
    }).toString();

    router.push(`/booking/summary?${query}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-96">
        <h2 className="text-lg font-bold mb-4">Your Booking Cart</h2>
        {selectedSpot ? (
          <div className="space-y-3">
            <div>
              <p className="font-semibold">{selectedSpot.name}</p>
              <p className="text-sm text-gray-500">{duration} hour(s)</p>
              <p className="text-sm text-green-600">
                {total.toLocaleString("vi-VN")}₫
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => router.push(`/booking?spot=${selectedSpot.id}`)}
              >
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Button className="w-full mt-4" onClick={goToSummary}>
              Proceed to Checkout
            </Button>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is currently empty.</p>
        )}
      </SheetContent>
    </Sheet>
  );
}
