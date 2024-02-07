import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

import "./SurgeryTable.scss";

export default function SurgeryTable(props) {
  const { surgeries, removeSurgeries, selectSurgery } = props;

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

  const displayAge = (patient) => {
    const birthDate = new Date(patient.dob);
    const currentDate = new Date();
    const diff = currentDate - birthDate;
    const ageDate = new Date(diff);

    // javascript uses 1970 as the time from which all dates are counted
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="SurgeryTable">
      <div className="SurgeryTable__Title">Current Appointments</div>
      <table className="SurgeryTable__Table">
        <thead>
          <tr className="SurgeryTable__Header">
            <th>Date</th>
            <th>Time</th>
            <th>Patient</th>
            <th>DOB</th>
            <th className="SurgeryTable__Age">Age</th>
            <th>Surgeon</th>
            <th>Type</th>
            <th />
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
                <td className="SurgeryTable__Age">
                  {displayAge(surgery.patient)}
                </td>
                <td>
                  {surgery.provider?.first_name} {surgery.provider?.last_name}
                </td>
                <td>{surgery.type}</td>
                <td>
                  <button onClick={() => selectSurgery(surgery)}>
                    <Edit />
                  </button>
                </td>
                <td>
                  <button onClick={() => removeSurgeries([surgery.id])}>
                    <Delete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
