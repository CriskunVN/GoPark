"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ORS_API_KEY = "5b3ce3597851110001cf6248734e7f3fab24462da8e875f0362cc66d";

export default function Home() {
  const [map, setMap] = useState<any>(null);
  const [routeLayer, setRouteLayer] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [routeInfo, setRouteInfo] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const mapInstance = L.map("map").setView([51.5074, -0.1278], 13); // London coordinates
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStart(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          if (map) {
            map.setView([latitude, longitude], 15);
            const carIcon = L.icon({
              iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            });
            L.marker([latitude, longitude], { icon: carIcon })
              .addTo(map)
              .bindPopup("Vị trí hiện tại")
              .openPopup();
          }
        },
        (error) => {
          alert("Không thể lấy vị trí hiện tại. Vui lòng bật GPS hoặc nhập thủ công.");
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const geocodeNominatim = async (place: string) => {
    if (place.match(/^-?\d+\.\d+,\s*-?\d+\.\d+$/)) {
      const [lat, lon] = place.split(",").map(Number);
      if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) return [lon, lat];
      return null;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const lon = parseFloat(data[0].lon);
        const lat = parseFloat(data[0].lat);
        if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) return [lon, lat];
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const getRoute = async () => {
    if (!start || !end) {
      alert("Vui lòng nhập đầy đủ điểm bắt đầu và điểm đến!");
      setRouteInfo("");
      return;
    }

    const startCoord = await geocodeNominatim(start);
    const endCoord = await geocodeNominatim(end);

    if (!startCoord || !endCoord) {
      alert("Không tìm thấy địa điểm! Vui lòng kiểm tra lại.");
      setRouteInfo("");
      return;
    }

    if (routeLayer) map.removeLayer(routeLayer);
    markers.forEach((m) => map.removeLayer(m));
    setMarkers([]);

    try {
      const res = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          method: "POST",
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coordinates: [startCoord, endCoord] }),
        }
      );

      if (!res.ok) throw new Error("Không tìm thấy tuyến đường!");
      const data = await res.json();

      const newRouteLayer = L.geoJSON(data, {
        style: { color: "#007bff", weight: 5 },
      }).addTo(map);
      setRouteLayer(newRouteLayer);

      const newMarkers = [
        L.marker([startCoord[1], startCoord[0]])
          .addTo(map)
          .bindPopup("Bắt đầu")
          .openPopup(),
        L.marker([endCoord[1], endCoord[0]])
          .addTo(map)
          .bindPopup("Kết thúc"),
      ];
      setMarkers(newMarkers);
      map.fitBounds(newRouteLayer.getBounds());

      const properties = data.features[0].properties;
      const distance = (properties.segments[0].distance / 1000).toFixed(2);
      const duration = Math.round(properties.segments[0].duration / 60);
      setRouteInfo(`Khoảng cách: ${distance} km | Thời gian: ${duration} phút`);
    } catch (error) {
      alert((error as Error).message);
      setRouteInfo("");
      console.error("Routing error:", error);
    }
  };

  // Sample parking data with images
  const parkingSpots = [
    {
      name: "Ton Dan Parkinglots",
      price: "30000 VND",
      time: "6 min",
      spots: 2,
      image: "/park1.jpg",
    },
    {
      name: "Hoa Xuan Parkinglots",
      price: "30000 VND",
      time: "9 min",
      spots: 247,
      image: "/park3.jpg",
    },
    {
      name: "Hoa Khanh Parkinglots",
      price: "30000 VND",
      time: "10 min",
      spots: 33,
      image: "/park4.jpg",
    },
    {
      name: "Cam Le Parkinglots",
      price: "30000 VND",
      time: "15 min",
      spots: 150,
      image: "/park5.jpg",
    },
    {
      name: "Hai Chau Parkinglots",
      price: "30000 VND",
      time: "20 min",
      spots: 80,
      image: "/park6.jpg",
    },
  ];

  return (
    <div className="relative w-full h-screen bg-gray-100 font-sans">
      <button
        id="searchToggle"
        className="fixed top-4 left-4 z-[1001] bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors shadow-md"
        onClick={() => {
          const sidebar = document.getElementById("sidebar");
          const mapElement = document.getElementById("map");
          sidebar?.classList.toggle("-left-full");
          sidebar?.classList.toggle("left-0");
          mapElement?.classList.toggle("ml-80");
          mapElement?.classList.toggle("ml-0");
        }}
      >
        🔍
      </button>
      <div
        id="sidebar"
        className="fixed top-0 -left-full w-80 h-full z-[1000] bg-white bg-opacity-80 backdrop-blur-sm p-4 border-r border-gray-200 transition-all duration-300 ease-in-out shadow-md"
      >
        <div className="sticky top-0 bg-white bg-opacity-80 z-10 pb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tìm đường</h2>
          <input
            id="start"
            type="text"
            placeholder="Điểm bắt đầu (hoặc vị trí hiện tại)"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80"
          />
          <button
            onClick={useCurrentLocation}
            className="w-full mb-2 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Dùng vị trí hiện tại
          </button>
          <input
            id="end"
            type="text"
            placeholder="Điểm đến (vd: Vincom Đồng Khởi, Q1)"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80"
          />
          <button
            onClick={getRoute}
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Chỉ đường
          </button>
          <div id="routeInfo" className="mt-4 text-sm">
            {routeInfo}
          </div>
        </div>
        <div className="mt-4 overflow-y-auto h-[calc(100%-200px)] custom-scrollbar">
          <h3 className="text-md font-semibold text-gray-800 mb-2">The Parking spots</h3>
          {parkingSpots.map((spot, index) => (
            <div
              key={index}
              className="mb-2 p-2 bg-yellow-100 rounded-md shadow-sm flex items-center"
            >
              <img
                src={spot.image}
                alt={spot.name}
                className="w-16 h-full  me-2 object-cover"
              />
              <div className="flex-1">  
                <div className="font-semibold text-blue-950">{spot.name}</div>
                <div className="text-sm text-red-700">{spot.price}</div>
                <div className="text-xs text-gray-500">
                  {spot.time} 
                  <div className="text-sm">{spot.spots} spots</div>
                </div>
              </div>
              <button className="bg-green-800 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors ml-2">
                Reserve
              </button>
            </div>
          ))}
        </div>
      </div>
      <div id="map" className="w-full h-screen ml-0 transition-all duration-300 ease-in-out" />
      <style jsx>{`
        #searchToggle {
          z-index: 1001;
        }
        #sidebar {
          z-index: 1000;
        }
        #map {
          z-index: 1;
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
}