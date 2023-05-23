// import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { height, width } from "@mui/system";

// import { Alert } from '../types/Alert';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Select } from "@mui/material";

// //const [alerts, setAlerts] = useState<any>([]);

// const AlertCard = ({alert, deleteAlert,setSelectedResponder, addAssignment, options , responders}:{alert:any, deleteAlert:any,setSelectedResponder:any, addAssignment:any, options:any , responders:any}) =>{

//     console.log(options)
//     return (
//         <div
//         key={alert?.id}
//         className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
//     >
      
//         <h3 className="text-lg text-black font-semibold my-2">Alert ID: {alert.id}</h3>
//         {/* <p className="text-black">anomaly class: {alert.anomaly}</p> */}
//         <p className="text-black">anomaly ID: {alert.anomaly_id}</p>
//         {(alert.responder_id != null) && 
//           <>
          
//             {/* <p className="text-black">responder: {fetchResponder(alert)
//             .then(username => <span>{username}, </span>)}</p> */}
//             <p className="text-black">responder ID: {alert.responder_id}</p>
//           </>
//         }
//         {(alert.responder_id == null) && 
//         <div className="m-2 flex flex-col justify-around">

//             <Select
//               id="Responder-select"
//               options={options}
//               onChange={(option) => {
//                 const responder = responders.find((responder: { id: string | undefined; }) => responder.id === option?.value) ?? undefined;
//                 setSelectedResponder(responder?.id);
//               }}
//               placeholder='Select a Responder: '
//               className='text-black'
//             />
//         </div>}
//         <div className="flex m-2 w-4/5 justify-around">
//         <button onClick={() => deleteAlert(alert.id)}>Delete</button>
//         {(alert.responder_id == null) && <button onClick={() => addAssignment(selectedResponder, alert.id, id)}>Assign Responder</button>}
//         </div>
        
//     </div>
//     )
// }

// export default AlertCard

