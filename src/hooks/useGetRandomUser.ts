import { useEffect, useState } from "react";
import { ICustomerData } from "../types";

export interface IData {
  results: Array<any>;
  // info:
}

const useRandomUsers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fn = async () => {
      const url = "https://randomuser.me/api/?results=50";
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error("Error");
        setError(new Error("Error happened"));
        setLoading(false);
      }
    };

    fn();
  }, []);

  return { loading, error, data };
};

export default useRandomUsers;
