import { Alert, Button, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../api";
import { CreateOrganization } from "../../../../types";
import { CreateOrganizationModalProps } from "./CreateOrganizationModal.types";
import { CreateOrganizationForm } from "./parts";

export const CreateOrganizationModal: FC<CreateOrganizationModalProps> = ({
  onCloseModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [username, setUsername] = useState("");

  const createOrganization = (data: CreateOrganization) => {
    Api.post<CreateOrganization, string>("/admin/createOrg", data)
      .then(({ data }) => setUsername(data))
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
        Создать организацию
      </Button>
      <Modal
        opened={opened}
        onClose={closeModal}
        title="Создание организации"
        size="lg"
      >
        <CreateOrganizationForm
          onCreate={createOrganization}
          onCloseModal={closeModal}
        />
      </Modal>
      {username && (
        <Alert
          variant="light"
          color="green"
          withCloseButton
          title="Организация создана"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          onClose={() => setUsername("")}
        >
          Организация была успешно создана. <br />
          Директору был присвоен логин:{" "}
          <Text component="span" size="sm" ff="monospace">
            {username}
          </Text>
        </Alert>
      )}
    </>
  );
};
