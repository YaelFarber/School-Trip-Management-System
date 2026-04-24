import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function formatDateTime(value) {
  return new Date(value).toLocaleString("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function decimalToDMS(decimal) {
  const abs = Math.abs(Number(decimal));
  const degrees = Math.floor(abs);
  const minutesFloat = (abs - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = ((minutesFloat - minutes) * 60).toFixed(2);

  return `${degrees}° ${minutes}' ${seconds}"`;
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
        zoom={15}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
        }}
      >
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
            icon={markerIcon}
          >
            <Popup>
              <div style={{ minWidth: "180px", lineHeight: "1.6" }}>
                <strong>{student.student_name}</strong>
                <br />
                Class: {student.class_name}
                <br />
                Updated: {formatDateTime(student.at_time)}
                <hr />
                Latitude: {decimalToDMS(student.latitude)}
                <br />
                Longitude: {decimalToDMS(student.longitude)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}