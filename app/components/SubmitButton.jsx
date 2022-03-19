import { Button } from "@mantine/core";
import { useTransition } from "remix";
function SubmitButton({ children, type }) {
  const transition = useTransition();
  const text =
    transition.state === "submitting" || transition.state === "loading"
      ? type === "sign-in"
        ? "Signing in"
        : "Signing up"
      : children;
  return (
    <Button
      className=" bg-dark-6  w-8/12 mx-auto "
      color="dark"
      size="md"
      type="submit"
      disabled={
        transition.state === "submitting" || transition.state === "loading"
      }
    >
      {text}
    </Button>
  );
}

export default SubmitButton;
