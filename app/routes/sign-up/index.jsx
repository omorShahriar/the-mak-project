import { Form, json, redirect, useLoaderData } from "remix";
import { Title, Button, TextInput, PasswordInput, Center } from "@mantine/core";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";

import { authenticator } from "~/utils/auth.server";

import { getSession, commitSession } from "~/utils/sessions.server";
import { prisma } from "~/utils/prismaClient.server";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const error = session.get(authenticator.sessionErrorKey);

  return json({ error });
};

export const action = async ({ request }) => {
  let user = await authenticator.authenticate("sb", request, {
    failureRedirect: "/sign-up",
  });
  console.log(user);
  const formBody = await request.formData();

  const name = await formBody?.get("name");
  const email = await formBody?.get("email");

  const userData = await prisma.user.create({
    data: { email, name, id: user.id },
  });

  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user);

  let headers = new Headers({ "Set-Cookie": await commitSession(session) });
  return redirect("/sign-up/thank-you", { headers });
};

export default function SignUp() {
  const { error } = useLoaderData();
  return (
    <div className="h-screen  grid grid-cols-2 relative">
      <div className="relative inset-0  bg-sign-up-image bg-cover bg-center"></div>
      <Center>
        <div className="p-4 max-w-fit mx-auto">
          <Title order={1} align="center">
            Register your account
          </Title>
          {error && error.message}
          <Form className="mt-8 flex flex-col gap-4" method="post">
            <TextInput
              placeholder="your name"
              label="Full name"
              size="md"
              radius="sm"
              name="name"
              required
            />
            <TextInput
              placeholder="your mail"
              label="Email address"
              size="md"
              radius="sm"
              name="email"
              required
            />
            <input type="hidden" name="type" value="registration" />
            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              radius="sm"
              size="md"
              name="password"
              required
            />
            <PasswordInput
              placeholder="confirm your password"
              label="Confirm Password"
              radius="sm"
              size="md"
              required
            />
            <Button
              className=" bg-dark-6  w-8/12 mx-auto "
              color="dark"
              size="md"
              type="submit"
            >
              Sign up
            </Button>
          </Form>
          <div className=" mt-12 flex flex-col gap-4 w-8/12 mx-auto ">
            <Button
              className="bg-dark-6"
              leftIcon={<FaGoogle width={24} height={24} />}
              color="dark"
              size="md"
            >
              Sign up with Google
            </Button>
            <Button
              className="bg-dark-6"
              leftIcon={<FaFacebookF width={24} height={24} />}
              color="dark"
              size="md"
            >
              Sign up with facebook
            </Button>

            <Button
              className="bg-dark-6 "
              leftIcon={<FaGithub width={24} height={24} />}
              color="dark"
              size="md"
            >
              Sign up with Github
            </Button>
          </div>
        </div>
      </Center>
    </div>
  );
}
