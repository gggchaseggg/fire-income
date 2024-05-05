import { Autocomplete, Button, Grid, Group, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { CreateExistingSellerFormProps } from "./CreateExistingSellerForm.types";
import { Nullable, User } from "../../../../../../../../types";

export const CreateExistingSellerForm: FC<CreateExistingSellerFormProps> = ({
  onCloseModal,
  onCreate,
  sellers,
}) => {
  const [seller, setSeller] = useState<Nullable<User>>(null);

  const sellersFormat = sellers.map(
    ({ firstName, surname, lastName, passport }) =>
      `${firstName} ${surname} ${lastName} ${passport}`,
  );

  console.log(sellersFormat);

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
      <Autocomplete data={sellersFormat} />

      <Group mt="md" justify="end">
        <Button variant="subtle" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button onClick={createProduct}>Создать</Button>
      </Group>
    </>
  );
};
