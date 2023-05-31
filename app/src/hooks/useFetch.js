import { useCallback, useState, useEffect } from "react";

const useFetch = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchData = useCallback(() => {
    let isActive = true;

    fetch(`${process.env.REACT_APP_API_URL}${path}`)
      .then((data) => data.json())
      .then((data) => isActive && setData(data))
      .catch((error) => isActive && setError(String(error)));

    return () => (isActive = false);
  }, [path]);

  useEffect(() => {
    return fetchData();
  }, [fetchData]);

  const invalidate = () => {
    fetchData();
  };

  const isLoading = !error && !data;

  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

export default useFetch;
