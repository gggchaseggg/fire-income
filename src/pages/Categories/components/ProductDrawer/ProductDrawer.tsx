import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ProductDrawerProps } from "./ProductDrawer.types";
import { Drawer } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useDisclosure } from "@mantine/hooks";
import { Product } from "../../../../types";
import { Api } from "../../../../api";
import { CreateProductModal } from "./parts";

export const ProductDrawer: FC<ProductDrawerProps> = ({
  openedDrawer,
  closeDrawer,
  categoryId,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
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

  const table = useMantineReactTable({
    columns,
    data: products,
    renderTopToolbarCustomActions: () => (
      <CreateProductModal onCloseModal={getProducts} categoryId={categoryId} />
    ),
    initialState: { density: "xs" },
    enableDensityToggle: false,
    enableBottomToolbar: false,
    positionActionsColumn: "last",
    localization: { actions: "Товары" },
  });

  return (
    <Drawer
      opened={openedDrawer}
      onClose={closeDrawer}
      position="right"
      title="Список товаров"
      size="lg"
    >
      <MantineReactTable table={table} />
    </Drawer>
  );
};
