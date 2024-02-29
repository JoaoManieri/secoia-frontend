import axios from "axios";

const normaInstance = axios.create({
    baseURL: "http://localhost:8080/norma",
  });

export default normaInstance;


  