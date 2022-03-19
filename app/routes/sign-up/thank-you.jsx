import { Paper, Text, Group, Title } from "@mantine/core";
import { GiPartyPopper } from "react-icons/gi";
export function Screen() {
  return (
    <Paper
      withBorder
      p="lg"
      radius="md"
      shadow="xs"
      className=" bg-emerald-100 p-6   max-w-xl sm:mx-auto mt-32 mx-[5%] "
    >
      <Group position="center" mb="xs" className=" items-center  ">
        <Title order={2} className=" text-dark-6">
          Thanks for signing up!!
        </Title>
        <GiPartyPopper size={30} className=" text-dark-5 " />
      </Group>
      <Text size="md" weight={"bold"} className=" text-center  text-dark-5">
        {" "}
        A confirmation link has been sent to your mail. Please visit your mail
        to confirm your account.
      </Text>
    </Paper>
  );
}

export default Screen;
