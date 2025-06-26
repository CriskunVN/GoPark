import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { mockLots, mockMapData } from "@/app/fakedata";

interface ParkingMapTabProps {
  selectedLotId: string;
  setSelectedLotId: (value: string) => void;
  currentLot: { id: string; name: string; total: number; booked: number; occupied: number } | undefined;
}

export function ParkingMapTab({
  selectedLotId,
  setSelectedLotId,
  currentLot,
}: ParkingMapTabProps) {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Parking Map - {currentLot?.name}</CardTitle>
            <CardDescription>Visual status of each parking slot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {mockMapData.map((slot) => (
                <div
                  key={slot.id}
                  className={`w-16 h-16 flex items-center justify-center rounded-lg text-sm font-semibold
                    ${
                      slot.status === "occupied"
                        ? "bg-red-500 text-white"
                        : slot.status === "booked"
                        ? "bg-yellow-400 text-white"
                        : "bg-green-500 text-white"
                    }`}
                >
                  {slot.id}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500" /> Free
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-400" /> Booked
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500" /> Occupied
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lot Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Select Lot</Label>
            <Select value={selectedLotId} onValueChange={setSelectedLotId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a lot" />
              </SelectTrigger>
              <SelectContent>
                {mockLots.map((lot) => (
                  <SelectItem key={lot.id} value={lot.id}>
                    {lot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Total Spots</TableCell>
                  <TableCell>{currentLot?.total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Booked</TableCell>
                  <TableCell>{currentLot?.booked}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Occupied</TableCell>
                  <TableCell>{currentLot?.occupied}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Free</TableCell>
                  <TableCell>
                    {(currentLot?.total ?? 0) -
                      ((currentLot?.booked ?? 0) +
                        (currentLot?.occupied ?? 0))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}