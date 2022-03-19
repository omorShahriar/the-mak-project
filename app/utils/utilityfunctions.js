import { json } from "remix";
import { supabaseStrategy } from "~/utils/auth.server";
import { prisma } from "~/utils/prismaClient.server";

export const avatarNameGenerator = (name = "X O") => {
  const nameArray = name.split(" ");
  const firstTwoCharacters = nameArray
    .map((word) => word[0])
    .filter((_, i) => i < 2);
  const placeholder = firstTwoCharacters.join("").toUpperCase();
  return placeholder;
};

export const getUser = async (request, isAuthenticated = false) => {
  if (isAuthenticated) {
    const profileData = await prisma.user.findUnique({
      where: { id: isAuthenticated.user.id },
    });
    const user =
      { name: profileData?.name ?? "X O", id: isAuthenticated.user.id } || null;
    return user;
  } else {
    const data = await supabaseStrategy.checkSession(request);
    if (data) {
      const profileData = await prisma.user.findUnique({
        where: { id: data.user.id },
      });
      const user =
        { name: profileData?.name ?? "X O", id: data.user.id } || null;
      return user;
    }
  }

  return null;
};
