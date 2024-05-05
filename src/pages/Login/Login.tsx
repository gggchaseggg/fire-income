import { Button, Center, Input, Paper, Title } from "@mantine/core";
import { IconUser, IconLock } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { useUserSetter } from "../../contexts";
import { Api } from "../../api";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routers";

export const Login = () => {
  const userSetter = useUserSetter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const changeValue =
    (field: "login" | "password") =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setError(false);
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
    setLoading(true);
    Api.setTokenAndUser(login, password)
      .then(({ data }) => {
        userSetter(data);
        console.log(data);
        navigate(PATHS.MAIN);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
          error={error}
        />
        <Input
          placeholder="Введите пароль"
          required
          mt="md"
          leftSection={<IconLock size={14} />}
          variant="default"
          value={password}
          onChange={changeValue("password")}
          error={error}
        />
        <Button
          variant="light"
          mt="xl"
          fullWidth
          onClick={setUser}
          loading={loading}
        >
          Войти
        </Button>
      </Paper>
    </Center>
  );
};
