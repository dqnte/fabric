import { useEffect, useState } from "react";
import { fetchFormData } from "./api";

import "./SurgeryModal.scss";

export default function SurgeryModal(props) {
  const { addSurgery, selectedSurgery, updateSurgery } = props;
  const initialFormState = {
    id: null,
    type: "",
    date: "",
    time: "",
    patient_id: "",
    provider_id: "",
  };
  const [currentFormState, setFormState] = useState(initialFormState);
  const [providers, setProviders] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // surgery dates are timestamps in the database, so we should convert them here
    const date = new Date(`${currentFormState.date} ${currentFormState.time}`);
    const formPayload = {
      id: currentFormState.id,
      type: currentFormState.type,
      patient_id: currentFormState.patient_id,
      provider_id: currentFormState.provider_id,
      date: date.toISOString(),
    };

    if (currentFormState.id) {
      updateSurgery(formPayload);
    } else {
      addSurgery(formPayload);
    }

    setFormState({ ...initialFormState });
  };

  useEffect(() => {
    fetchFormData().then((formDropdowns) => {
      setProviders(formDropdowns.providers);
      setPatients(formDropdowns.patients);
    });
  }, []);

  useEffect(() => {
    if (selectedSurgery) {
      // this seems to be the cleanest way of setting the date of an input
      const surgeryDate = new Date(selectedSurgery.date);

      const day = ("0" + surgeryDate.getDate()).slice(-2);
      const month = ("0" + (surgeryDate.getMonth() + 1)).slice(-2);
      const dateString = `${surgeryDate.getFullYear()}-${month}-${day}`;

      let timeString = surgeryDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      // truly disappointing
      timeString = timeString === "24:00" ? "00:00" : timeString;

      setFormState({
        id: selectedSurgery.id,
        type: selectedSurgery.type,
        date: dateString,
        time: timeString,
        patient_id: selectedSurgery.patient.id,
        provider_id: selectedSurgery.provider.id,
      });
    }
  }, [selectedSurgery]);

  return (
    <div className="SurgeryModal">
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={currentFormState.type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={currentFormState.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={currentFormState.time}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Provider:
          <select
            name="provider_id"
            value={currentFormState.provider_id}
            onChange={handleInputChange}
            required
          >
            <option value=""></option>
            {providers.map((provider) => {
              return (
                <option value={provider.id} key={provider.id}>
                  {provider.first_name} {provider.last_name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Patient:
          <select
            name="patient_id"
            value={currentFormState.patient_id}
            onChange={handleInputChange}
            required
          >
            <option value=""></option>
            {patients.map((patient) => {
              return (
                <option value={patient.id} key={patient.id}>
                  {patient.first_name} {patient.last_name}
                </option>
              );
            })}
          </select>
        </label>
        <button className="SurgeryModal__Submit" type="submit">Submit</button>
      </form>
    </div>
  );
}
