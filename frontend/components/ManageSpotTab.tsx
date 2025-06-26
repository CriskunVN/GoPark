import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { DropzoneUpload } from "@/components/DropzoneUpload";

interface Spot {
  id: string;
  name: string;
  address: string;
  pricePerHour: number;
  capacity?: number;
  available?: number;
}

interface ManageSpotTabProps {
  spots: Spot[];
  selectedSpotId: string;
  setSelectedSpotId: (value: string) => void;
  selectedSpot: Spot | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image: File | null;
  setImage: (file: File | null) => void;
}

export function ManageSpotTab({
  spots,
  selectedSpotId,
  setSelectedSpotId,
  selectedSpot,
  handleChange,
  image,
  setImage,
}: ManageSpotTabProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Edit Parking Spot Info</h2>
        <div className="space-y-3">
          <Label htmlFor="selectSpot">Select Spot</Label>
          <select
            id="selectSpot"
            className="w-full border rounded px-3 py-2"
            value={selectedSpotId}
            onChange={(e) => setSelectedSpotId(e.target.value)}
          >
            {spots.map((spot) => (
              <option key={spot.id} value={spot.id}>
                {spot.name}
              </option>
            ))}
          </select>

          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={selectedSpot?.name || ""}
            onChange={handleChange}
          />

          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={selectedSpot?.address || ""}
            onChange={handleChange}
          />

          <Label htmlFor="pricePerHour">Price / Hour (VND)</Label>
          <Input
            id="pricePerHour"
            name="pricePerHour"
            type="number"
            value={selectedSpot?.pricePerHour || 0}
            onChange={handleChange}
          />

          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            value={(selectedSpot as any)?.capacity || 50}
            onChange={handleChange}
          />

          <Label htmlFor="available">Available</Label>
          <Input
            id="available"
            name="available"
            type="number"
            value={(selectedSpot as any)?.available || 30}
            onChange={handleChange}
          />

          <h3 className="font-medium text-lg">Upload Image</h3>
          <DropzoneUpload
            onFilesAccepted={(files) => setImage(files[0])}
          />

          {image && (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(image)}
                alt="Preview"
                width={400}
                height={300}
                className="rounded-lg border shadow"
              />
            </div>
          )}

          <Button className="mt-4">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}