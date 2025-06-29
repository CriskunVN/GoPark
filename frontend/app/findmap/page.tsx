"use client"; // Đánh dấu component này chạy ở client-side

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ArrowRightCircleIcon,
  EyeIcon,
  ArrowLeftIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

// Hook thay đổi view của bản đồ
const ChangeMapView = ({
  coords,
  shouldUpdate,
}: {
  coords: [number, number];
  shouldUpdate: boolean;
}) => {
  const map = useMap();
  useEffect(() => {
    if (shouldUpdate && coords) {
      map.setView(coords, 14); // Zoom 14 nhìn rõ hơn
    }
  }, [coords, shouldUpdate, map]);
  return null;
};

// Kiểu dữ liệu Parking
interface Parking {
  name: string;
  coords: [number, number];
  slots: number;
  address: string;
  price: number;
  image: string;
  status: "Hoạt động" | "Đang bảo trì" | "Đã đầy";
  city: "Đà Nẵng" | "Hồ Chí Minh";
}

// Data mẫu
const parkings: Parking[] = [
  // Đà Nẵng
  {
    name: "Bãi đỗ xe GWOUTH",
    coords: [15.853837, 108.201831],
    slots: 50,
    address: "123 Đường Nguyễn Tất Thành, Đà Nẵng",
    price: 15000,
    image: "/park1.jpg",
    status: "Hoạt động",
    city: "Đà Nẵng",
  },
  {
    name: "Bãi đỗ xe Sân bay Đà Nẵng",
    coords: [16.0524, 108.2022],
    slots: 120,
    address: "Sân bay Quốc tế Đà Nẵng",
    price: 20000,
    image: "/park2.jpg",
    status: "Đã đầy",
    city: "Đà Nẵng",
  },
  {
    name: "Bãi đỗ xe Trần Phú",
    coords: [16.0641, 108.2172],
    slots: 80,
    address: "45 Trần Phú, Hải Châu, Đà Nẵng",
    price: 12000,
    image: "/park3.jpg",
    status: "Hoạt động",
    city: "Đà Nẵng",
  },
  {
    name: "Bãi đỗ xe Chợ Hàn",
    coords: [16.0697, 108.2228],
    slots: 60,
    address: "Chợ Hàn, Hải Châu, Đà Nẵng",
    price: 10000,
    image: "/park4.jpg",
    status: "Đang bảo trì",
    city: "Đà Nẵng",
  },
  {
    name: "Bãi đỗ xe Nguyễn Văn Linh",
    coords: [16.0549, 108.2137],
    slots: 70,
    address: "Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    price: 14000,
    image: "/park5.jpg",
    status: "Hoạt động",
    city: "Đà Nẵng",
  },
  // Hồ Chí Minh
  {
    name: "Bãi đỗ xe Tân Sơn Nhất",
    coords: [10.8190, 106.6518],
    slots: 200,
    address: "Sân bay Tân Sơn Nhất, TP. Hồ Chí Minh",
    price: 25000,
    image: "/park6.jpg",
    status: "Hoạt động",
    city: "Hồ Chí Minh",
  },
  {
    name: "Bãi đỗ xe Bến Thành",
    coords: [10.7769, 106.7009],
    slots: 90,
    address: "Chợ Bến Thành, Quận 1, TP. Hồ Chí Minh",
    price: 18000,
    image: "/park5.jpg",
    status: "Đã đầy",
    city: "Hồ Chí Minh",
  },
  {
    name: "Bãi đỗ xe Nguyễn Huệ",
    coords: [10.7762, 106.7033],
    slots: 100,
    address: "Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    price: 20000,
    image: "/park5.jpg",
    status: "Hoạt động",
    city: "Hồ Chí Minh",
  },
  {
    name: "Bãi đỗ xe quận 7",
    coords: [10.7370, 106.7152],
    slots: 70,
    address: "Khu đô thị Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh",
    price: 15000,
    image: "/park6.jpg",
    status: "Đang bảo trì",
    city: "Hồ Chí Minh",
  },
  {
    name: "Bãi đỗ xe Bình Thạnh",
    coords: [10.8142, 106.7116],
    slots: 85,
    address: "Đường Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh",
    price: 17000,
    image: "/park1.jpg",
    status: "Hoạt động",
    city: "Hồ Chí Minh",
  },
];

