import { useState, useEffect } from "react";
import useFetchFromSheet from "./useFetchFromSheet";

const useFetchData = (requestOptions) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchRequest } = useFetchFromSheet();

  useEffect(() => {
    const requestData = async () => {
      setLoading(true);
      try {
        const response = await fetchRequest(requestOptions);
        if (response?.status !== "success") {
          throw new Error(response?.message || "Unknown error fetching data");
        }
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, [JSON.stringify(requestOptions)]);

  return { data, loading, error };
};

export default useFetchData;
