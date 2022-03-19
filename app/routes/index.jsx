import { authenticator } from "~/utils/auth.server";
import HeaderAction from "~/components/Header";
import Hero from "~/components/Hero";
import data from "~/utils/seed.json";

import { useLoaderData, json } from "remix";

import { getUser } from "~/utils/utilityFunctions.server";

export const loader = async ({ request }) => {
  const data = await getUser(request);
  return json(data);
};

export const action = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
};

export default function Index() {
  const user = useLoaderData();

  const { links } = data;
  return (
    <>
      <HeaderAction links={links} user={user} />
      <Hero />
    </>
  );
}
