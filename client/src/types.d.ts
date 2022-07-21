export interface FormType<T, K extends keyof T> {
  formArr: T[];
  keyItem: K;
  onSubmit: (data: {}) => Promise<any>;
  loading?: boolean;
  data?: Project;
}

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export enum Status {
  new = "Not Started",
  inProgress = "In progress",
  finished = "Finished",
}

export interface Project {
  _id: string;
  name: string;
  status: string;
  description: string;
  client: Client;
}
