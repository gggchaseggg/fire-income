import { User } from "../../../../../../../../types";

export type CreateExistingSellerFormProps = {
  onCreate: (data: User) => void;
  onCloseModal: () => void;
};
