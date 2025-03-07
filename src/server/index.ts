import { CUSTOMERS } from "../assets/data";
import { ICustomerData } from "../types";

export const getCustomers = (): Promise<Array<ICustomerData>> => {
  // TODO Maybe add reject later if you have time
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CUSTOMERS);
    }, 500);
  });
};
