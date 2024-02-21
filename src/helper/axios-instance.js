import axios from "axios";

const clienteInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

export default clienteInstance;
