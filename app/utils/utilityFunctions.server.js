import { supabaseStrategy } from "~/utils/auth.server";
import { prisma } from "~/utils/prismaClient.server";

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
