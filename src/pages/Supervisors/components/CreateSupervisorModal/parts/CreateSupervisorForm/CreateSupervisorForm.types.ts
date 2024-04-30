import { CreateSupervisor } from "../../../../../../types";

export type CreateSupervisorFormProps = {
  onCreate: (data: CreateSupervisor) => void;
  onCloseModal: () => void;
};
