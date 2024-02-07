import "./App.scss";
import SurgeryTable from "./SurgeryTable";
import AddSurgeryModal from "./AddSurgeryModal";
import { useState, useEffect } from "react";
import { fetchSurgeries, cancelSurgeries, createSurgery } from "./store";

export default function App() {
  const [surgeries, updateSurgeries] = useState([]);

  const getSurgeries = async () => {
    try {
      const allSurgeries = await fetchSurgeries();
      updateSurgeries(allSurgeries);
    } catch (err) {
      // TODO: add a nice message that something is up with the server
      console.error(err);
    }
  };

  const removeSurgeries = async (idsToRemove) => {
    try {
      await cancelSurgeries(idsToRemove);
      updateSurgeries(
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
      updateSurgeries([...surgeries, createdSurgery]);
    } catch (err) {
      // I promise im not this lazy irl
      console.log(err);
    }
  };

  useEffect(() => {
    getSurgeries();
  }, []);

  return (
    <div className="App">
      <SurgeryTable surgeries={surgeries} removeSurgeries={removeSurgeries} />
      <AddSurgeryModal addSurgery={addSurgery} />
    </div>
  );
}
