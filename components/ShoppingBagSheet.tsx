// components/ShoppingBagSheet.tsx
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function ShoppingBagSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] p-6">
        <div className="text-xl font-semibold mb-4">Your Reservation Cart</div>

        <div className="space-y-4">
          <div className="border rounded-xl p-4 flex flex-col gap-1 bg-white shadow-sm">
            <div className="text-base font-medium">Ben Thanh Parking Lot</div>
            <div className="text-sm text-muted-foreground">
              20/06/2025 - 9:00 to 11:00
            </div>
            <div className="text-sm">Price: 50,000₫</div>
            <Button size="sm" variant="outline" className="mt-2 w-fit">
              Remove
            </Button>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>50,000₫</span>
          </div>
          <Button className="mt-4 w-full">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}