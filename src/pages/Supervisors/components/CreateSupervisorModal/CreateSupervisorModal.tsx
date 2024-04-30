import { Alert, Button, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../api";
import { CreateSupervisor } from "../../../../types";
import { CreateSupervisorModalProps } from "./CreateSupervisorModal.types";
import { CreateSupervisorForm } from "./parts";

export const CreateSupervisorModal: FC<CreateSupervisorModalProps> = ({
  onCloseModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [username, setUsername] = useState("");

  const createSupervisor = (data: CreateSupervisor) => {
    Api.post<CreateSupervisor, string>("/chief/supervisors/create", data).then(
      ({ data }) => setUsername(data),
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
        Зарегистрировать супервайзера
      </Button>
      <Modal
        opened={opened}
        onClose={closeModal}
        title="Регистрация супервайзера"
        size="lg"
      >
        <CreateSupervisorForm
          onCreate={createSupervisor}
          onCloseModal={closeModal}
        />
      </Modal>
      {username && (
        <Alert
          variant="light"
          color="green"
          withCloseButton
          title="Супервайзер зарегистрирован"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          onClose={() => setUsername("")}
        >
          Супервайзер был успешно зарегистрирован. <br />
          Аккаунту был присвоен логин:{" "}
          <Text component="span" size="sm" ff="monospace">
            {username}
          </Text>
        </Alert>
      )}
    </>
  );
};
