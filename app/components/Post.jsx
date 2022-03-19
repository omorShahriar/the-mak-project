import { Paper, Text } from "@mantine/core";
const Post = ({ id }) => {
  return (
    <Paper padding="md" shadow="xs" radius="md" className="m-4 ml-0 w-1/2">
      <Text size="lg">{`Post ${id}`}</Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, nam!
        Perferendis ad ipsum reiciendis ex sed voluptas omnis veniam.
        Exercitationem voluptate omnis consectetur ratione optio provident
        doloremque, explicabo quae autem.
      </Text>
    </Paper>
  );
};

export default Post;
