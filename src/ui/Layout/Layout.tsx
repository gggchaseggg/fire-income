import {
  AppShell,
  Group,
  Avatar,
  NavLink,
  Burger,
  Button,
  Menu,
} from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconUsersGroup,
  IconList,
  IconAffiliate,
  IconLogout,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { PATHS } from "../../routers";
import { useDisclosure } from "@mantine/hooks";
import { useUser, useUserSetter } from "../../contexts";

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const user = useUser();
  const userSetter = useUserSetter();

  const logout = () => {
    if (userSetter) userSetter(null);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link to={PATHS.MAIN} style={{ textDecoration: "none" }}>
            <Avatar color="blue">FI</Avatar>
          </Link>
          {user ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button>{user.firstName}</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconLogout />} onClick={logout}>
                  Выйти
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link to={PATHS.LOGIN} style={{ textDecoration: "none" }}>
              <Button variant="light">Войти</Button>
            </Link>
          )}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink
          to={PATHS.ORGANIZATIONS}
          label="Организации"
          leftSection={<IconBuildingSkyscraper size="1rem" stroke={1.5} />}
          component={Link}
        />
        <NavLink
          to={PATHS.STAFF}
          label="Персонал"
          leftSection={<IconUsersGroup size="1rem" stroke={1.5} />}
          component={Link}
        />
        <NavLink
          to={PATHS.CATEGORIES}
          label="Категории"
          leftSection={<IconList size="1rem" stroke={1.5} />}
          component={Link}
        />

        <NavLink
          to={PATHS.BRANCHES}
          label="Филиалы"
          leftSection={<IconAffiliate size="1rem" stroke={1.5} />}
          component={Link}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
