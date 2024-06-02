import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SellersDrawerProps } from "./SellersDrawer.types";
import { ActionIcon, Drawer, Tooltip } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { User } from "../../../../types";
import { Api } from "../../../../api";
import { CreateSellerModal } from "./parts";
import { IconUnlink } from "@tabler/icons-react";

export const SellersDrawer: FC<SellersDrawerProps> = ({
  openedDrawer,
  closeDrawer,
  branch: { city, street, house, kpp },
}) => {
  const [sellers, setSellers] = useState<User[]>([]);
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Имя",
        accessorFn: ({ firstName, surname, lastName }) =>
          `${surname} ${firstName} ${lastName}`,
      },
      { header: "Логин", accessorKey: "username" },
    ],
    [],
  );

  const getSellers = useCallback(() => {
    Api.get<User[]>(`/branch/${kpp}/sellers`).then(({ data }) => {
      setSellers(data);
    });
  }, [kpp]);

  useEffect(() => {
    if (openedDrawer) {
      getSellers();
    }
    return () => {
      setSellers([]);
    };
  }, [openedDrawer, kpp]);

  const detachSeller = (username: string) => {
    Api.post(`/branch/${kpp}/sellers/${username}/detach`).then(getSellers);
  };

  const table = useMantineReactTable({
    columns,
    data: sellers,
    renderTopToolbarCustomActions: () => (
      <CreateSellerModal onCloseModal={getSellers} kpp={kpp} />
    ),
    renderRowActions: ({
      row: {
        original: { username },
      },
    }) => (
      <Tooltip label="Открепить продавца">
        <ActionIcon
          variant="transparent"
          color="red"
          onClick={() => detachSeller(username)}
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
