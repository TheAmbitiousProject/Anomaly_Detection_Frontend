import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navbar from "../components/Navbar";
import { Camera } from '../types/Camera'; 
import Create from "./create";
import Update from "./update";
// import { useRouter } from 'next/router';


export default function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
 
  useEffect(() => {
    // setInterval(async () => {
      const fetchCameras = async () => {
        try {
          const { data: cameras, error } = await supabase
            .from<Camera>("cameras")
            .select("*")
            .order('id', { ascending: true });
  
          if (error) throw error;
  
          setCameras(cameras);
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          setError(error.message);
        }
      };
  
      fetchCameras();
      console.log(cameras) 
    // }, 3000);
  },[]);
  // }, [cameras]);

  async function deleteCamera(id: string) {
    const { error } = await supabase.from('cameras').delete().eq('id', id)
    if (error) console.log('error', error);
    else {
      const updatedCameras = cameras.filter((camera) => camera.id !== id);
      setCameras(updatedCameras);
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

//didnt work: supabase realtime
/*
supabase
.channel('any')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cameras' }, payload => {
  console.log('Change received!', payload)
})
.subscribe()
const { data: messages, realtimeError } = supabase.from('cameras')
                                  .on('INSERT', (payload: { new: any; }) => 
                                  console.log('New cameraaaaaaa inserted:', payload.new)).subscribe();;

  console.log(messages, realtimeError);
*/

  //const [data, setData] = useState([]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      const { data: messages, error } = await supabase.from('cameras').select('*');
      if (error) console.log('Error fetching messages:', error);
      else {
        setData(data);
        console.log('cameras:', data);
      }
        
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
*/

  function handleUpdate(cameraId: string){
    console.log('in update');
    <Update id={cameraId}/>
    {console.log('in update 20');}
  }

  return (
    <div className="h-screen w-screeen flex justify-center">
        <div className="basis-1/5">
            <Navbar/>
        </div>
        <div className="basis-4/5 p-10">
            {(!create ) && 
              <button className="topbar h-15 m-5" onClick={() => {
                console.log('to create')
                  setCreate(true)
              }}>Add Camera</button>
            }
                {create && <Create/>}
              {(!create ) && 
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cameras.map((camera) => (
                      <div
                          key={camera.id}
                          className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                      >
                          <h3 className="text-lg text-black font-semibold my-2">Camera Id: {camera.id}</h3>
                          <p className="text-black">{camera.camera_description}</p>
                          {/* <p className="text-black">Coordinates:  {camera.coordinates.latitude}, {camera.coordinates.longitude}</p> */}
                          <p className="text-black">Frame Rate: {camera.frame_rate}</p>
                          <div className="flex m-2 w-4/5 justify-around">
                            <button onClick={() => deleteCamera(camera.id)}>Delete</button>
                            <button onClick={() => {handleUpdate(camera.id)}
                            }>Update</button>

                            {/* {update && } */}
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