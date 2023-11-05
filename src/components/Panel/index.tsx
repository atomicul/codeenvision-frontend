import { MenuItem, Select } from "@mui/material";
import { useEffect, useImperativeHandle, useState, forwardRef, ReactNode } from "react";
import './style.scss';
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Sensor, Reading } from "../../interfaces";
import Cookies from 'js-cookie';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  sensors: Sensor[] | null;
}

export interface Handle {
  setIdx: (a: number) => void;
}

export default forwardRef(({ sensors }: Props, ref) => {
  const [sensorIdx, setSensorIdx] = useState<number | null>(null);
  const [plotInfo, setPlotInfo] = useState<Reading[] | null>(null);

  useImperativeHandle(ref, () => {
    return {
      setIdx(num: number) {
        setSensorIdx(num);
      },
    };
  }, []);

  useEffect(() => {
    if (sensorIdx == null || !sensors) return;
    const sensor = sensors[sensorIdx];
    const token = Cookies.get('token');
    fetch("https://localhost:3000/readings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ id: sensor.id })
    }).then((response) => {
      return response.json();
    }).then((data) => { setPlotInfo(data), console.log(data) })
  }, [sensorIdx]);

  return <section className="panel">
    <h1>Air Moniotor</h1>
    {!sensors ? <h2>loading</h2> :
      <Select fullWidth value={sensorIdx} onChange={(e) => { setSensorIdx(e.target.value as number) }}>
        {!!sensors && sensors.map((sensor, idx) => <MenuItem value={idx}>{sensor.friendlyName}</MenuItem>)}
      </Select>
    }
    {plotInfo &&
      <>
        {
          [{ data: plotInfo.map((reading) => reading.temperature), label: 'Temperature (C)', color: 'red' },
          { data: plotInfo.map((reading) => reading.humidity), label: 'Humidity (%)', color: 'blue' },
          { data: plotInfo.map((reading) => reading.ppm), label: 'Particles per million', color: 'yellow' },
          { data: plotInfo.map((reading) => reading.dustConcentration), label: 'Dust Concentration', color: 'green' }]
            .map(({ label, data, color }, idx) => {
              return <div>
                <Line
                  datasetIdKey={idx.toString()}
                  data={{
                    labels: plotInfo.map((reading) => new Date(reading.day).toDateString()),
                    datasets: [
                      {
                        label: label,
                        data: data,
                        borderColor: color
                      }
                    ],
                  }}
                />
              </div>
            })
        }
      </>
    }
  </section >

})
