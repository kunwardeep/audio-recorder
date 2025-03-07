export interface ICustomerData {
  id: number;
  name: string;
  recordings: Array<number>;
}

export interface IGetCurrentUser {
  loading: boolean;
  error: Error | undefined;
  data: ICustomerData | undefined;
}
