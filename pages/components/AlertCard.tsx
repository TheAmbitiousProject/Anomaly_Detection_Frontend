import { Marker, Popup, TileLayer } from "react-leaflet";
import { height, width } from "@mui/system";
import { useEffect, useState } from "react";

import React from "react";
import Select from "react-select";
import { supabase } from "@/utils/supabaseClient";

const AlertCard = ({
  alert,
  responders,
  deleteAlert,
}: {
  alert: any;
  deleteAlert: any;
  responders: any;
}) => {
  const [id, setId] = useState("");

  const [respondersObj, setRespondersObj] = useState<any>({});
  const [selectedResponder, setSelectedResponder] = useState<
    String | undefined | null
  >("");

  async function sentAssignment(alertId: string) {
    const { data, error } = await supabase
      .from("assignments")
      .select("*")
      .eq("alert_id", alertId);
    if (error) return true;
    return false;
  }

  async function addAssignment(responder: any, alertId: string, id: string) {
    if (await sentAssignment(alertId)) {
      alert(
        "An unaccepted/undenied request has been already sent for this Alert!!"
      );
      setId("");
      return null;
    }

    const { data, error } = await supabase
      .from("assignments")
      .insert({
        alert_id: alertId,
        responder_id: responder,
      })
      .single();
    if (error) console.log("error", error);
    else {
      setId("");
      setSelectedResponder(null);
      console.log("assignment insert success");
      alert("assignment insert success");
    }
  }

  const options: { value: string; label: string }[] = responders.map(
    (responder: { id: any; full_name: any }) => ({
      value: responder.id,
      label: responder?.full_name || "no name",
    })
  );

  useEffect(() => {
    const respObj: any = {};
    responders.forEach((resp: any) => {
      respObj[resp.id] = resp;
    });
    setRespondersObj(respObj);
  }, [responders]);

  return (
    <div
      key={alert?.id}
      className='bg-white rounded-lg shadow-md p-4 cursor-pointer'
    >
      <h3 className='text-lg text-black font-semibold my-2'>
        Alert ID: {alert.id}
      </h3>
      {/* <p className="text-black">anomaly class: {alert.anomaly}</p> */}
      <p className='text-black'>anomaly ID: {alert.anomaly_id}</p>
      {alert.responder_id != null && (
        <>
          <p className='text-black'>responder ID: {alert.responder_id}</p>
        </>
      )}
      {alert.responder_id == null && (
        <div className='m-2 flex flex-col justify-around'>
          <Select
            id='Responder-select'
            options={options}
            onChange={(option) => {
              const responder =
                responders.find(
                  (responder: { id: string | undefined }) =>
                    responder.id === option?.value
                ) ?? undefined;
              setSelectedResponder(responder?.id);
            }}
            placeholder='Select a Responder: '
            className='text-black'
          />
        </div>
      )}
      <div className='flex m-2 w-4/5 justify-around'>
        <button onClick={() => deleteAlert(alert.id)}>Resolved</button>
        {alert.responder_id == null && (
          <button
            onClick={() => addAssignment(selectedResponder, alert.id, id)}
          >
            Assign Responder
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
