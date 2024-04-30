import { CreateProduct } from "../../../../../../../../types";

export type CreateProductFormProps = {
  onCreate: (data: CreateProduct) => void;
  onCloseModal: () => void;
};
