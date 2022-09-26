import React, { useEffect, useState } from "react";
import { Link} from 'react-router-dom';
import {FiArrowRight, FiPlus} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css';
import Maps from '../images/map-marker.svg';  
import '../styles/pages/orphanages-maps.css';
import api from "../services/api";

const mapIcon = Leaflet.icon({
    iconUrl: Maps,
    iconSize:[58, 68],
    iconAnchor:[29,68],
    popupAnchor:[170, 2]

})

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
      const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
     api.get('orphanages').then(response =>{
         setOrphanages(response.data);
     })
    }, [])
    return(
    <div id="page-map">
        <aside>
            <header>
                <img src={Maps} alt="Happy" />
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>Santo André</strong>
                <span>São Paulo</span>
            </footer>
        </aside>
          
          <MapContainer 
           center={[-23.6265595,-46.5072322]}
           zoom={15}
           style={{ width:'100%', height:'100%'}}
          >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {orphanages.map(orphanage =>{ 
                return(
            <Marker
                icon={mapIcon}
                position={[orphanage.latitude,orphanage.longitude]}
                key={orphanage.id}
            >
             <Popup closeButton= {false} minWidth={240} maxWidth={240} className="map-popup">
                 {orphanage.name}
                 <Link to={`/orphanages/${orphanage.id}`}>
                     <FiArrowRight size={20} color= "#FFF" />
                 </Link>
             </Popup>
             </Marker>
              )
            })}
          </MapContainer>
          
         <Link to="/orphanage/create" className="create-orphanage">
          <FiPlus size={32}  color="#FFF"/>
         </Link>
     </div>
    );
}


export default OrphanagesMap;
 