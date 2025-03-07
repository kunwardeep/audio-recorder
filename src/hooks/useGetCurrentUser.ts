/* eslint-disable @arthurgeron/react-usememo/require-usememo */
import { useEffect, useState } from "react";
import { ICustomerData, IGetCurrentUser } from "../types";
import useFetchCustomers from "./useFetchCustomers";
import { useSearchParams } from "react-router-dom";
import { PARAMS } from "./useParamNavigation";

const useGetCurrentUser: () => IGetCurrentUser = () => {
  const [searchParams] = useSearchParams();
  const [customerData, setCustomerData] = useState<ICustomerData | undefined>();
  const [paramValue, setParamValue] = useState<number>(0);
  const { loading, error, data } = useFetchCustomers();
  const [errorFetchingCustomer, setErrorFetchingCustomer] = useState<
    Error | undefined
  >(undefined);

  useEffect(() => {
    const paramValue = Number(searchParams.get(PARAMS.USER));
    setParamValue(paramValue);
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      if (paramValue > 0) {
        const customerData = data.find((d) => d.id === paramValue);
        if (!customerData) {
          setErrorFetchingCustomer(new Error("Unable to find customer"));
        } else {
          setCustomerData(customerData);
        }
      } else {
        setErrorFetchingCustomer(
          new Error(
            "Unable to get customer id. Did you pass user = YOUR_ID in url params"
          )
        );
      }
    }
  }, [data, paramValue]);

  return { loading, error: error || errorFetchingCustomer, data: customerData };
};

export default useGetCurrentUser;
