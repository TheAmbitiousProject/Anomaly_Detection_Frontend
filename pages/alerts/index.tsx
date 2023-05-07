import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navbar from "../components/Navbar";
import { Alert } from '../types/Alert';
import Create from "./create";
import Update from "./update";
import ResponderAssignForm from "../assignments";
import Select from 'react-select';
import { Responder } from '../types/Responder';

export default function Alerts(){
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [responders, setResponders] = useState<Responder[]>([]);
  const [selectedResponder, setSelectedResponder] = useState<String|undefined|null>('');
 
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from<Alert>("alerts")
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
          .from<Responder>('profiles')
          .select("*");

        if (error) throw error;

        setResponders(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchAlerts()
    fetchResponders();
    // mapAlerts() //commented due to errors
    console.log('alerts in useEffect: ', alerts);
  }, []);
// },[alerts]); //commented to prevent multiple re-rendering aka autoupdate of page with new info from db

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
      const updatedalerts = alerts.filter((alert) => alert.id !== id);
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

  const options: { value: string; label: string }[] = responders.map((responder) => ({
    value: responder.id,
    label: responder.id,
  }));

  async function addAssignment(responder: any, alertId: string, id: string) {
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        id: id,
        alert_id: alertId,
        responder_id: responder,
      })
      .single();
    if (error) console.log('error', error);
    else{
      setId('');
    setSelectedResponder(null);
    console.log('assignment insert success')
  }
  }


  return (
    <div className="h-screen w-screeen flex justify-center">
        <div className="basis-1/5">
            <Navbar/>
        </div>
        <div className="basis-4/5 p-10">
            <div className="topbar h-15 m-5">
                 <button onClick={() => {
                  console.log('to create')
                    setCreate(true)
                }}>Add alert</button>
                {create && <Create/>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {console.log('alerts in return: ', alerts)} */}
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                    >
                        <h3 className="text-lg text-black font-semibold my-2">Alert ID: {alert.id}</h3>
                        {/* <p className="text-black">anomaly class: {alert.anomaly}</p> */}
                        <p className="text-black">anomaly ID: {alert.anomaly_id}</p>
                        {(alert.responder_id != null) && 
                          <>
                          
                            {/* <p className="text-black">responder: {fetchResponder(alert)
                            .then(username => <span>{username}, </span>)}</p> */}
                            <p className="text-black">responder ID: {alert.responder_id}</p>
                          </>
                        }
                        {(alert.responder_id == null) && 
                        <div className="m-2 h-32 flex flex-col justify-around">
                          <label>Assignment Id:</label>
                            <input type="text" className='w-20' value={id} onChange={(e) => setId(e.target.value)} />
                            <Select
                              id="Responder-select"
                              options={options}
                              onChange={(option) => {
                                const responder = responders.find((responder) => responder.id === option?.value) ?? undefined;
                                setSelectedResponder(responder?.id);
                              }}
                              placeholder='Select a Responder: '
                              className='text-black'
                            />
                        </div>}
                        <div className="flex m-2 w-4/5 justify-around">
                        <button onClick={() => deleteAlert(alert.id)}>Delete</button>
                        {(alert.responder_id == null) && <button onClick={() => addAssignment(selectedResponder, alert.id, id)}>Assign Responder</button>}
                        </div>
                        
                    </div>
                ))}
            </div>
          </div>
    </div>
  );
};

// */