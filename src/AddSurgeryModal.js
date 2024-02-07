import { useEffect, useState } from "react";
import { fetchFormData } from "./store";

export default function AddSurgeryModal(props) {
  const { addSurgery } = props;
  const initialFormState = {
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
      type: currentFormState.type,
      patient_id: currentFormState.patient_id,
      provider_id: currentFormState.provider_id,
      date: date.toISOString(),
    };

    addSurgery(formPayload);
    setFormState({ ...initialFormState });
  };

  useEffect(() => {
    fetchFormData().then((formDropdowns) => {
      setProviders(formDropdowns.providers);
      setPatients(formDropdowns.patients);
    });
  }, []);

  return (
    <div className="AddSurgeryModal">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
