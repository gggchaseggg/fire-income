import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SellersDrawerProps } from "./SellersDrawer.types";
import { ActionIcon, Drawer, Tooltip } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Branch, Role, User } from "../../../../types";
import { Api } from "../../../../api";
import { CreateSellerModal } from "./parts";
import { IconUnlink } from "@tabler/icons-react";

export const SellersDrawer: FC<SellersDrawerProps> = ({
  openedDrawer,
  closeDrawer,
  branch: { city, street, house, kpp },
}) => {
  const [sellers, setSellers] = useState<User[]>([
    {
      id: "string",
      username: "string",
      surname: "string",
      firstName: "string",
      lastName: "string",
      password: "string",
      passport: "string",
      active: true,
      role: Role.SELLER,
      // @ts-ignore
      organization: {},
    },
  ]);
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Имя",
        accessorFn: ({ firstName, surname, lastName }) =>
          `${firstName} ${surname} ${lastName}`,
      },
    ],
    [],
  );

  const getProducts = useCallback(() => {
    Api.get<Branch>(`/branch/${kpp}`).then(({ data: { sellers } }) => {
      setSellers(sellers);
    });
  }, []);

  useEffect(getProducts, []);

  const deleteProduct = (id: string) => {
    console.log(id);
  };

  const table = useMantineReactTable({
    columns,
    data: sellers,
    renderTopToolbarCustomActions: () => (
      <CreateSellerModal onCloseModal={getProducts} kpp={kpp} />
    ),
    renderRowActions: ({
      row: {
        original: { id },
      },
    }) => (
      <Tooltip label="Открепить продавца">
        <ActionIcon
          variant="transparent"
          color="red"
          onClick={() => deleteProduct(id)}
        >
          <IconUnlink />
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
      title={`г. ${city} ул. ${street} д. ${house}(${kpp})`}
      size="xl"
    >
      <MantineReactTable table={table} />
    </Drawer>
  );
};
