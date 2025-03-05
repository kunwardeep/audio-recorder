import { RECORDINGS, CUSTOMERS } from "../assets/data";
import { ICustomersData } from "../types";

export const getCustomers = (): Promise<Array<ICustomersData>> => {
  // TODO Maybe add reject later if you have time
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CUSTOMERS);
    }, 500);
  });
};
