import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default function App() {
  const [surgeries, updateSurgeries] = useState([]);

  const fetchSurgeries = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/surgery`);
      updateSurgeries(data.surgeries);
    } catch (err) {
      // TODO: add a nice message that something is up with the server
      console.error(err);
    }
  };

  const cancelSurgeries = async (surgeryIds) => {
    try {
      await axios.post(`${BASE_URL}/surgery/cancel`, {
        surgery_ids: surgeryIds,
      });

      // clear out the surgery from display if we get a 200 from the server
      updateSurgeries(
        surgeries.filter((surgery) => !surgeryIds.includes(surgery.id)),
      );
    } catch (err) {
      // TODO: Add a nice message to the user that we screwed something up
      console.error(err);
    }
  };

  const displayDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const displayTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  useEffect(() => {
    fetchSurgeries();
  }, []);

  return (
    <table className="SurgeryTable">
      <thead>
        <tr className="SurgeryTable__Header">
          <th>Date</th>
          <th>Time</th>
          <th>Patient</th>
          <th>DoB</th>
          <th>Surgeon</th>
          <th>Type</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {surgeries.map((surgery) => {
          return (
            <tr className="SurgeryTable__Row" key={surgery.id}>
              <td>{displayDate(surgery.date)}</td>
              <td>{displayTime(surgery.date)}</td>
              <td>
                {surgery.patient.first_name} {surgery.patient.last_name}
              </td>
              <td>{displayDate(surgery.patient.dob)}</td>
              <td>
                {surgery.provider?.first_name} {surgery.provider?.last_name}
              </td>
              <td>{surgery.type}</td>
              <td>
                <button onClick={() => cancelSurgeries([surgery.id])}>
                  cancel
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
