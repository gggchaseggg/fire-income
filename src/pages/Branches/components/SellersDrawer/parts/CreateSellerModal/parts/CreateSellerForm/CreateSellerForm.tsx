import { Button, Grid, Group, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { CreateSellerFormProps } from "./CreateSellerForm.types";

export const CreateSellerForm: FC<CreateSellerFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [firstName, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [lastName, setLastname] = useState("");
  const [passport, setPassport] = useState("");

  const createProduct = () => {
    onCreate({
      firstName,
      surname,
      lastName,
      passport,
    });
  };

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label="Фамилия"
            placeholder="Укажите фамилию"
            value={surname}
            onChange={({ target: { value } }) => setSurname(value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Имя"
            placeholder="Укажите имя"
            value={firstName}
            onChange={({ target: { value } }) => setFirstname(value)}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <TextInput
            label="Отчество"
            placeholder="Укажите отчество"
            value={lastName}
            onChange={({ target: { value } }) => setLastname(value)}
          />
        </Grid.Col>
      </Grid>
      <TextInput
        label="Пасспорт"
        placeholder="Укажите паспорт"
        value={passport}
        onChange={({ target: { value } }) => setPassport(value)}
        type="number"
        mt="sm"
      />

      <Group mt="md" justify="end">
        <Button variant="subtle" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button onClick={createProduct}>Создать</Button>
      </Group>
    </>
  );
};
