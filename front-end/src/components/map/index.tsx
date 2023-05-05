import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapviewProps {
  lat: number;
  log: number;
  markerLabel: string;
}

function Mapview({ lat, log, markerLabel }: MapviewProps) {
  return (
    <MapContainer
      center={[lat, log]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '210px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, log]}>
        <Popup>{`${markerLabel} Station`}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Mapview;
