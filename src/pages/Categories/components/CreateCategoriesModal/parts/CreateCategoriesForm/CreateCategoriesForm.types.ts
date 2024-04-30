import { CreateCategory } from "../../../../../../types";

export type CreateCategoriesFormProps = {
  onCreate: (data: CreateCategory) => void;
  onCloseModal: () => void;
};
