import { CreateBranch } from "../../../../../../types";

export type CreateBranchFormProps = {
  onCreate: (data: CreateBranch) => void;
  onCloseModal: () => void;
};
