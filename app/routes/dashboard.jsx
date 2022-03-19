import { Link, Outlet, json, useLoaderData } from "remix";
import {
  AppShell,
  Navbar,
  Header,
  Menu,
  Group,
  Text,
  Title,
} from "@mantine/core";
import DashboardLinks from "~/components/DashboardLinks";
import BrandLInk from "~/components/BrandLInk";
import UserButton from "~/components/UserButton";
import { supabaseStrategy } from "~/utils/auth.server";
import { authenticator } from "~/utils/auth.server";
import { getSession } from "~/utils/sessions.server";
import { getUser } from "~/utils/utilityFunctions.server";

export const loader = async ({ request }) => {
  const data = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/",
  });
  const session = await getSession(request.headers.get("Cookie"));
  const user = await getUser(request, data);
  const error = session.get(authenticator.sessionErrorKey);

  return json({ error, user });
};

export default function DashBoard() {
  const { user } = useLoaderData();
  return (
    <AppShell
      fixed
      padding="md"
      navbar={
        <Navbar
          fixed
          position={{ top: 0, left: 0 }}
          width={{ base: 250 }}
          padding="xs"
        >
          <Navbar.Section grow mt="lg">
            <DashboardLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          className="flex justify-between items-center"
          height={70}
          padding="md"
        >
          <BrandLInk />
          <Group position="right" spacing="xl" mr={96}>
            <Link to="/blog">
              <Text size="md" weight="bold">
                The Blog
              </Text>
            </Link>
            <Group position="center">
              <Menu
                gutter={0}
                placement="center"
                control={<UserButton user={user} />}
              >
                <Menu.Item component={Link} to="/dashboard">
                  Dashboard
                </Menu.Item>
                <Menu.Item>Sign Out</Menu.Item>
              </Menu>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Title order={1}>Hi there, {user.name ?? "stranger"}</Title>;
      <Outlet />
    </AppShell>
  );
}
