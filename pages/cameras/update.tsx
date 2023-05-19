import { useState, useEffect } from 'react';
import { Camera } from '../types/Camera'; 
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';

export default function Update( oldId: any) {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [id, setId] = useState<string>('');
  const [description, setDescription] = useState<string>();
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [framerate, setFramerate] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    async function fetchCameras() {
      const { data, error } = await supabase
        .from('countries')
        .select()
        .eq('id', oldId);
      if (error) console.log('error', error);
      else setCameras(data);
    }
  
    fetchCameras();
  }, [oldId]);

  const handleGoBack = () => {
    
    router.back();
  }

  async function updateCamera(id: string, updates: Partial<Camera>) {
    const { error } = await supabase
        .from('cameras')
        .update({ isAccepted: true, 
          responder_id: user.id, sentRequest: null  
        })
        .eq('id', (alertId))
    if (error) console.log('error', error);
    else {
      const updatedCameras = cameras.map((camera) =>
        camera.id === data.id ? { ...camera, ...data } : camera
      );
      setCameras(updatedCameras);
      handleGoBack()
    }
  }

  async function deleteCamera(id: string) {
    const { error } = await supabase.from('cameras').update().eq('id', id)
    if (error) console.log('error', error);
    else {
      const updatedCameras = cameras.filter((camera) => camera.id !== id);
      setCameras(updatedCameras);
    }
  }
  {console.log('in update 22');}

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className=' text-3xl'>Update Camera</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        updateCamera();
      }} className='w-2/5'>
        <label>Id:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Longitude:</label>
        <input type="number" value={longitude} onChange={(e) => setLongitude(Number(e.target.value))} />
        <label>Latitude:</label>
        <input type="number" value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} />
        <label>Frame Rate:</label>
        <input type="number" value={framerate} onChange={(e) => setFramerate(Number(e.target.value))} />
        <button type="submit" className='m-5'>Add Camera</button>
      </form>
    </div>
  );
}
