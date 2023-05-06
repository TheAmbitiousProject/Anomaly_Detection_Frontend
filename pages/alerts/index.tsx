import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Navbar from "../components/Navbar";
import { Alert } from '../types/Alert';
import Create from "./create";
import Update from "./update";

export default function Alerts(){
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
 
  useEffect(() => {
    async () => {
      try {
        const { data: alerts, error } = await supabase
          .from<Alert>("alerts")
          .select("*");

        if (error) throw error;

        setAlerts(alerts);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    };

    console.log(alerts);
  }, [alerts]);

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

function handleUpdate() {
    // router.push({
    //     pathname: '/update',
    //     query: { id },
    //   });
    setUpdate(true);
}


  return (
    <div className="h-screen w-screeen flex justify-center">
        <div className="basis-1/5">
            <Navbar/>
        </div>
        <div className="basis-4/5 p-10">
            <div className="topbar h-15 m-5">
                 <button onClick={() => {
                    <Create/>
                }}>Add alert</button>
            </div>
            {/* {console.log(alerts)} */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                    >
                        <h3 className="text-lg text-black font-semibold my-2">alert Id: {alert.id}</h3>
                        {/* <p className="text-black">{alert.anomaly_id}</p>
                        <p className="text-black">responder: {alert.responder_id}</p> */}
                        <div className="flex m-2 w-4/5 justify-around">
                        <button onClick={() => deleteAlert(alert.id)}>Delete</button>
                        <button onClick={() => {handleUpdate}
                        }>Update</button>

                        {update && <Update id={alert.id}/>}
                        </div>
                        
                    </div>
                ))}
            </div>
          </div>
    </div>
  );
};

// */