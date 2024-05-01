import { ActionIcon, Title, Tooltip, Text } from "@mantine/core";
import { User } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Api } from "../../api";
import { CreateSupervisorModal } from "./components";
import { IconUnlink } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export const Supervisors = () => {
  const [supervisors, setSupervisors] = useState<User[]>([]);
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Фамилия", accessorKey: "surname" },
      { header: "Имя", accessorKey: "firstName" },
      { header: "Отчество", accessorKey: "lastName" },
      { header: "Логин", accessorKey: "username" },
    ],
    [],
  );

  const getSupervisors = useCallback(() => {
    Api.get<User[]>("/chief/supervisors").then(({ data }) => {
      setSupervisors(data);
    });
  }, []);

  useEffect(getSupervisors, []);

  const deleteSupervisorConfirmation = (username: string) => {
    modals.openConfirmModal({
      title: `Удаление супервизора`,
      children: (
        <Text>
          Вы уверены, что хотите удалить супервизора{" "}
          <Text component="span" size="sm" ff="monospace">
            {username}
          </Text>{" "}
        </Text>
      ),
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        Api.delete(`/chief/supervisors/${username}`);
        getSupervisors();
      },
    });
  };

  const table = useMantineReactTable({
    columns,
    data: supervisors,
    renderTopToolbarCustomActions: () => (
      <CreateSupervisorModal onCloseModal={getSupervisors} />
    ),
    renderRowActions: ({
      row: {
        original: { username },
      },
    }) => (
      <Tooltip label="Удалить супервайзера">
        <ActionIcon
          variant="transparent"
          color="red"
          radius="xl"
          onClick={() => deleteSupervisorConfirmation(username)}
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
    <>
      <Title order={2} mb="md">
        Персонал
      </Title>
      <MantineReactTable table={table} />
    </>
  );
};
