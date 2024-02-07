import "./App.scss";
import SurgeryTable from "./SurgeryTable";
import SurgeryModal from "./SurgeryModal";
import { useState, useEffect } from "react";
import {
  fetchSurgeries,
  cancelSurgeries,
  createSurgery,
  sendSurgeryUpdate,
} from "./api";

export default function App() {
  const [surgeries, setCurrentSurgeries] = useState([]);
  const [selectedSurgery, setSelectedSurgery] = useState(null);

  const getSurgeries = async () => {
    try {
      const allSurgeries = await fetchSurgeries();
      setCurrentSurgeries(allSurgeries);
    } catch (err) {
      // TODO: add a nice message that something is up with the server
      console.error(err);
    }
  };

  const removeSurgeries = async (idsToRemove) => {
    try {
      await cancelSurgeries(idsToRemove);
      setCurrentSurgeries(
        surgeries.filter((surgery) => !idsToRemove.includes(surgery.id)),
      );
    } catch (err) {
      // TODO: Add a nice message to the user that we screwed something up
      console.error(err);
    }
  };

  const addSurgery = async (newSurgery) => {
    try {
      const createdSurgery = await createSurgery(newSurgery);
      setCurrentSurgeries([...surgeries, createdSurgery]);
    } catch (err) {
      // I promise im not this lazy irl
      console.err(err);
    }
  };

  const selectSurgery = (surgery) => {
    setSelectedSurgery(surgery);
  };

  const updateSurgery = async (updatedSurgery) => {
    try {
      const newSurgery = await sendSurgeryUpdate(updatedSurgery);
      setSelectedSurgery(null);
      setCurrentSurgeries(
        surgeries.map((surgery) => {
          // we want to update the surgeries array with the new surgery object from the database
          return surgery.id === newSurgery.id ? newSurgery : surgery;
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSurgeries();
  }, []);

  return (
    <div className="App">
      <SurgeryTable
        surgeries={surgeries}
        removeSurgeries={removeSurgeries}
        selectSurgery={selectSurgery}
      />
      <SurgeryModal
        addSurgery={addSurgery}
        updateSurgery={updateSurgery}
        selectedSurgery={selectedSurgery}
      />
    </div>
  );
}
