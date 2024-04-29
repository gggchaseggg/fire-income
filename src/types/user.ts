export enum Role {
  ADMIN,
  CHIEF,
  SUPERVISOR,
  SELLER,
}

export type Branch = {
  id: string;
  city: string;
  street: string;
  house: string;
  kpp: string;
  sellers: User[];
  adapterUrl: string;
  active: boolean;
};

export type Organization = {
  id: string;
  name: string;
  director: User;
  supervisors: User[];
  inn: string;
  branches: Branch[];
};

export type User = {
  id: string;
  username: string;
  surname: string;
  firstName: string;
  lastName: string;
  password: string;
  passport: string;
  active: boolean;
  role: Role;
  organization: Organization;
};
