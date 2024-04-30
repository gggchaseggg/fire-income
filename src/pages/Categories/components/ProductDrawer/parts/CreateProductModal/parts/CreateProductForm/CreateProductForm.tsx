import { Button, Group, Select, TextInput } from "@mantine/core";
import { ChangeEvent, FC, useState } from "react";
import { CreateProductFormProps } from "./CreateProductForm.types";
import { MeasureUnit, Nullable } from "../../../../../../../../types";

export const CreateProductForm: FC<CreateProductFormProps> = ({
  onCloseModal,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [measureUnit, setMeasureUnit] = useState<Nullable<string>>(null);

  const changeValue =
    (field: "name" | "price") =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      switch (field) {
        case "name":
          setName(value);
          break;
        case "price":
          setPrice(value);
          break;
      }
    };

  const createProduct = () => {
    if (!measureUnit) return;
    onCreate({
      name,
      price: Number.parseFloat(price),
      // @ts-ignore
      measureUnit: MeasureUnit[measureUnit],
    });
  };

  return (
    <>
      <TextInput
        label="Название"
        placeholder="Укажите название"
        value={name}
        onChange={changeValue("name")}
      />
      <TextInput
        label="Цена"
        placeholder="Укажите цену"
        value={price}
        onChange={changeValue("price")}
        type="number"
      />
      <Select
        label="Единицы измерения"
        value={measureUnit}
        data={["L", "KG", "UNIT"]}
        onChange={(value) => setMeasureUnit(value)}
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
