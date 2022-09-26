import { Marker, useMapEvents } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';

interface Position {
  latitude: number,
  longitude: number
}

interface Props {
  position: Position;
  setPosition: (a: any) => void;
}

export default function Markers({ position, setPosition }: Props) {
    const map = useMapEvents({
        click(e) {
            map.locate();
            const { lat, lng } = e.latlng;
        
            setPosition({ latitude: lat, longitude: lng });
            map.flyTo(e.latlng, map.getZoom());
        },
    });

  return (
    <Marker
      interactive={false}
      icon={mapIcon}
      position={[position.latitude, position.longitude]}
      eventHandlers={{
        click: (e) => console.log(e),
      }}
    />
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

