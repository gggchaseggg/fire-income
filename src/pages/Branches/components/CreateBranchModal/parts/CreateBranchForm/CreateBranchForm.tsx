import { Button, Checkbox, Grid, Group, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { CreateBranchFormProps } from "./CreateBranchForm.types";

export const CreateBranchForm: FC<CreateBranchFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [kpp, setKpp] = useState("");
  const [adapterUrl, setAdapterUrl] = useState("");
  const [active, setActive] = useState(false);

  const createSupervisor = () => {
    onCreate({
      city,
      street,
      house,
      kpp,
      adapterUrl,
      active,
    });
  };

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label="Город"
            placeholder="Укажите город"
            value={city}
            onChange={({ target: { value } }) => setCity(value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Улица"
            placeholder="Укажите улицу"
            value={street}
            onChange={({ target: { value } }) => setStreet(value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Дом"
            placeholder="Укажите дом"
            value={house}
            onChange={({ target: { value } }) => setHouse(value)}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label="КПП"
            placeholder="Укажите КПП"
            value={kpp}
            onChange={({ target: { value } }) => setKpp(value)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Ссылка на адаптер"
            placeholder="Укажите ссылку"
            value={adapterUrl}
            onChange={({ target: { value } }) => setAdapterUrl(value)}
          />
        </Grid.Col>
        <Grid.Col span={4} mt="xl">
          <Checkbox
            label="Активный филиал"
            checked={active}
            onChange={({ target: { checked } }) => setActive(checked)}
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
