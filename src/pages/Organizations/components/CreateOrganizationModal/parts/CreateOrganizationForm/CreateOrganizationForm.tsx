import { Button, Fieldset, Grid, Group, TextInput } from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";
import { CreateOrganizationFormProps } from "./CreateOrganizationForm.types";

export const CreateOrganizationForm: FC<CreateOrganizationFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [orgName, setOrgName] = useState("");
  const [orgInn, setOrgInn] = useState("");
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passport, setPassport] = useState("");
  const [password, setPassword] = useState("");

  const changeValue =
    (
      field:
        | "orgName"
        | "orgInn"
        | "surname"
        | "firstName"
        | "firstName"
        | "lastName"
        | "passport"
        | "password",
    ) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      switch (field) {
        case "orgName": {
          setOrgName(value);
          break;
        }
        case "orgInn": {
          setOrgInn(value);
          break;
        }
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

  const createOrganization = () => {
    onCreate({
      name: orgName,
      inn: orgInn,
      director: {
        surname,
        firstName,
        lastName,
        passport,
        password,
      },
    });
  };

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Название"
            placeholder="Укажите название организации"
            value={orgName}
            onChange={changeValue("orgName")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="ИНН"
            placeholder="Укажите ИНН организации"
            type="number"
            value={orgInn}
            onChange={changeValue("orgInn")}
          />
        </Grid.Col>
      </Grid>

      <Fieldset legend="Директор" mt="md">
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
      </Fieldset>
      <Group mt="md" justify="end">
        <Button variant="subtle" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button onClick={createOrganization}>Сохранить</Button>
      </Group>
    </>
  );
};
