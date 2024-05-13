import { useEffect, useMemo, useState } from "react";
import { UploadSale, UploadSalesResponse } from "../../types";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Api } from "../../api";
import { Title } from "@mantine/core";

export const UploadedSales = () => {
  const [sales, setSales] = useState<UploadSale[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<MRT_ColumnDef<UploadSale>[]>(
    () => [
      { header: "Название", accessorKey: "productName" },
      { header: "Продавец", accessorKey: "sellerFio" },
      { header: "Кол-во", accessorKey: "amount" },
      { header: "Время обработки", accessorKey: "time" },
      { header: "Статус", accessorKey: "status" },
      { header: "Филиал", accessorKey: "branch.kpp" },
      { header: "Ошибка", accessorKey: "error" },
    ],
    [],
  );

  useEffect(() => {
    Api.get<UploadSalesResponse>(
      `/sale/clientSales?pageNumber=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
    ).then(({ data: { content, totalElements } }) => {
      setSales(content);
      setRowCount(totalElements);
    });
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useMantineReactTable({
    columns,
    data: sales,
    initialState: { density: "xs" },
    enableDensityToggle: false,
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount,
    state: {
      pagination,
    },
  });

  return (
    <>
      <Title order={2} mb="md">
        Загруженные продажи
      </Title>
      <MantineReactTable table={table} />
    </>
  );
};
