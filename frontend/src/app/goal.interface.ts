// To authenticate and generate JWT
export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
}

export interface IGoal {
  _id: string;
  userId: string; 
  title: string;
  description: string;
  deadline: number; 
  createdAt: string;
  steps: IStep[];
}

export interface IStep {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: number; 
  dateCreated: any;
}

export interface IState {
  _id: string;
  email: string;
  fullname: string;
  token: string;
}
