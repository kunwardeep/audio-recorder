import { useEffect, useState } from "react";
import { getCustomers } from "../server";
import { ICustomersData } from "../types";

let CACHE_CUSTOMERS: Array<ICustomersData>;

const useFetchCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<ICustomersData>>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (CACHE_CUSTOMERS) {
      console.log("Fetch from Cache");
      setData(CACHE_CUSTOMERS);
      setLoading(false);
    } else {
      getCustomers()
        .then((customers) => {
          setData(customers);
          CACHE_CUSTOMERS = customers;
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  }, []);

  return { loading, error, data };
};

export default useFetchCustomers;
