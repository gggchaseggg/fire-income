import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ProductDrawerProps } from "./ProductDrawer.types";
import { ActionIcon, Checkbox, Drawer, Tooltip } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Product } from "../../../../types";
import { Api } from "../../../../api";
import { CreateProductModal } from "./parts";
import { IconCircleXFilled } from "@tabler/icons-react";

export const ProductDrawer: FC<ProductDrawerProps> = ({
  openedDrawer,
  closeDrawer,
  categoryId,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        header: "",
        accessorKey: "selling",
        Cell: ({
          row: {
            original: { selling },
          },
        }) => <Checkbox checked={selling} />,
        maxSize: 70,
      },
      { header: "ID", accessorKey: "id" },
      { header: "Название", accessorKey: "name" },
    ],
    [],
  );

  const getProducts = useCallback(() => {
    Api.get<Product[]>(`/category/${categoryId}/product`).then(({ data }) => {
      setProducts(data);
    });
  }, []);

  useEffect(getProducts, []);

  const deleteProduct = (id: string) => {
    console.log(id);
  };

  const table = useMantineReactTable({
    columns,
    data: products,
    renderTopToolbarCustomActions: () => (
      <CreateProductModal onCloseModal={getProducts} categoryId={categoryId} />
    ),
    renderRowActions: ({
      row: {
        original: { id },
      },
    }) => (
      <Tooltip label="Удалить товар">
        <ActionIcon
          variant="transparent"
          color="red"
          onClick={() => deleteProduct(id)}
        >
          <IconCircleXFilled />
        </ActionIcon>
      </Tooltip>
    ),
    enableEditing: true,
    initialState: { density: "xs" },
    enableDensityToggle: false,
    enableBottomToolbar: false,
    positionActionsColumn: "last",
    localization: { actions: "Удалить" },
  });

  return (
    <Drawer
      opened={openedDrawer}
      onClose={closeDrawer}
      position="right"
      title="Список товаров"
      size="xl"
    >
      <MantineReactTable table={table} />
    </Drawer>
  );
};