// Icon Leaflet mặc định
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Home() {
  const [parkingList, setParkingList] = useState<Parking[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [shouldUpdateMap, setShouldUpdateMap] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(400); // Độ rộng ban đầu là 400px
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Hàm tìm thành phố
  const searchCity = (city: string) => {
    let cityCenter: [number, number] | null = null;

    if (city === "Đà Nẵng") {
      cityCenter = [16.0544, 108.2022]; // Tọa độ trung tâm Đà Nẵng
      setParkingList(parkings.filter((p) => p.city === "Đà Nẵng"));
    } else if (city === "Hồ Chí Minh") {
      cityCenter = [10.7769, 106.7009]; // Tọa độ trung tâm Hồ Chí Minh (gần Bến Thành)
      setParkingList(parkings.filter((p) => p.city === "Hồ Chí Minh"));
    }

    if (cityCenter) {
      setUserCoords(cityCenter); // Cập nhật tọa độ trung tâm
      setShouldUpdateMap(true);
      setTimeout(() => setShouldUpdateMap(false), 100); // Đảm bảo bản đồ cập nhật
    }
    setSelectedCity(city);
  };

  // Hàm tìm bãi đỗ gần vị trí hiện tại
  const findNearbyParkings = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords([latitude, longitude]);

        const nearby = parkings.filter((p) => {
          const dist = getDistance(latitude, longitude, p.coords[0], p.coords[1]);
          return dist <= 3;
        });

        if (nearby.length === 0) {
          alert("Không tìm thấy bãi đỗ nào trong bán kính 3km.");
          return;
        }

        setParkingList(nearby);
        setShouldUpdateMap(true);
        setTimeout(() => setShouldUpdateMap(false), 100);
      },
      () => {
        alert("Không thể lấy vị trí! Vui lòng bật GPS.");
      },
      { enableHighAccuracy: true }
    );
  };

  // Điều hướng đến Google Maps
  const navigateToParking = (lat: number, lon: number) => {
    if (!userCoords) {
      alert("Vui lòng định vị vị trí trước.");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userCoords[0]},${userCoords[1]}&destination=${lat},${lon}`;
    window.open(url, "_blank");
  };

  // Xem vị trí cụ thể
  const viewParkingLocation = (parking: Parking) => {
    setUserCoords(parking.coords); // Focus vào bãi đỗ cụ thể
    setParkingList([parking]);
    setShouldUpdateMap(true);
    setTimeout(() => setShouldUpdateMap(false), 100);
  };

  // Điều hướng đến trang booking
  const navigateToBooking = (parkingName: string) => {
    window.location.href = `/booking?name=${encodeURIComponent(parkingName)}`;
  };

  // Tính khoảng cách
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  // Kéo giãn sidebar (chỉ cho phép kéo rộng, không nhỏ hơn 400px)
  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = sidebarRef.current?.offsetWidth || 400;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.pageX - startX);
      if (newWidth >= 400) { // Giới hạn không nhỏ hơn 400px
        setSidebarWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarWidth(isSidebarOpen ? 0 : 400); // Khi mở lại, đặt lại độ rộng ban đầu là 400px
  };

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-50 bg-white bg-opacity-90 backdrop-blur-sm border-r border-gray-200 shadow-md overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "" : "w-0 p-0 overflow-hidden"
        }`}
        style={{ width: `${sidebarWidth}px` }}
      >
        {isSidebarOpen && (
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <Button onClick={() => window.location.href = "/"} variant="ghost">
                <ArrowLeftIcon className="h-5 w-5 mr-2" /> Trang chủ
              </Button>
              <Button onClick={toggleSidebar} variant="ghost">
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tìm bãi đỗ xe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <select
                  value={selectedCity}
                  onChange={(e) => searchCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Chọn thành phố</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                </select>
                <Button
                  onClick={() => searchCity(selectedCity)}
                  disabled={!selectedCity}
                  className="w-full bg-gray-600 text-white"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" /> Tìm kiếm
                </Button>
                <Button
                  onClick={findNearbyParkings}
                  className="w-full bg-green-900 text-white"
                >
                  <MapPinIcon className="h-5 w-5 mr-2" /> Gần bạn
                </Button>

                {parkingList.map((p) => (
                  <Card key={p.name} className="p-2 border rounded-md shadow-sm">
                    <CardContent>
                      <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded mb-2" />
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm">{p.address}</p>
                      <p className="text-sm">
                        Trạng thái:{" "}
                        <span
                          className={
                            p.status === "Hoạt động"
                              ? "text-green-600"
                              : p.status === "Đang bảo trì"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                        >
                          {p.status}
                        </span>
                      </p>
                      <p className="text-sm">Giá: {p.price.toLocaleString()} VNĐ/giờ</p>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          onClick={() => navigateToParking(p.coords[0], p.coords[1])}
                          disabled={p.status !== "Hoạt động"}
                          className="flex-1 bg-green-600 text-white"
                        >
                          <ArrowRightCircleIcon className="h-5 w-5 mr-1" /> Điều hướng
                        </Button>
                        <Button
                          onClick={() => viewParkingLocation(p)}
                          className="flex-1 border w-12 border-gray-300"
                        >
                          <EyeIcon className="h-5 w-5 mr-1" /> 
                          Vị trí
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {isSidebarOpen && (
          <div
            className="absolute right-0 top-0 bottom-0 w-2 bg-gray-300 cursor-col-resize"
            onMouseDown={startDragging}
          />
        )}
      </div>

      {!isSidebarOpen && (
        <div className="fixed top-4 left-14 z-[1000]">
          <Button onClick={toggleSidebar} className="bg-white ">
            <Bars3Icon className="h-6 w-6 text-black" />
          </Button>
        </div>
      )}

      {/* Bản đồ */}
      <div
        id="map"
        className="w-full h-screen transition-all"
        style={{ marginLeft: isSidebarOpen ? `${sidebarWidth}px` : "0" }}
      >
        <MapContainer
          center={userCoords || [16.0544, 108.2022]} // Sử dụng userCoords nếu có, nếu không dùng mặc định Đà Nẵng
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          preferCanvas
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Gwouth GO Parking"
          />

          {userCoords && <ChangeMapView coords={userCoords} shouldUpdate={shouldUpdateMap} />}

          {parkingList.map((p, i) => (
            <Marker key={i} position={p.coords} icon={defaultIcon}>
              <Popup>
                <div className="text-sm">
                  <img src={p.image} alt={p.name} className="w-full mb-2 rounded-md" />
                  <strong>{p.name}</strong><br />
                  {p.address}<br />
                  {p.price.toLocaleString()} VNĐ/giờ
                  <div className="mt-2">
                    <Button
                      onClick={() => navigateToBooking(p.name)}
                      className="w-full bg-blue-500 text-white mt-2"
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {userCoords && (
            <Marker position={userCoords} icon={defaultIcon}>
              <Popup>Vị trí của bạn</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
}