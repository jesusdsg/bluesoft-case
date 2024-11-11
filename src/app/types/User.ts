export interface IUser {
  uid: string;
  email: string;
  name?: string;
  balance?: number;
  role: string;
}

export interface IUsersResult {
  email: string;
  name: string;
  transactionCount: number;
  uid: string;
}
