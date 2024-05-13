import { Alert, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../../../api";
import { CreateSeller, User } from "../../../../../../types";
import { CreateSellerModalProps } from "./CreateSellerModal.types";
import { CreateSellerForm, CreateExistingSellerForm } from "./parts";

export const CreateSellerModal: FC<CreateSellerModalProps> = ({
  onCloseModal,
  kpp,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedExisting, { open: openExisting, close: closeExisting }] =
    useDisclosure(false);
  const [title, setTitle] = useState("");

  const createSeller = (data: CreateSeller | User) => {
    Api.post<CreateSeller | User, string>(`/branch/${kpp}/sellers/attach`, data)
      .then(({ data }) => setTitle(data))
      .then(onCloseModal);
    close();
  };

  return (
    <>
      <Button variant="light" onClick={open}>
        Добавить продавца
      </Button>
      <Button variant="light" onClick={openExisting}>
        Добавить существующего продавца
      </Button>

      <Modal
        opened={openedExisting}
        onClose={closeExisting}
        title="Добавление существующего продавца"
        size="lg"
      >
        <CreateExistingSellerForm
          onCreate={createSeller}
          onCloseModal={closeExisting}
        />
      </Modal>

      <Modal
        opened={opened}
        onClose={close}
        title="Добавление продавца"
        size="lg"
      >
        <CreateSellerForm onCreate={createSeller} onCloseModal={close} />
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
