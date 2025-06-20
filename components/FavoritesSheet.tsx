"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function FavoritesSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <Heart className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] p-6">
        <div className="text-xl font-semibold mb-4">Your Favorites</div>

        <div className="text-sm text-muted-foreground text-center mt-12">
          You haven't added any favorite parking lots yet.
        </div>
      </SheetContent>
    </Sheet>
  );
}

