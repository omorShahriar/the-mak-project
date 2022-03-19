import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Avatar,
} from "@mantine/core";
import { Link, Form } from "remix";
import { useBooleanToggle } from "@mantine/hooks";
import { avatarNameGenerator } from "~/utils/utilityfunctions";
const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 700,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  itemBody: {
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: theme.spacing.md,
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },
  linkLabel: {
    marginRight: 5,
  },
  body: {
    display: "flex",
  },
}));

export default function HeaderAction({ links, user }) {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                ...
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0 }}
      className="bg-white dark:bg-dark-8"
    >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <img src="/brand-logo.svg" alt="brand logo" />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {user ? (
          <Menu
            trigger="click"
            delay={0}
            transitionDuration={100}
            placement="center"
            gutter={5}
            shadow="xs"
            size="md"
            control={
              <button onClick={(event) => event.preventDefault()}>
                <Center>
                  <Avatar size="lg" radius="md" color="green">
                    {avatarNameGenerator(user.name)}
                  </Avatar>
                </Center>
              </button>
            }
          >
            <Menu.Item
              component={Link}
              to="/dashboard"
              className={classes.itemBody}
              size="lg"
            >
              Dashboard
            </Menu.Item>

            <Form method="post">
              <Button
                radius="sm"
                size="sm"
                className=" bg-dark-6  min-w-full"
                color="dark"
                type="submit"
              >
                Sign out
              </Button>
            </Form>
          </Menu>
        ) : (
          <Button
            component={Link}
            to="/sign-in"
            radius="sm"
            size="md"
            className=" bg-dark-6 "
            color="dark"
          >
            Sign in
          </Button>
        )}
      </Container>
    </Header>
  );
}
