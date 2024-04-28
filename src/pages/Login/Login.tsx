import { Button, Center, Input, Paper, Title } from "@mantine/core";
import { IconUser, IconLock } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { encode } from "js-base64";
import { useUserSetter } from "../../contexts";

export const Login = () => {
  const userSetter = useUserSetter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const changeValue =
    (field: "login" | "password") =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      switch (field) {
        case "login":
          setLogin(value);
          break;
        case "password":
          setPassword(value);
          break;
      }
    };

  const setUser = () => {
    if (!userSetter) return;
    userSetter(encode(`${login}:${password}`));
  };

  return (
    <Center h="100vh">
      <Paper shadow="xs" p="xl" w={400}>
        <Title order={1} style={{ textAlign: "center" }}>
          Вход
        </Title>
        <Input
          placeholder="Введите логин"
          required
          mt="md"
          leftSection={<IconUser size={14} />}
          variant="default"
          value={login}
          onChange={changeValue("login")}
        />
        <Input
          placeholder="Введите пароль"
          required
          mt="md"
          leftSection={<IconLock size={14} />}
          variant="default"
          value={password}
          onChange={changeValue("password")}
        />
        <Button variant="light" mt="xl" fullWidth onClick={setUser}>
          Войти
        </Button>
      </Paper>
    </Center>
  );
};
