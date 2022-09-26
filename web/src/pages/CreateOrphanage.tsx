import React, { ChangeEvent, FormEvent, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Sidebar from "../componentes/Sidebar";
import Markers from '../componentes/Markers';
import '../styles/pages/create-orphanage.css';

interface Position {
  latitude: number,
  longitude: number
}

export default function CreateOrphanage() {
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0
  });

  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [opening_hours, setOpening_hours] = useState<string>('');
  const [open_on_weekends, setOpen_on_weekends] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [preViewImages, setPreViewImages] = useState<string[]>([]);

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreView = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreViewImages(selectedImagesPreView);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);
    alert('cadastro realizado com sucesso!');
    navigate('/app');    
  }

  console.log(position);
  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-23.6265595,-46.5072322]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Markers
                position={position}
                setPosition={setPosition}
              />

            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}

              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                value={about}
                onChange={event => setAbout(event.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {preViewImages.map(image => (
                  <img key={image} src={image} alt={name} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleSelectImages}
                  id="image[]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">
                Horário de funcionamento
              </label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpening_hours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpen_on_weekends(true)}
                >
                    Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

