"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { parkingData } from "@/app/parkingData";
import { OverviewTab } from "@/components/OverviewTab";
import { ManageSpotTab } from "@/components/ManageSpotTab";
import { BookingsTab } from "@/components/BookingsTab";
import { ParkingMapTab } from "@/components/ParkingMapTab";
import { ProfileTab } from "@/components/ProfileTab";
import { mockLots } from "@/app/fakedata";

interface Spot {
  id: string;
  name: string;
  address: string;
  pricePerHour: number;
  capacity?: number;
  available?: number;
}

export default function OwnerDashboard() {
  const [selectedLotId, setSelectedLotId] = useState("lot1");
  const currentLot = mockLots.find((lot) => lot.id === selectedLotId);

  const router = useRouter();
  const [spots, setSpots] = useState<Spot[]>(parkingData);
  const [selectedSpotId, setSelectedSpotId] = useState(spots[0]?.id ?? "");
  const selectedSpot = spots.find((s) => s.id === selectedSpotId);
  const [image, setImage] = useState<File | null>(null);
  const [chartType, setChartType] = useState("area");
  const [autoApprove, setAutoApprove] = useState(true);
  const [dataView, setDataView] = useState("income");
  const [selectedDate, setSelectedDate] = useState("2024-07-15");

  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

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
          <TabsTrigger value="manage-spot">Manage Spot</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="parking-map">Parking Map</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            dataView={dataView}
            setDataView={setDataView}
            chartType={chartType}
            setChartType={setChartType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            formatCurrency={formatCurrency}
          />
        </TabsContent>

        <TabsContent value="manage-spot">
          <ManageSpotTab
            spots={spots}
            selectedSpotId={selectedSpotId}
            setSelectedSpotId={setSelectedSpotId}
            selectedSpot={selectedSpot}
            handleChange={handleChange}
            image={image}
            setImage={setImage}
          />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsTab
            autoApprove={autoApprove}
            setAutoApprove={setAutoApprove}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </TabsContent>

        <TabsContent value="parking-map">
          <ParkingMapTab
            selectedLotId={selectedLotId}
            setSelectedLotId={setSelectedLotId}
            currentLot={currentLot}
          />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}