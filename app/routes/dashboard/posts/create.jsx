import { useState } from "react";
import {
  Button,
  TextInput,
  Title,
  InputWrapper,
  Input,
  Skeleton,
} from "@mantine/core";
import { Form } from "remix";

import { ClientOnly } from "remix-utils";
import RichTextEditorShell from "~/components/RichTextEditorShell.client";

const handleImageUpload = (file) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", file);

    fetch(
      "https://api.imgbb.com/1/upload?key=2fc00d5713a685276fbdd1d2ed296779",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => resolve(result.data.url))
      .catch(() => reject(new Error("Upload failed")));
  });
export default function Create() {
  const [value, onChange] = useState("");
  return (
    <div className=" w-8/12 mx-auto">
      <Title order={1} mb={24} align="center">
        Create new post
      </Title>
      <Form method="post" className="flex flex-col gap-4">
        <TextInput
          label="Title of your post"
          placeholder="title"
          name="title"
        />
        <InputWrapper label="Content">
          <Input type="hidden" value={value} name="content" />
          <ClientOnly fallback={<Skeleton height={112.7} />}>
            {() => (
              <RichTextEditorShell
                value={value}
                onChange={onChange}
                onImageUpload={handleImageUpload}
              />
            )}
          </ClientOnly>
        </InputWrapper>
        <Button className=" bg-dark-6 max-w-fit mx-auto " color="dark">
          Publish
        </Button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return <> {JSON.stringify(error, null, 2)}</>;
}
