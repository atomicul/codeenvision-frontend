import { useEffect, useRef, useState } from 'react';
import './app.scss';
import Panel, { Handle as PanelHandle } from './components/Panel';
import { Sensor } from './interfaces';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cookies from 'js-cookie';

function App() {
  const [sensors, setSensors] = useState<Sensor[] | null>(null);
  const panelRef = useRef<PanelHandle>()

  useEffect(() => {
    const token = Cookies.get('token');
    fetch("https://localhost:3000/sensors", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then((response) => {
      return response.json()
    }).then((data) => { setSensors(data) })
  }, []);

  return (
    <div className="app">
      <section>
        <Map
          mapboxAccessToken="pk.eyJ1IjoicGlqb24iLCJhIjoiY2xva2ZkdXhpMjE0dzJpcXBjODNiNm10aCJ9._cnBHqPWPa8ZgpEaqgn8_Q"
          initialViewState={{
            latitude: 44.933334,
            longitude: 26.033333,
            zoom: 12
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {!!sensors && sensors.map(({ latitude, longitude }, idx) => {
            return <Marker latitude={latitude} longitude={longitude}
              onClick={() => { if (panelRef.current) panelRef.current.setIdx(idx) }}
            />
          })}
        </Map>
      </section>
      <Panel sensors={sensors} ref={panelRef} />
    </div>
  )
}

export default App
