import { Button, Group, TextInput } from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";
import { CreateCategoriesFormProps } from "./CreateCategoriesForm.types";

export const CreateCategoriesForm: FC<CreateCategoriesFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [name, setName] = useState("");

  const changeValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const createSupervisor = () => {
    onCreate({
      name,
    });
  };

  return (
    <>
      <TextInput
        label="Название"
        placeholder="Укажите название"
        value={name}
        onChange={changeValue}
      />
      <Group mt="md" justify="end">
        <Button variant="subtle" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button onClick={createSupervisor}>Создать</Button>
      </Group>
    </>
  );
};
