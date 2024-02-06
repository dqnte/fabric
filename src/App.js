import "./App.scss";
import { useState, useEffect } from "react";

export default function App() {
  const [surgeries, updateSurgeries] = useState([]);

  const fetchSurgeries = async () => {
    const response = await fetch("http://localhost:8080/surgery");
    const data = await response.json();
    updateSurgeries(data.surgeries);
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
