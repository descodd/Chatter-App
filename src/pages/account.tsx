import React, { useState, useRef, useEffect, use } from "react";
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
  UnstyledButton,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useRouter } from "next/router";
import { IconCamera } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { storage, db, auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GetServerSideProps } from "next";

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

function Account({ user }: any) {
  const currentUser = user;
  const { classes, theme } = useStyles();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    fetchUserData();
  }, []);

  // initial values for the form
  useEffect(() => {
    //    update the bio and occupation fields
    form.setValues({
      userPhoto: currentUser?.photoURL || userData?.userPhoto,
      user: userData?.displayName,
      email: userData?.email,
      bio: userData?.bio,
      occupation: userData?.occupation,
    });
  }, [userData]);

  const accountValues = {
    userPhoto: currentUser?.photoURL || userData?.userPhoto,
    user: currentUser?.displayName,
    email: currentUser?.email,
    occupation: userData?.occupation,
    bio: userData?.bio,
  };

  // fetch user data from firestore
  const fetchUserData = async () => {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("email", "==", currentUser.email));
    const userSnapshot = await getDocs(userQuery);
    userSnapshot.forEach((doc) => {
      setUserData({ ...doc.data() });
    });
    console.log(userData);
  };

  const form = useForm({
    initialValues: accountValues,
  });

  const handleAccountSubmit = async () => {
    setVisible(true);
    const { values } = form;
    const { user, userPhoto, ...rest } = values;

    try {
      if (image) {
        console.log("image", image);
        // creating a unique name for the image
        const date = new Date().getTime();
        const storageRef = ref(storage, `${user + date}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          // @ts-ignore comment
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(currentUser, {
                  photoURL: downloadURL,
                });
              }
            );
          }
        );
      }

      // update user display name
      await updateProfile(currentUser, {
        displayName: user,
      });
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        // userRef: currentUser.uid,
        user,
        userPhoto,
        ...rest,
      });
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
        <Card shadow="none" withBorder padding="xl" radius="md">
          <Flex justify="space-between">
            <Text size="xl" weight={500}>
              Account Settings
            </Text>
          </Flex>

          {/* profile image */}
          <Flex mt={20} direction="column" align="center" justify="flex-start">
            <Text size="sm" weight={500}>
              Profile Image
            </Text>
            <Box mt={10} w="100px" h="100px">
              <img
                src={form.values.userPhoto || "https://rb.gy/11l2d"}
                alt="profile image"
                style={{
                  borderRadius: "50%",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Flex direction="column" align="center" mt={10}>
              <FileButton onChange={setImage} accept="image/png,image/jpeg">
                {(props) => (
                  <UnstyledButton {...props}>
                    <IconCamera size={40} />
                  </UnstyledButton>
                )}
              </FileButton>
              {image && (
                <Text size="sm" align="center" mt="sm">
                  Picked file: {image?.name}
                </Text>
              )}
            </Flex>
          </Flex>

          <Box mt={20}>
            <Text size="sm" weight={400}>
              Full Name
            </Text>
            <TextInput
              size="md"
              mt={5}
              placeholder="Full Name"
              value={form.values.user}
              onChange={(event) =>
                form.setFieldValue("user", event.currentTarget.value)
              }
            />
          </Box>

          <Box mt={20}>
            <Text size="sm" weight={400}>
              Email
            </Text>
            <TextInput
              size="md"
              mt={5}
              placeholder="Email"
              value={form.values.email}
              disabled
            />
          </Box>

          <Box mt={20}>
            <Text size="sm" weight={400}>
              Occupation
            </Text>
            <TextInput
              size="md"
              mt={5}
              placeholder="Occupation"
              value={form.values.occupation}
              onChange={(event) =>
                form.setFieldValue("occupation", event.currentTarget.value)
              }
            />
          </Box>

          <Box mt={20}>
            <Text size="sm" weight={400}>
              Bio
            </Text>
            <TextInput
              size="md"
              mt={5}
              placeholder="Bio"
              value={form.values.bio}
              onChange={(event) =>
                form.setFieldValue("bio", event.currentTarget.value)
              }
            />
          </Box>

          <Flex align="flex-end" justify="flex-end" mt={20}>
            <Button variant="light" color="blue" onClick={handleAccountSubmit}>
              Save Changes
            </Button>
          </Flex>
        </Card>
      </Container>
    </Fragment>
  );
}

export default withLayout(Account, "Account Settings");
