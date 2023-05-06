import { useState, useEffect } from 'react';
import { Alert } from '../types/Alert'; 
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';

export default function Create() {
  const [alerts, setAlert] = useState<Alert[]>([]);
  const [id, setId] = useState<string>('');
  const [anomalyId, setAnomalyId] = useState<string>('');
  const [responderId, setResponderId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetchAlerts();
  }, []);

  async function fetchAlerts() {
    const { data, error } = await supabase.from('alerts').select('*').order("created_at", { ascending: false });
    // const { data, error } = await supabase.from('cameras').select('*') as { data: Alert[]; error: any };
    if (error) console.log('error', error);
    else{
      // setAlert(data);
      console.log(data)
    }
  }
  
  const handleGoBack = () => {
    router.back();
  }


  async function addCamera() {
    const { data, error } = await supabase
      .from('cameras')
      .insert({ id: id
        // , anomalyId: anomalyId, responderId: responderId
      })
      .single();
    if (error) console.log('error', error);
    else handleGoBack();
    // else setCameras([...cameras, data]);
  }

  /* //updateAlert is a promise
  async function updateAlert(id: string, updates: Partial<Alert>) {
    const { data, error } = await supabase
      .from('alerts')
      .update(updates)
      .match({ id })
      .single();
    if (error) console.log('error', error);
    else {
      const updatedCameras = alerts.map((alert) =>
      alert.id === data.id ? { ...alert, ...data } : alert
      );
      setAlert(updateAlert);
    }
  }
  */

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <h1 className=' text-3xl'>Add Camera</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addCamera();
      }} className='w-2/5'>
        <label>Id:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        {/* <label>Responder Id:</label>
        <input type="text" value={responderId} onChange={(e) => setResponderId(e.target.value)} />
        <label>Anomaly Id:</label>
        <input type="text" value={anomalyId} onChange={(e) => setAnomalyId(e.target.value)} />         */}
        <button type="submit" className='m-5'>Add Camera</button>
      </form>
    </div>
  );
}
