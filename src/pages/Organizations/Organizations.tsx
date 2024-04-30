import { Title } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Organization } from "../../types";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Api } from "../../api";
import { CreateOrganizationModal } from "./components";

export const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const columns = useMemo<MRT_ColumnDef<Organization>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Название", accessorKey: "name" },
      { header: "ИНН", accessorKey: "inn" },
      {
        header: "Директор",
        accessorFn: ({
          director: { firstName, lastName, surname, username },
        }) => `${firstName} ${surname} ${lastName} (${username})`,
      },
    ],
    [],
  );

  const getOrganizations = useCallback(() => {
    Api.get<Organization[]>("/admin/orgs").then(({ data }) => {
      setOrganizations(data);
    });
  }, []);

  useEffect(getOrganizations, []);

  const table = useMantineReactTable({
    columns,
    data: organizations,
    renderTopToolbarCustomActions: () => (
      <CreateOrganizationModal onCloseModal={getOrganizations} />
    ),
    initialState: { density: "xs" },
    enableDensityToggle: false,
    enableBottomToolbar: false,
  });

  return (
    <>
      <Title order={2} mb="md">
        Организации
      </Title>
      <MantineReactTable table={table} />
    </>
  );
};
