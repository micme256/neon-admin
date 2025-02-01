import { useState } from "react";

const useFetchFromSheet = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = (formData) => {
    setLoading(true);
    google.script.run
      .withSuccessHandler((response) => {
        setResponse({ ...response });
        setLoading(false);
        // if (callback) callback(response);
      })
      .withFailureHandler((err) => {
        setError(err);
        setLoading(false);
        // if (callback) callback(null, err);
      })
      .addData(formData);
  };

  return { loading, response, error, sendRequest };
};

export default useFetchFromSheet;
