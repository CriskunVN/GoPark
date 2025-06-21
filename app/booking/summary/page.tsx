"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

export default function ReservationSummary() {
  const params = useSearchParams();

  const spot = params.get("spot"); // ✅ lấy tên bãi đỗ xe
  const vehicle = params.get("vehicle");
  const city = params.get("city");
  const district = params.get("district");
  const date = params.get("date");
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";

  const [paymentMethod, setPaymentMethod] = useState<string>("momo");
  const [open, setOpen] = useState(false);

  const pricePerHour = 25000;
  const [sh, sm] = checkIn.split(":").map(Number);
  const [eh, em] = checkOut.split(":").map(Number);
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  const durationHours = Math.max(Math.ceil((endMinutes - startMinutes) / 60), 0);
  const totalPrice = durationHours * pricePerHour;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto py-12 px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Booking Info */}
          <div className="space-y-4 border border-gray-200 p-6 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>🏙 Parking Spot:</strong> {spot}</p>
              <p><strong>🚗 Vehicle:</strong> {vehicle}</p>
              <p><strong>📍 Location:</strong> {district}, {city}</p>
              <p><strong>📅 Date:</strong> {date}</p>
              <p><strong>⏱ Time:</strong> {checkIn} - {checkOut}</p>
              <p><strong>🕒 Duration:</strong> {durationHours} hour(s)</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6 border border-gray-200 p-6 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Price per hour</span>
                <span>{pricePerHour.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{durationHours} hour(s)</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-green-700 text-base">
                <span>Total</span>
                <span>{totalPrice.toLocaleString("vi-VN")} VND</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="momo">🟣 MoMo</SelectItem>
                  <SelectItem value="vnpay">🔵 VNPay</SelectItem>
                  <SelectItem value="card">💳 Credit / Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Confirm Button + Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4">Confirm Reservation</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md text-center">
                <DialogHeader>
                  <CheckCircle className="text-green-600 w-10 h-10 mx-auto mb-2" />
                  <DialogTitle>Reservation Confirmed</DialogTitle>
                  <DialogDescription>
                    <p className="mt-2">Your parking spot has been successfully reserved.</p>
                    <p className="font-semibold text-green-700 mt-2">
                      Total: {totalPrice.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="text-sm text-gray-500">
                      Paid via <span className="capitalize">{paymentMethod}</span>
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="mx-auto mt-4"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
