// @ts-nocheck
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { height, width } from "@mui/system";

import { Alert } from '../types/Alert';
import { Alerts } from "alerts/index.tsx";
import React from 'react';
import ReactDOM from 'react-dom';

// import { usePapaParse } from 'react-papaparse';

// /*
// function heatMap(){
  /*
  var map = L.map('map', {
    zoomControl: false, // Add zoom control separately below
    center: [43.679882,-79.544266],
    zoom: 10, // Initial zoom level
    attributionControl: true, // Instead of default attribution, we add custom at the bottom of script
    scrollWheelZoom: false,
    // max: 1,
    // gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
  })
*/
/*
  $.get('./house_sales_ontario.csv', function(csvString) {
    var data = Papa.parse(csvString.trim()).data.map((a) => {
      return [ parseFloat(a[4]), parseFloat(a[5]), parseFloat(a[3])/325000 ];
    });
    var heat = L.heatLayer(data, {
      radius: 25
    })

    // Add the heatlayer to the map
    heat.addTo(map)
    })
}
*/
// */
/*
export default function ReadString() {
  const { readString } = usePapaParse();
  console.log("reads")

  const handleReadString = () => {
    const csvString = '1-1,1-2,1-3,1-4';

    readString(csvString, {
      worker: true,
      complete: (results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      },
    });
  };

  return <button onClick={() => handleReadString()}>readString</button>;
}
*/
// /*
const Map = () => {
    
  const [isMounted, setIsMounted] = React.useState(false);
  const [alerts, setAlerts] = useState<any>([]);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (  isMounted ? (
    <div className="container w-full h-full" style={{height:'90vh', width:'90vw'}}>
        <MapContainer
      center={[10.0284, 76.3285]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  />
      <Marker position={[10.0431, 76.3243]} draggable={true}>
        <Popup>Fire Anomaly
        {/* <div className="card" >
          
          {alerts.map((alert: { id: any; anomaly_id: any; responder_id: any; }) => (
                  
              ))}
        
        </div> */}
        </Popup>
      </Marker>
      <Marker position={[10.0265, 76.3086]} draggable={true}>
        <Popup>Road Accident</Popup>
      </Marker>
    </MapContainer>
    {/* <button onClick={() => ReadString()}>Read S</button> */}
    </div>
  ):null
  );
};

export default Map;
