import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import { fakeBookings } from "@/app/fakedata";

interface BookingsTabProps {
  autoApprove: boolean;
  setAutoApprove: (value: boolean) => void;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

export function BookingsTab({
  autoApprove,
  setAutoApprove,
  handleApprove,
  handleReject,
}: BookingsTabProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>
          Manage booking requests. Manual approval toggle:
          <div className="mt-2 flex items-center gap-2">
            <Switch
              id="auto-approve"
              checked={autoApprove}
              onCheckedChange={setAutoApprove}
            />
            <Label htmlFor="auto-approve">Auto Approve</Label>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Spot Position</TableHead>
              {!autoApprove && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fakeBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.user}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.vehicle}</TableCell>
                <TableCell>{booking.duration}</TableCell>
                <TableCell>{booking.amount.toLocaleString()} VND</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.licensePlate}</TableCell>
                <TableCell>{booking.spotPosition}</TableCell>
                {!autoApprove && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(booking.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}