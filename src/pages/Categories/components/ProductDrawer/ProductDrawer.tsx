import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ProductDrawerProps } from "./ProductDrawer.types";
import {
  ActionIcon,
  Badge,
  Checkbox,
  ColorSwatch,
  Drawer,
  Flex,
  Tooltip,
} from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Product } from "../../../../types";
import { Api } from "../../../../api";
import { CreateProductModal } from "./parts";
import { IconSwitch3 } from "@tabler/icons-react";

export const ProductDrawer: FC<ProductDrawerProps> = ({
  openedDrawer,
  closeDrawer,
  categoryId,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        header: "Статус",
        accessorKey: "selling",
        Cell: ({
          row: {
            original: { selling },
          },
        }) => (
          <Flex justify={"center"}>
            <Tooltip label={selling ? "Продается" : "Не продается"}>
              <ColorSwatch color={selling ? "green" : "yellow"} size={"12px"} />
            </Tooltip>
          </Flex>
        ),
        maxSize: 70,
      },
      { header: "ID", accessorKey: "id" },
      { header: "Название", accessorKey: "name" },
    ],
    [],
  );

  const getProducts = useCallback(() => {
    if (categoryId) {
      Api.get<Product[]>(`/category/${categoryId}/product`).then(({ data }) => {
        setProducts(data);
      });
    }
  }, [categoryId]);

  useEffect(() => {
    if (openedDrawer) {
      getProducts();
    }
  }, [openedDrawer, categoryId]);

  const changeStatus = (productId: string) => {
    Api.post(`/category/product/${productId}/changeStatus`).then(() => {
      getProducts();
    });
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
      <Tooltip label="Сменить статус">
        <ActionIcon variant="transparent" onClick={() => changeStatus(id)}>
          <IconSwitch3 />
        </ActionIcon>
      </Tooltip>
    ),
    enableEditing: true,
    initialState: { density: "xs" },
    enableDensityToggle: false,
    enableBottomToolbar: false,
    positionActionsColumn: "last",
    localization: { actions: "" },
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
