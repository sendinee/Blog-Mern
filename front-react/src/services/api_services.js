import axios from 'axios';
import { retrieveData, TOKENID } from './localStorage';

const BASE_URL = 'http://localhost:3030';

export {BASE_URL, login, getRessources, getRessource, updateRessource, createRessource, deleteRessource};

function login(data) {
  const url = `${BASE_URL}/login`;
  return axios.post(url, data).then((response) => response.data);
}

function getRessources(name) {
  const url = `${BASE_URL}/${name}`;
  return axios.get(url).then((response) => response.data);
}
function getRessource(name, id) {
  const url = `${BASE_URL}/${name}/${id}`;
  return axios.get(url).then((response) => response.data);
}
function updateRessource(name, id, data) {
    const url = `${BASE_URL}/${name}/${id}`;
    let token= retrieveData(TOKENID);
    return axios.put(url, data, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}
function createRessource(name, data) {
    const url = `${BASE_URL}/${name}`;
    let token= retrieveData(TOKENID);
    return axios.post(url, data, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}
function deleteRessource(name, id) {
    const url = `${BASE_URL}/${name}/${id}`;
    let token= retrieveData(TOKENID);
    return axios.delete(url, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}


