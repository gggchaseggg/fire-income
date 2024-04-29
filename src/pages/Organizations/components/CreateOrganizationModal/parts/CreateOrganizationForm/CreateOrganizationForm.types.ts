import { CreateOrganization } from "../../../../../../types";

export type CreateOrganizationFormProps = {
  onCreate: (data: CreateOrganization) => void;
  onCloseModal: () => void;
};
