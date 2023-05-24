// @ts-nocheck
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import { supabase } from "../../utils/supabaseClient";
import AlertCard from "./AlertCard";

const Map = () => {
  const [alerts, setAlerts] = useState([]);
  const [responders, setResponders] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const { data, error } = await supabase.from("alerts").select("*");
        if (error) throw error;
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };
    const fetchResponders = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) throw error;
        setResponders(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchMarkers();
    fetchResponders();
  }, []);

  async function deleteAlert(id: string) {
    const { error } = await supabase.from("alerts").delete().match({ id });
    if (error) console.log("error", error);
    else {
      const updatedalerts = alerts.filter(
        (alert: { id: string }) => alert.id !== id
      );
      setAlerts(updatedalerts);
    }
  }

  return (
    <div
      className='container w-full h-full'
      style={{ height: "90vh", width: "90vw" }}
    >
      <MapContainer
        center={[10.0284, 76.3285]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {alerts.map((alert, index) => (
          <Marker key={alert.id} position={[alert.latitude, alert.longitude]}>
            <Popup>
              <div>
                <h3>Alert ID: {alert.id}</h3>
                <p>Anomaly ID: {alert.anomaly_id}</p>
                <AlertCard
                  key={index}
                  responders={responders}
                  alert={alert}
                  deleteAlert={deleteAlert}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
