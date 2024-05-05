import { CreateSeller, User } from "../../../../../../../../types";

export type CreateExistingSellerFormProps = {
  onCreate: (data: CreateSeller) => void;
  onCloseModal: () => void;
  sellers: User[];
};
