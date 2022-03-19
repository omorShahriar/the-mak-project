import { forwardRef } from "react";

import { Group, Avatar, UnstyledButton } from "@mantine/core";
import { avatarNameGenerator } from "~/utils/utilityfunctions";

const UserButton = forwardRef(
  ({ image, name, email, icon, user, ...others }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
        })}
        {...others}
      >
        <Group>
          <Avatar radius="md" size="lg" color="dark">
            {avatarNameGenerator(user.name)}
          </Avatar>
        </Group>
      </UnstyledButton>
    );
  }
);

export default UserButton;
