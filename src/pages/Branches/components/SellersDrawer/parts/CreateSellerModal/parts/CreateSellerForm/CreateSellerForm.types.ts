import { CreateSeller } from "../../../../../../../../types";

export type CreateSellerFormProps = {
  onCreate: (data: CreateSeller) => void;
  onCloseModal: () => void;
};
