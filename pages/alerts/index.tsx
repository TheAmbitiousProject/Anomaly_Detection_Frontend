import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";

import { Alert } from '../types/Alert';
import { Assignment } from '../types/Assignment';
import Create from "./create";
import Navbar from "../components/Navbar";
import { Responder } from '../types/Responder';
import Select from 'react-select';
// import Update from "./update";
import { supabase } from "../../utils/supabaseClient";
import { timer_duration } from "@/constants";

export default function Alerts(){
  //const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alerts, setAlerts] = useState<any>([]);
  const [assignments, setAssignments] = useState< Assignment[]>([]);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  //const [responders, setResponders] = useState<Responder[]>([]);
  const [responders, setResponders] = useState<any>([]);
  const [selectedResponder, setSelectedResponder] = useState<String|undefined|null>('');
  const [initialRunState, setinitialRunState] = useState()
 
  useEffect(() => {

    console.log('alerts in useEffect: ', alerts);
    // mapAlerts() //commented due to errors
   
    
    const fetchAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from("alerts")
          .select("*");

        if (error) throw error;

        setAlerts(data);
        // alerts.id = data.id
        console.log('data: ', data)
        // data.map(alert)
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    };

    const fetchResponders = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select("*");

        if (error) throw error;

        setResponders(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchAlerts()
    fetchResponders();
    const timer = setInterval( ()=>{
      console.log(`this runs every ${timer_duration} sec`)
      fetchAlerts()
      fetchResponders();
    },timer_duration)

    

    return ()=>{
      clearInterval(timer)
    }
  // }, []);
},[]); //commented to prevent multiple re-rendering aka autoupdate of page with new info from db

/*
//finds the responder and anomaly names for each alert
async function mapAlerts(){
  alerts.map(async (alert) => {
    // fetchResponder(alert.responder_id).then(val => alert.responder=val)
    fetchResponder(alert)
    fetchAnomaly(alert.anomaly_id).then(val => alert.anomaly=val);
  })
}
async function fetchResponder(alert) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq('id', alert.responder_id);
  if (error){
    console.log(`fetchResponder error with alert_id = ${alert.id}`, error);
    alert.responder = undefined
    return undefined
  }
  else {
    alert.responder = profile[0].username;
    console.log(alert.responder)
    return profile[0].username
  }
}

async function fetchAnomaly(anomalyId: string) {
  const { data: anomaly, error } = await supabase
    .from("anomalies")
    .select()
    .eq('id', anomalyId);
  if (error) console.log(`fetchAnomaly error with ${anomalyId}`, error);
  else {
    // console.log('anomalies: ', anomaly);
    return anomaly[0].class
  }
}
*/

  async function deleteAlert(id: string) {
    const { error } = await supabase.from('alerts').delete().match({ id });
    if (error) console.log('error', error);
    else {
      const updatedalerts = alerts.filter((alert: { id: string; }) => alert.id !== id);
      setAlerts(updatedalerts);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <h1 className="text-center text-red-500">{error}</h1>
      </>
    );
  }

  const options: { value: string; label: string }[] = responders.map((responder: { id: any , full_name: any}) => ({
    value: responder.id,
    label: responder?.full_name || 'no name',
  }));

  async function sentAssignment(alertId: string){
    const { data, error } = await supabase
    .from('assignments')
    .select("*").eq('alert_id', alertId);
      if (error) return true;
      // setAssignments(data);
  
     return false
  }

  async function addAssignment(responder: any, alertId: string, id: string) {

    if(await sentAssignment(alertId)){
      alert('An unaccepted/undenied request has been already sent for this Alert!!')
      setId('');
      return null
    }
    
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        alert_id: alertId,
        responder_id: responder,
      })
      .single();
    if (error) console.log('error', error);
    else{
      setId('');
    setSelectedResponder(null);
    console.log('assignment insert success')
        alert('assignment insert success')
  }
  }


  return (
    <div className="h-screen w-screeen flex justify-center">
      <div className="basis-1/5">
          <Navbar/>
      </div>
      <div className="basis-4/5 p-10">
        {!create && 
              <button className="topbar h-15 m-5" onClick={() => {
                console.log('to create')
                  setCreate(true)
              }}>Add Alert</button>
        }
        {create && <Create/>}
        {!create &&
          <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {console.log('alerts in return: ', alerts)} */}
          {/* code to be added here */}
          {alerts.map((alert: { id: any; anomaly_id: any; responder_id: any; }) => (
        <div
          key={alert.id}
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer card"
        >
          <div className="flex justify-between">
            <h3 className="text-lg text-black font-semibold my-2">Alert ID: {alert.id}</h3>
            {/* Add your small image here */}
            <img src="path/to/image.jpg" alt="Small Image" className="w-12 h-12" />
          </div>
          <p className="text-black">Anomaly ID: {alert.anomaly_id}</p>
          {(alert.responder_id != null) && (
            <>
              <p className="text-black">Responder ID: {alert.responder_id}</p>
            </>
          )}
          {(alert.responder_id == null) && (
            <div className="m-2 flex flex-col justify-around">
              <Select
                id="Responder-select"
                options={options}
                onChange={(option) => {
                  const responder = responders.find((responder: { id: string | undefined; }) => responder.id === option?.value) ?? undefined;
                  setSelectedResponder(responder?.id);
                }}
                placeholder='Select a Responder: '
                className='text-black'
              />
            </div>
          )}
          <div className="flex m-2 w-4/5 justify-around">
            <button onClick={() => deleteAlert(alert.id)}>Delete</button>
            {(alert.responder_id == null) && <button onClick={() => addAssignment(selectedResponder, alert.id, id)}>Assign Responder</button>}
          </div>
        </div>
      ))}
          </div>
          </div>
        }
      </div>
    </div>
  );
};

// */