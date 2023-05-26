import { useEffect, useState } from "react";

import React from "react";
import Select from "react-select";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "react-toastify";

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
  const [cameraDescription, setCameraDescription] = useState("");

  async function addAssignment(responder: any, alertId: string, id: string) {
    const { data, error } = await supabase
      .from("alerts")
      .update({ responder_id: responder })
      .eq("id", alertId);

    if (error) console.log("error", error);
    else {
      setId("");
      setSelectedResponder(null);
      console.log("assignment insert success");
      toast("success bro");
      window.location.reload();
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

  useEffect(() => {
    const fetchCameraDescription = async () => {
      try {
        const { data, error } = await supabase
          .from("cameras")
          .select("camera_description")
          .eq("id", alert.camera_id);

        if (error) throw error;

        if (data.length > 0) {
          setCameraDescription(data[0].camera_description);
        }
      } catch (error) {
        console.error("Error fetching camera description:", error);
      }
    };

    fetchCameraDescription();
  }, [alert.camera_id]);

  return (
    <div
      key={alert?.id}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
    >
      <h3 className="text-lg text-black font-semibold my-2">
        Alert ID: {alert.id}
      </h3>
      <p className="text-black">Anomaly ID: {alert.anomaly_id}</p>
      <p className="text-black">Location: {cameraDescription}</p>
      {alert.responder_id != null && (
        <>
          <p className="text-black">Responder ID: {alert.responder_id}</p>
        </>
      )}
      {alert.responder_id == null && (
        <div className="m-2 flex flex-col justify-around">
          <Select
            id="Responder-select"
            options={options}
            onChange={(option) => {
              const responder =
                responders.find(
                  (responder: { id: string | undefined }) =>
                    responder.id === option?.value
                ) ?? undefined;
              setSelectedResponder(responder?.id);
            }}
            placeholder="Select a Responder:"
            className="text-black"
          />
        </div>
      )}
      
      <div className="flex m-2 w-4/5 justify-around">
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
