import { useState } from "react";

const useFetchFromSheet = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = (formData, requestType) => {
    setLoading(true);
    google.script.run
      .withSuccessHandler((res) => {
        setResponse(res);
        setLoading(false);
      })
      .withFailureHandler((err) => {
        setError(err);
        setLoading(false);
      })
      .checkRequest(formData, requestType);
  };

  return { loading, response, error, sendRequest };
};

export default useFetchFromSheet;
