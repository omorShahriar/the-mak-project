import { Group, UnstyledButton } from "@mantine/core";
import { NavLink } from "remix";
import { CgProfile } from "react-icons/cg";
import { BsFillFilePostFill } from "react-icons/bs";
const DashboardLinks = () => {
  const activeStyle = {
    backgroundColor: "#F1F3F5",
  };
  return (
    <Group direction="column" spacing="xl">
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/dashboard/profile"
        className=" block w-full"
      >
        <div className="flex p-2 items-center gap-3 text-xl">
          <CgProfile width={30} height={30} />
          Profile
        </div>
      </NavLink>
      <NavLink
        to="/dashboard/posts"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        className=" block w-full"
      >
        <div className="flex  p-2 items-center gap-3 text-xl">
          <BsFillFilePostFill width={30} height={30} />
          Posts
        </div>
      </NavLink>
    </Group>
  );
};

export default DashboardLinks;
