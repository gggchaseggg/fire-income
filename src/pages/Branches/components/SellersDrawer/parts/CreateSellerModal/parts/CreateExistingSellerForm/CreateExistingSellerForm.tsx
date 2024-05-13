import { Autocomplete, Button, Group } from "@mantine/core";
import { FC, useCallback, useEffect, useState } from "react";
import { CreateExistingSellerFormProps } from "./CreateExistingSellerForm.types";
import { User } from "../../../../../../../../types";
import { Api } from "../../../../../../../../api";

export const CreateExistingSellerForm: FC<CreateExistingSellerFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [seller, setSeller] = useState("");
  const [sellers, setSellers] = useState<User[]>([]);

  const sellersFormat = sellers.map(
    ({ username, firstName, surname, lastName, passport }) =>
      `${username}: ${firstName} ${surname} ${lastName} ${passport}`,
  );

  const getSellers = useCallback(() => {
    Api.post<unknown, User[]>(`/branch/findSellers`, {}).then(({ data }) => {
      setSellers(data);
    });
  }, []);

  useEffect(getSellers, []);

  const createSeller = () => {
    const selectedUsername = seller.slice(0, seller.indexOf(":"));
    const user = sellers.find(({ username }) => username === selectedUsername);
    if (user) {
      onCreate(user);
    }
    onCloseModal();
  };

  return (
    <>
      <Autocomplete data={sellersFormat} value={seller} onChange={setSeller} />

      <Group mt="md" justify="end">
        <Button variant="subtle" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button onClick={createSeller}>Создать</Button>
      </Group>
    </>
  );
};
