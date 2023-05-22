import { useEffect, useState } from 'react';

import { Alert } from '../types/Alert';
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';

export default function Create() {
  const [anomalyId, setAnomalyId] = useState<string>('');
  const [responderId, setResponderId] = useState<string|null>('');
  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  }

  async function sentRequest(id: string){
    const { data, error } = await supabase
    //
    .from('alerts')
    .select("*")
    .eq('anomaly_id', id);
      if (error){
        // throw error;
        return false
      } 
      return true
  }


  async function addAlert() {
    if(await sentRequest(anomalyId)) alert('alert exists for this anomaly')
    if(!responderId) setResponderId(null)
    const { data, error } = await supabase
      .from('alerts')
      .insert({ 
        anomaly_id: anomalyId, 
        responder_id: responderId
      })
      .single();
    if (error) console.log('error', error);
    else handleGoBack();
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className=' text-3xl'>Add Alert</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addAlert();
      }} className='w-2/5'>
        <label>Anomaly Id:</label>
        <input type="text" value={anomalyId} onChange={(e) => setAnomalyId(e.target.value)} />         
        <label>Responder Id:</label>
        <input type="text" value={responderId||''} onChange={(e) => setResponderId(e.target.value)} />
        <button type="submit" className='m-5'>Add Alert</button>
      </form>
    </div>
  );
}
