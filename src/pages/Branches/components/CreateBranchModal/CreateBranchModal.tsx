import { Alert, Button, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../api";
import { Branch, CreateBranch } from "../../../../types";
import { CreateBranchModalProps } from "./CreateBranchModal.types";
import { CreateBranchForm } from "./parts";

export const CreateBranchModal: FC<CreateBranchModalProps> = ({
  onCloseModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [kpp, setKpp] = useState("");

  const createCategory = (data: CreateBranch) => {
    Api.post<CreateBranch, Branch>("/chief/branches/create", data)
      .then(({ data: { kpp } }) => setKpp(kpp))
      .then(onCloseModal);
    closeModal();
  };

  const closeModal = () => {
    onCloseModal();
    close();
  };

  return (
    <>
      <Button variant="light" onClick={open}>
        Добавить филиал
      </Button>
      <Modal
        opened={opened}
        onClose={closeModal}
        title="Добавление филиала"
        size="lg"
      >
        <CreateBranchForm onCreate={createCategory} onCloseModal={closeModal} />
      </Modal>
      {kpp && (
        <Alert
          variant="light"
          color="green"
          withCloseButton
          title="Филиал добавлен"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          onClose={() => setKpp("")}
        >
          Филиалл{" "}
          <Text component="span" size="sm" ff="monospace">
            {kpp}
          </Text>{" "}
          был успешно создана
        </Alert>
      )}
    </>
  );
};
