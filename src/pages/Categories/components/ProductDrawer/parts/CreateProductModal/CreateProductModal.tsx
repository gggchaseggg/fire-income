import { Alert, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import { Api } from "../../../../../../api";
import { CreateProduct, Product } from "../../../../../../types";
import { CreateProductModalProps } from "./CreateProductModal.types";
import { CreateProductForm } from "./parts";

export const CreateProductModal: FC<CreateProductModalProps> = ({
  onCloseModal,
  categoryId,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");

  const createCategory = (data: CreateProduct) => {
    Api.post<CreateProduct, Product>(`/category/${categoryId}/product`, data)
      .then(({ data: { name } }) => setTitle(name))
      .then(onCloseModal);
    close();
  };

  return (
    <>
      <Button variant="light" onClick={open}>
        Добавить продукт
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Добавление продукта"
        size="lg"
      >
        <CreateProductForm onCreate={createCategory} onCloseModal={close} />
      </Modal>
      {title && (
        <Alert
          variant="light"
          color="green"
          withCloseButton
          title="Продукт создан"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
          onClose={() => setTitle("")}
        >
          Продукт{" "}
          <Text component="span" size="sm" ff="monospace">
            {title}
          </Text>{" "}
          была успешно создана
        </Alert>
      )}
    </>
  );
};
