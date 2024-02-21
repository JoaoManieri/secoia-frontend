import { config } from "process";
import { useEffect, useState } from "react";

export default function useAxios(configureRequest) {
  const { axiosInstance, method, url, othersConfig = {} } = configureRequest;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...othersConfig,
        });
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [data, loading, error];
}

//const [data, loading, error] = useAxios()
