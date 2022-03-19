import { Link } from "remix";

const { Title, Text, Button, Divider } = require("@mantine/core");
import Post from "~/components/Post";
const Index = () => {
  return (
    <div className="flex min-h-full ">
      <div className=" grow ">
        <Title order={1}>List of published post</Title>
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9], (x, i) => (
          <Post id={x} key={i} />
        ))}
      </div>
      <Divider
        orientation="vertical"
        color="gray"
        className=" h-auto "
      ></Divider>
      <div className="px-4 mx-2  ">
        <Button
          component={Link}
          to="/dashboard/posts/create"
          color="dark"
          size="xl"
          className=" bg-dark-6 sticky top-20  "
        >
          Create new post!
        </Button>
      </div>
    </div>
  );
};
export default Index;
