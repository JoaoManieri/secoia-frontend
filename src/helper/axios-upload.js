import axios from "axios";

const UploadInstance = axios.create({
    baseURL: "http://localhost:8080/files/upload/norma",
  });

export default UploadInstance;