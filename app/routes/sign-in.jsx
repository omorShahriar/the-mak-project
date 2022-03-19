import { Form, Link, json, useLoaderData, redirect } from "remix";
import { commitSession, getSession } from "~/utils/sessions.server";
import { authenticator, supabaseStrategy } from "~/utils/auth.server";
import {
  Text,
  Anchor,
  Title,
  Button,
  TextInput,
  PasswordInput,
  Center,
} from "@mantine/core";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";

export const loader = async ({ request }) => {
  await supabaseStrategy.checkSession(request, {
    successRedirect: "/dashboard",
  });
  const session = await getSession(request.headers.get("Cookie"));

  const error = session.get(authenticator.sessionErrorKey);

  let headers = new Headers({ "Set-Cookie": await commitSession(session) });

  return json({ error }, { headers });
};

export const action = async ({ request }) => {
  const user = await authenticator.authenticate("sb", request, {
    failureRedirect: "/sign-in",
  });

  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user);
  let headers = new Headers({ "Set-Cookie": await commitSession(session) });
  return redirect("/", { headers });
};

export default function Index() {
  const { error } = useLoaderData();

  return (
    <div className="h-screen  grid grid-cols-2 relative">
      <div className="relative inset-0  bg-sign-in-image bg-cover bg-center"></div>
      <Center>
        <div className="p-4 max-w-fit mx-auto">
          <Title order={1} align="center">
            Log in to your account
          </Title>
          {error && <Text size="xs">{error.message}</Text>}

          <Form className="mt-8 flex flex-col gap-4" method="post">
            <TextInput
              placeholder="your mail"
              label="Email address"
              size="md"
              radius="sm"
              name="email"
              required
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              radius="sm"
              size="md"
              name="password"
              required
            />
            <input type="hidden" name="type" value="login" />
            <Button
              className=" bg-dark-6  w-8/12 mx-auto "
              color="dark"
              size="md"
              type="submit"
            >
              Sign in
            </Button>
          </Form>
          <div className=" mt-12 flex flex-col gap-4 w-8/12 mx-auto ">
            <Button
              className="bg-dark-6"
              leftIcon={<FaGoogle width={24} height={24} />}
              color="dark"
              size="md"
            >
              Sign in with Google
            </Button>
            <Button
              className="bg-dark-6"
              leftIcon={<FaFacebookF width={24} height={24} />}
              color="dark"
              size="md"
            >
              Sign in with facebook
            </Button>

            <Button
              className="bg-dark-6 "
              leftIcon={<FaGithub width={24} height={24} />}
              color="dark"
              size="md"
            >
              Sign in with Github
            </Button>
          </div>
          <Text size="md" align="center" mt={16}>
            Don't have an account?{" "}
            <Anchor component={Link} to="/sign-up">
              Sign up
            </Anchor>{" "}
            with us{" "}
          </Text>
        </div>
      </Center>
    </div>
  );
}
