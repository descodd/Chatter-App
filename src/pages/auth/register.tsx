import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  rem,
  Grid,
  Center,
  Group,
  Divider,
  ButtonProps,
  LoadingOverlay,
  Box,
  Image,
  Tabs,
  Alert,
  Flex,
  Overlay,
  Container,
  Select,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import HeadMeta from "@/components/head";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const registerValue = {
  firstName: "",
  lastName: "",
  joinAs: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
  },

  logoContainer: {
    padding: "0px 50px",
    height: rem(50),
    display: "flex",
    alignItems: "center",

    [theme.fn.smallerThan("lg")]: {
      padding: "0px 15px",
    },
  },

  form: {
    padding: "0 15px",
    maxWidth: rem(600),
    paddingTop: rem(10),
    [theme.fn.smallerThan("md")]: {
      maxWidth: rem(600),
    },
    [theme.fn.smallerThan("sm")]: {
      maxWidth: rem(500),
    },
    [theme.fn.smallerThan("xs")]: {
      maxWidth: rem(300),
    },
  },

  innerForm: {
    width: "500px",
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  description: {
    maxWidth: rem(600),
  },

  side: {
    minHeight: "100vh",
    paddingTop: rem(100),
    paddingLeft: rem(65),
    background: theme.colors.chatter[4],
    display: "flex",
    flexDirection: "column",
  },

  imageContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage: "url(https://bit.ly/3O5gl5P)",
    backgroundColor: "gray",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },

  hidden: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  textStyle: {
    zIndex: 2,
    flexDirection: "column",
  },

  tabStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  tabWidth: {
    width: rem(200),

    [theme.fn.smallerThan("md")]: {
      width: rem(150),
    },
    [theme.fn.smallerThan("sm")]: {
      width: rem(100),
    },
  },

  btnStyle: {
    background: theme.colors.chatter[0],

    "&:hover": {
      backgroundColor: theme.colors.chatter[0],
    },
  },
}));

export default function Register() {
  const { classes } = useStyles();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: registerValue,
  });

  const handleSubmit = async () => {
    setVisible(true);

    const { values } = form;
    const { firstName, lastName, joinAs, email, password, confirmPassword } =
      values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const currentUser = auth.currentUser;

      if (currentUser) {
        updateProfile(currentUser, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      const formData = {
        fullname: `${firstName} ${lastName}`,
        joinAs,
        email,
        timestamp: serverTimestamp(),
      };

      const formDataCopy = { ...formData };

      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      router.push("/dashboard");
    } catch (error: any) {
      if (error) {
        const errorCode = error?.code.replace("/", "");
        console.log(errorCode);
        switch (errorCode) {
          case "authuser-not-found":
            setError("The email address is not valid");
            break;

          case "authinvalid-email3":
            setError(
              "The user corresponding to the given email does not exist"
            );
            break;
          case "authwrong-password":
            setError("The password is invalid for the given email");
            break;
          default:
            setError("Something went wrong while processing your request");
            break;
        }
      }
    } finally {
      setVisible(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <HeadMeta pageName="Register" />
      <Grid>
        <Grid.Col className={classes.hidden} sm={12} md={5}>
          <div className={classes.imageContainer}>
            <Overlay color="#000" opacity={0.59} zIndex={1} />

            <Flex align="center" justify="center" className={classes.textStyle}>
              <Text c="white" fz={40} fw="bolder" ta="center">
                CHATTER
              </Text>
              <Container w={500}>
                <Text c="white" ta="center">
                  Unleash the Power of Words, Connect with Like-minded Readers
                  and Writers
                </Text>
              </Container>
            </Flex>
          </div>
        </Grid.Col>

        <Grid.Col sm={12} md={7}>
          <Tabs
            color="green"
            defaultValue="register"
            onTabChange={(value) => router.push(`/auth/${value}`)}
            className={classes.tabStyle}
            my={40}
          >
            <Tabs.List>
              <Tabs.Tab value="login" className={classes.tabWidth}>
                Login
              </Tabs.Tab>
              <Tabs.Tab value="register" className={classes.tabWidth}>
                Register
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="login">
              <></>
            </Tabs.Panel>

            <Tabs.Panel value="register">
              <Center mx="auto">
                <Paper className={classes.form} radius={0}>
                  <Box className={classes.innerForm} pos="relative">
                    <LoadingOverlay visible={visible} overlayBlur={2} />
                    <Title
                      order={3}
                      className={classes.title}
                      mt={20}
                      mb={30}
                      ta="center"
                    >
                      Register as a Writer/Reader
                    </Title>

                    {error && (
                      <Alert
                        icon={<IconAlertCircle size="1rem" />}
                        title="An error occurred!"
                        color="red"
                        mb={30}
                        withCloseButton
                        closeButtonLabel="Close alert"
                        onClose={() => setError("")}
                      >
                        {error}
                      </Alert>
                    )}

                    <Flex align="center" justify="center" gap={10}>
                      <TextInput
                        placeholder="firstName"
                        w="100%"
                        mb="md"
                        size="md"
                        withAsterisk
                        label="FirstName"
                        value={form.values.firstName}
                        onChange={(event) =>
                          form.setFieldValue(
                            "firstName",
                            event.currentTarget.value
                          )
                        }
                        error={form.errors.firstName && form.errors.firstName}
                      />
                      <TextInput
                        placeholder="lastName"
                        w="100%"
                        mb="md"
                        size="md"
                        withAsterisk
                        label="LastName"
                        value={form.values.lastName}
                        onChange={(event) =>
                          form.setFieldValue(
                            "lastName",
                            event.currentTarget.value
                          )
                        }
                        error={form.errors.lastName && form.errors.lastName}
                      />
                    </Flex>

                    <Select
                      label="Your favorite framework/library"
                      w="100%"
                      mb="md"
                      size="md"
                      placeholder="Pick one"
                      searchable
                      onSearchChange={(event) =>
                        form.setFieldValue("joinAs", event)
                      }
                      searchValue={form.values.joinAs}
                      nothingFound="No options"
                      data={["Reader", "Writer"]}
                    />

                    <TextInput
                      placeholder="Email"
                      mb="md"
                      size="md"
                      withAsterisk
                      label="Email"
                      value={form.values.email}
                      onChange={(event) =>
                        form.setFieldValue("email", event.currentTarget.value)
                      }
                      error={form.errors.email && form.errors.email}
                    />

                    <PasswordInput
                      placeholder="password"
                      mb="md"
                      size="md"
                      withAsterisk
                      label="Password"
                      value={form.values.password}
                      onChange={(event) =>
                        form.setFieldValue(
                          "password",
                          event.currentTarget.value
                        )
                      }
                      error={form.errors.password && form.errors.password}
                    />

                    <PasswordInput
                      placeholder="confirm Password"
                      mb="md"
                      size="md"
                      withAsterisk
                      label="confirm Password"
                      value={form.values.confirmPassword}
                      onChange={(event) =>
                        form.setFieldValue(
                          "confirmPassword",
                          event.currentTarget.value
                        )
                      }
                      error={
                        form.errors.confirmPassword &&
                        form.errors.confirmPassword
                      }
                    />

                    <Button
                      fullWidth
                      mt="xl"
                      size="md"
                      onClick={handleSubmit}
                      className={classes.btnStyle}
                      radius="sm"
                    >
                      Create account
                    </Button>
                  </Box>
                </Paper>
              </Center>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </div>
  );
}
