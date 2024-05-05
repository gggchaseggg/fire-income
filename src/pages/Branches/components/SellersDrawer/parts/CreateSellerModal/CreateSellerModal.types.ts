import { User } from "../../../../../../types";

export type CreateSellerModalProps = {
  onCloseModal: () => void;
  kpp: string;
  sellers: User[];
};
