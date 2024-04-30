import { Alert, Button, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../api";
import { Category, CreateCategory } from "../../../../types";
import { CreateCategoriesModalProps } from "./CreateCategoriesModal.types";
import { CreateCategoriesForm } from "./parts";

export const CreateCategoriesModal: FC<CreateCategoriesModalProps> = ({
  onCloseModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");

  const createCategory = (data: CreateCategory) => {
    Api.post<CreateCategory, Category>("/category/create", data).then(
      ({ data: { name } }) => setTitle(name),
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
        Добавить категорию
      </Button>
      <Modal
        opened={opened}
        onClose={closeModal}
        title="Добавление категории"
        size="lg"
      >
        <CreateCategoriesForm
          onCreate={createCategory}
          onCloseModal={closeModal}
        />
      </Modal>
      {title && (
        <Alert
          variant="light"
          color="green"
          withCloseButton
          title="Категория добавлена"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          onClose={() => setTitle("")}
        >
          Категория{" "}
          <Text component="span" size="sm" ff="monospace">
            {title}
          </Text>{" "}
          была успешно создана
        </Alert>
      )}
    </>
  );
};
