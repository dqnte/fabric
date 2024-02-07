import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchSurgeries = async () => {
  return axios.get(`${BASE_URL}/surgery`).then((resp) => resp.data);
};

export const cancelSurgeries = async (surgeryIds) => {
  return axios
    .post(`${BASE_URL}/surgery/cancel`, {
      surgery_ids: surgeryIds,
    })
    .then((resp) => resp.data);
};

export const createSurgery = async (newSurgery) => {
  return axios
    .post(`${BASE_URL}/surgery/create`, newSurgery)
    .then((resp) => resp.data);
};

export const sendSurgeryUpdate = async (newSurgery) => {
  return axios
    .post(`${BASE_URL}/surgery/update`, newSurgery)
    .then((resp) => resp.data);
};

export const fetchFormData = async () => {
  const [providers, patients] = await Promise.all([
    axios.get(`${BASE_URL}/providers`),
    axios.get(`${BASE_URL}/patients`),
  ]);

  return { providers: providers.data, patients: patients.data };
};
