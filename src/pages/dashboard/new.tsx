import React, { useState, useRef, useEffect } from "react";
import { Fragment } from "react";
import withLayout from "@/layouts/dasLayout";
import HeadMeta from "@/components/head";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  SimpleGrid,
  FileButton,
  AspectRatio,
  Tabs,
  Text,
  TextInput,
  createStyles,
  rem,
  Group,
  MultiSelect,
  Select,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useRouter } from "next/router";
import { IconCamera } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../firebase";

const useStyles = createStyles((theme) => ({
  control: {
    color: "#fff",
    background: theme.colors.chatter[0],
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: rem(120),
    height: rem(46),
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: theme.colors.chatter[0],
    },
  },

  titleStyle: {
    marginTop: rem(20),
  },

  imageStyle: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },

  textRich: {
    border: "none",
  },
}));

export const blogValues = {
  title: "",
  body: "",
  tags: "",
};

function NewBlog({ user }: any) {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write a post..." }),
    ],
    onUpdate({ editor }) {
      form.setFieldValue("body", editor.getHTML());
    },
  });
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const form = useForm({
    initialValues: blogValues,
  });

  useEffect(() => {
    if (image !== null) {
      form.setFieldValue("image", image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const clearFile = () => {
    setImage(null);
    resetRef.current?.();
  };

  const handleSubmit = async () => {
    console.log(form.values);
    // return;
    setVisible(true);

    try {
      const storeImage = async (image: any) => {
        return new Promise((resolve, reject) => {
          const fileName = `${user.uid}-${image.title}-${new Date().getTime()}`;

          const storageRef = ref(storage, "blogs-images/" + fileName);

          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("upload is pause");
                  break;
                case "running":
                  console.log("upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const imageUrls = await storeImage(image);

      // Saving formDataCopy to the firebase database
      const docRef = await addDoc(collection(db, "blogs"), {
        user: user?.displayName,
        userId: user?.uid,
        title: form.values.title,
        body: form.values.body,
        tags: form.values.tags,
        image: imageUrls,
        likes: 0,
        views: 0,
        createdAt: serverTimestamp(),
        avatar: user?.photoURL,
      });

      router.push(`/dashboard/${docRef.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };

  return (
    <Fragment>
      <HeadMeta pageName="Create New Blog" />
      <Container fluid>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Box mt={40} mb={20}>
          <Flex align="center" justify="space-between">
            <Box></Box>

            <Button onClick={handleSubmit} className={classes.control}>
              Publish
            </Button>
          </Flex>
          <Box mt={40}>
            <Flex align="center" gap={40} w="100%">
              {!image && (
                <Group position="center">
                  <FileButton onChange={setImage} accept="image/png,image/jpeg">
                    {(props) => (
                      <IconCamera size={48} strokeWidth={1} {...props}>
                        Upload image
                      </IconCamera>
                    )}
                  </FileButton>
                </Group>
              )}

              <Box w="100%">
                {image && (
                  <>
                    <AspectRatio ratio={1440 / 400}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="blog image"
                        className={classes.imageStyle}
                      />
                    </AspectRatio>
                    <Flex align="flex-end" justify="flex-end">
                      <Box
                        onClick={clearFile}
                        mt={5}
                        style={{ cursor: "pointer" }}
                      >
                        <Text fz="sm" c="red">
                          Remove image
                        </Text>
                      </Box>
                    </Flex>
                  </>
                )}

                <Select
                  data={[
                    "Programming",
                    "Data Science",
                    "Technology",
                    "Machine Learning",
                    "Politics",
                  ]}
                  variant="unstyled"
                  onSearchChange={(event) => form.setFieldValue("tags", event!)}
                  searchValue={form.values.tags}
                  placeholder="select tags"
                  searchable
                  nothingFound="Nothing found"
                />

                <TextInput
                  placeholder="Title"
                  size="xl"
                  variant="unstyled"
                  value={form.values.title}
                  onChange={(event) =>
                    form.setFieldValue("title", event.currentTarget.value)
                  }
                  fw="bolder"
                />
                <RichTextEditor
                  editor={editor}
                  sx={{ border: "none", backgroundColor: "#f8f9fa" }}
                >
                  <RichTextEditor.Content
                    className={classes.textRich}
                    sx={{ border: "none", backgroundColor: "#f8f9fa" }}
                  />
                </RichTextEditor>
                {/* <Textarea
                  placeholder="Write a post..."
                  size="xl"
                  variant="default"
                  minRows={2}
                  value={form.values.body}
                  onChange={(event) =>
                    form.setFieldValue("body", event.currentTarget.value)
                  }
                /> */}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}

export default withLayout(NewBlog, "Create-Blog");
