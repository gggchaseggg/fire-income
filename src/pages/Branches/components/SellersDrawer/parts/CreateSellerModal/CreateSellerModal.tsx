import { Alert, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../../../api";
import { CreateSeller } from "../../../../../../types";
import { CreateSellerModalProps } from "./CreateSellerModal.types";
import { CreateSellerForm } from "./parts";

export const CreateSellerModal: FC<CreateSellerModalProps> = ({
  onCloseModal,
  kpp,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");

  const createCategory = (data: CreateSeller) => {
    Api.post<CreateSeller, string>(`/branch/${kpp}/sellers/attach`, data).then(
      ({ data }) => setTitle(data),
    );
    closeModal();
  };

  const closeModal = () => {
    onCloseModal();
    close();
  };

  return (
    <>
      <Button variant="light" onClick={open}>
        Добавить продавца
      </Button>
      <Modal
        opened={opened}
        onClose={closeModal}
        title="Добавление продавца"
        size="lg"
      >
        <CreateSellerForm onCreate={createCategory} onCloseModal={closeModal} />
      </Modal>
      {title && (
        <Alert
          variant="light"
          color="green"
          withCloseButton
          title="Продавец создан"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          onClose={() => setTitle("")}
        >
          Продавец{" "}
          <Text component="span" size="sm" ff="monospace">
            {title}
          </Text>{" "}
          был успешно создана
        </Alert>
      )}
    </>
  );
};
