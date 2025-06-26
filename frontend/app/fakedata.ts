export const fakeBookings = [
  {
    id: "1",
    user: "Nguyen Van A",
    time: "2025-06-21 08:00",
    vehicle: "Car",
    duration: "2h",
    amount: 40000,
    status: "pending",
    licensePlate: "51F-123.45",
    spotPosition: "A12",
  },
  {
    id: "2",
    user: "Tran Thi B",
    time: "2025-06-21 10:30",
    vehicle: "Motorbike",
    duration: "1h",
    amount: 15000,
    status: "approved",
    licensePlate: "59C1-987.65",
    spotPosition: "B05",
  },
];

export const chartData = [
  { date: "2024-07-15", car: 10, motorbike: 20, income: 400000 },
  { date: "2024-07-16", car: 5, motorbike: 25, income: 350000 },
  { date: "2024-07-17", car: 8, motorbike: 15, income: 280000 },
  { date: "2024-07-18", car: 12, motorbike: 30, income: 550000 },
  { date: "2024-07-19", car: 6, motorbike: 18, income: 300000 },
  { date: "2024-07-20", car: 9, motorbike: 22, income: 420000 },
];

export const pieData = [
  { name: "Car", value: 60 },
  { name: "Motorbike", value: 40 },
];

export const COLORS = ["#10B981", "#3B82F6"];

export const mockLots = [
  { id: "lot1", name: "Lot A", total: 20, booked: 12, occupied: 6 },
  { id: "lot2", name: "Lot B", total: 15, booked: 7, occupied: 3 },
];

export const mockMapData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: i % 5 === 0 ? "occupied" : i % 3 === 0 ? "booked" : "free",
}));