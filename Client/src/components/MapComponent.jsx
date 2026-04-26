import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// blue
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// red
const farMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// auto zoom to see all markers
function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const bounds = locations.map((s) => [
      Number(s.latitude),
      Number(s.longitude),
    ]);

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, locations]);

  return null;
}

export default function MapComponent({ locations }) {
  if (!locations || locations.length === 0) {
    return <p>No locations to display on the map.</p>;
  }

  const center = [
    Number(locations[0].latitude),
    Number(locations[0].longitude),
  ];

  return (
    <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <FitBounds locations={locations} />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((student) => (
          <Marker
            key={student.student_id}
            position={[
              Number(student.latitude),
              Number(student.longitude),
            ]}
            icon={student.is_far ? farMarkerIcon : markerIcon}
          >
            <Popup>
              <div style={{ minWidth: "180px", lineHeight: "1.6" }}>
                <strong>{student.student_name}</strong>
                <br />
                Class: {student.class_name}
                <br />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}