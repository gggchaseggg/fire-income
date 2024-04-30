import { Button, Grid, Group, TextInput } from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";
import { CreateSupervisorFormProps } from "./CreateSupervisorForm.types";

export const CreateSupervisorForm: FC<CreateSupervisorFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passport, setPassport] = useState("");
  const [password, setPassword] = useState("");

  const changeValue =
    (
      field:
        | "surname"
        | "firstName"
        | "firstName"
        | "lastName"
        | "passport"
        | "password",
    ) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      switch (field) {
        case "surname": {
          setSurname(value);
          break;
        }
        case "firstName": {
          setFirstName(value);
          break;
        }
        case "lastName": {
          setLastName(value);
          break;
        }
        case "passport": {
          setPassport(value);
          break;
        }
        case "password": {
          setPassword(value);
          break;
        }
      }
    };

  const createSupervisor = () => {
    onCreate({
      surname,
      firstName,
      lastName,
      passport,
      password,
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
            onChange={changeValue("surname")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Имя"
            placeholder="Укажите имя"
            value={firstName}
            onChange={changeValue("firstName")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Отчество"
            placeholder="Укажите отчество"
            value={lastName}
            onChange={changeValue("lastName")}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Пароль"
            placeholder="Укажите пароль"
            value={password}
            onChange={changeValue("password")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Паспорт"
            placeholder="Номер паспорта"
            type="number"
            value={passport}
            onChange={changeValue("passport")}
          />
        </Grid.Col>
      </Grid>
      <Group mt="md" justify="end">
        <Button variant="subtle" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button onClick={createSupervisor}>Создать</Button>
      </Group>
    </>
  );
};
