import { ActionIcon, Title, Tooltip } from "@mantine/core";
import { Branch, Nullable } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Api } from "../../api";
import { CreateBranchModal, SellersDrawer } from "./components";
import { IconUsersGroup, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branch, setBranch] = useState<Nullable<Branch>>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const columns = useMemo<MRT_ColumnDef<Branch>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "КПП", accessorKey: "kpp" },
      {
        header: "Адрес",
        accessorFn: ({ city, street, house }) =>
          `г. ${city} ул. ${street} д. ${house}`,
      },
    ],
    [],
  );

  const getCategories = useCallback(() => {
    Api.get<Branch[]>("/branch/all").then(({ data }) => {
      setBranches(data);
    });
  }, []);

  useEffect(getCategories, []);

  const openDrawer = (branch: Branch) => {
    setBranch(branch);
    open();
  };

  const deleteBranch = (kpp: string) => {
    Api.delete(`/chief/branches/${kpp}`);
  };

  const table = useMantineReactTable({
    columns,
    data: branches,
    renderTopToolbarCustomActions: () => (
      <CreateBranchModal onCloseModal={getCategories} />
    ),
    renderRowActions: ({ row: { original } }) => (
      <>
        <Tooltip label="Посмотреть продавцов">
          <ActionIcon
            variant="transparent"
            onClick={() => openDrawer(original)}
          >
            <IconUsersGroup />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Удалить филиал">
          <ActionIcon
            variant="transparent"
            onClick={() => deleteBranch(original.kpp)}
            color="red"
            ml="sm"
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </>
    ),
    enableEditing: true,
    initialState: { density: "xs" },
    enableDensityToggle: false,
    enableBottomToolbar: false,
    positionActionsColumn: "last",
    localization: { actions: "" },
  });

  return (
    <>
      <Title order={2} mb="md">
        Филиалы
      </Title>
      <MantineReactTable table={table} />
      {branch && (
        <SellersDrawer
          openedDrawer={opened}
          closeDrawer={close}
          branch={branch}
        />
      )}
    </>
  );
};
