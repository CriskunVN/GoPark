"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import { DropzoneUpload } from "@/components/DropzoneUpload";
import Image from "next/image";
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  XAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { parkingData } from "@/app/parkingData"; // ✅ import dữ liệu

const fakeBookings = [
  {
    id: "1",
    user: "Nguyen Van A",
    time: "2025-06-21 08:00",
    vehicle: "Car",
    duration: "2h",
    amount: 40000,
    status: "pending",
  },
  {
    id: "2",
    user: "Tran Thi B",
    time: "2025-06-21 10:30",
    vehicle: "Motorbike",
    duration: "1h",
    amount: 15000,
    status: "approved",
  },
];

const chartData = [
  { date: "2024-07-15", car: 10, motorbike: 20, income: 400000 },
  { date: "2024-07-16", car: 5, motorbike: 25, income: 350000 },
  { date: "2024-07-17", car: 8, motorbike: 15, income: 280000 },
  { date: "2024-07-18", car: 12, motorbike: 30, income: 550000 },
  { date: "2024-07-19", car: 6, motorbike: 18, income: 300000 },
  { date: "2024-07-20", car: 9, motorbike: 22, income: 420000 },
];

const pieData = [
  { name: "Car", value: 60 },
  { name: "Motorbike", value: 40 },
];

const COLORS = ["#10B981", "#3B82F6"];

export default function OwnerDashboard() {
  const router = useRouter();
  const [spots, setSpots] = useState(parkingData); // ✅ dùng dữ liệu thật
  const [selectedSpotId, setSelectedSpotId] = useState(spots[0]?.id ?? "");
  const selectedSpot = spots.find((s) => s.id === selectedSpotId);
  const [image, setImage] = useState<File | null>(null);
  const [chartType, setChartType] = useState("area");
  const [autoApprove, setAutoApprove] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSpots = spots.map((spot) =>
      spot.id === selectedSpotId
        ? { ...spot, [e.target.name]: e.target.value }
        : spot
    );
    setSpots(updatedSpots);
  };

  const handleApprove = (id: string) => {
    alert(`Approved booking ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected booking ${id}`);
  };

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey="car"
                stroke="#10B981"
                fill="#D1FAE5"
              />
              <Area
                type="monotone"
                dataKey="motorbike"
                stroke="#3B82F6"
                fill="#DBEAFE"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="car" fill="#10B981" />
              <Bar dataKey="motorbike" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Parking Owner Dashboard</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push(`/parking/${selectedSpotId}`)}
            variant="outline"
          >
            View My Parking Page
          </Button>
          <Button onClick={() => alert("Logged out")}>Logout</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="manage">Manage Spot</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="capacity">Capacity</TabsTrigger>
        </TabsList>

        {/* --- OVERVIEW TAB --- */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Chart</CardTitle>
              <CardDescription>
                Select a chart type to analyze data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Chart Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
              {renderChart()}
            </CardContent>
          </Card>

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
                    <TableHead>Customer</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Total</TableHead>
                    {!autoApprove && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fakeBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.time}</TableCell>
                      <TableCell>{booking.vehicle}</TableCell>
                      <TableCell>{booking.duration}</TableCell>
                      <TableCell>
                        {booking.amount.toLocaleString()} VND
                      </TableCell>
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
        </TabsContent>

        {/* --- MANAGE SPOT --- */}
        <TabsContent value="manage">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                Edit Parking Spot Info
              </h2>
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
        </TabsContent>

        {/* --- REVENUE --- */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#F97316"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- CAPACITY --- */}
        <TabsContent value="capacity">
          <Card>
            <CardHeader>
              <CardTitle>Capacity & Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parking Spot</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Occupancy Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spots.map((spot) => {
                    const capacity = Number((spot as any)?.capacity || 50);
                    const available = Number((spot as any)?.available || 30);
                    const filledRate = Math.round(
                      ((capacity - available) / capacity) * 100
                    );
                    return (
                      <TableRow key={spot.id}>
                        <TableCell>{spot.name}</TableCell>
                        <TableCell>{capacity}</TableCell>
                        <TableCell>{available}</TableCell>
                        <TableCell>{filledRate}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
