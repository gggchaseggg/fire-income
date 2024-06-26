export enum Role {
  ADMIN = "ADMIN",
  CHIEF = "CHIEF",
  SUPERVISOR = "SUPERVISOR",
  SELLER = "SELLER",
}

export enum MeasureUnit {
  L,
  KG,
  UNIT,
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

export type Category = {
  id: string;
  name: string;
  organization: Organization;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  measureUnit: MeasureUnit;
  price: number;
  selling: boolean;
};

export type CreateOrganization = {
  name: string;
  inn: string;
  director: Pick<
    User,
    "surname" | "firstName" | "lastName" | "passport" | "password"
  >;
};

export type CreateSupervisor = Pick<
  User,
  "firstName" | "surname" | "lastName" | "passport" | "password"
>;

export type CreateCategory = Pick<Category, "name">;

export type CreateProduct = Pick<Product, "name" | "measureUnit" | "price">;

export type CreateBranch = Pick<
  Branch,
  "city" | "street" | "house" | "kpp" | "adapterUrl" | "active"
>;

export type CreateSeller = Pick<
  User,
  "firstName" | "surname" | "lastName" | "passport"
>;

export enum SaleProcessingStatus {
  IN_PROCESS = "IN_PROCESS",
  SAVED = "SAVED",
  ERROR = "ERROR",
}

export type UploadSale = {
  id: string;
  productName: string;
  sellerFio: string;
  amount: string;
  cost: string;
  time: string;
  status: SaleProcessingStatus;
  branch: Branch;
  error?: string;
};

export type UploadSalesResponse = {
  content: UploadSale[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: never[];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: never[];
  numberOfElements: number;
  empty: boolean;
};
