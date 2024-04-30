import { ActionIcon, Title, Tooltip } from "@mantine/core";
import { Category } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Api } from "../../api";
import { CreateCategoriesModal, ProductDrawer } from "./components";
import { IconShoppingCart } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Название", accessorKey: "name" },
    ],
    [],
  );

  const getCategories = useCallback(() => {
    Api.get<Category[]>("/category/").then(({ data }) => {
      setCategories(data);
    });
  }, []);

  useEffect(getCategories, []);

  const openDrawer = (id: string) => {
    setCategoryId(id);
    open();
  };

  const table = useMantineReactTable({
    columns,
    data: categories,
    renderTopToolbarCustomActions: () => (
      <CreateCategoriesModal onCloseModal={getCategories} />
    ),
    renderRowActions: ({
      row: {
        original: { id },
      },
    }) => (
      <Tooltip label="Посмотреть товары">
        <ActionIcon variant="transparent" onClick={() => openDrawer(id)}>
          <IconShoppingCart />
        </ActionIcon>
      </Tooltip>
    ),
    enableEditing: true,
    initialState: { density: "xs" },
    enableDensityToggle: false,
    enableBottomToolbar: false,
    positionActionsColumn: "last",
    localization: { actions: "Товары" },
  });

  return (
    <>
      <Title order={2} mb="md">
        Категории
      </Title>
      <MantineReactTable table={table} />
      <ProductDrawer
        openedDrawer={opened}
        closeDrawer={close}
        categoryId={categoryId}
      />
    </>
  );
};
