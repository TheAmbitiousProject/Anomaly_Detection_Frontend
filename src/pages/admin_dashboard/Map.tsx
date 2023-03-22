import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { height, width } from "@mui/system";
import { usePapaParse } from 'react-papaparse';

// /*
function heatMap(){
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
    
  return (
    <div className="container w-full h-full" style={{height:'78vh', width:'70vw'}}>
        <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  />
      <Marker position={[40.8054, -74.0241]} draggable={true}>
        <Popup>Hey!!</Popup>
      </Marker>
    </MapContainer>
    {/* <button onClick={() => ReadString()}>Read S</button> */}
    </div>
    
  );
};

export default Map;
// */