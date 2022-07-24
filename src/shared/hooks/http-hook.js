import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //handles error incase page changed while making a request
  const activeHttpRequests = useRef([]);

  //send request hook, UseCallback is important if hook used in another useEffect to avoid infinite loop
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      //useRef always uses a current property
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        //Keeps every controller except the controller that was used in this request
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  //return function is executed as a cleanup function before the next time useEffect runs again,
  // or when the component that uses useEffect unmounts
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
