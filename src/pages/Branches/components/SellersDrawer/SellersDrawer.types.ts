import { Branch } from "../../../../types";

export type SellersDrawerProps = {
  openedDrawer: boolean;
  closeDrawer: () => void;
  branch: Branch;
};
