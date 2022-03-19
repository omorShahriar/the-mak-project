import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import { Link } from "remix";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  githubControl: {
    borderWidth: 2,
    borderColor:
      theme.colorScheme === "dark" ? "transparent" : theme.colors.dark[9],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : "transparent",
  },
}));

export default function Hero() {
  const { classes, cx } = useStyles();

  return (
    <div className="relative bg-white dark:bg-dark-8">
      <Container size={900} className={classes.inner}>
        <h1 className={`${classes.title} text-black dark:text-white `}>
          An
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
            className=" px-4 "
          >
            open blog
          </Text>
          for sharing thoughts
        </h1>

        <Text className={classes.description} color="dimmed">
          Learn and teach others. Share cool ideas. Or just roam
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            to="sign-up"
            size="xl"
            className={`${classes.control} bg-dark-6 `}
            color="dark"
          >
            Join now
          </Button>

          <Button
            component={Link}
            to="/blog"
            size="xl"
            variant="outline"
            className={`${cx(
              classes.control,
              classes.githubControl
            )} text-black dark:text-gray-300 transition-all duration-300 border-dark-9 dark:border-transparent bg-transparent dark:bg-dark-6 hover:dark:bg-dark-7`}
          >
            Blog
          </Button>
        </Group>
      </Container>
    </div>
  );
}
