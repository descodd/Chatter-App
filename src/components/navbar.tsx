import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Container,
} from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCode,
  IconBook,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: "#fff",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: 1000000,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  head: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    border: "none",
    background: "none",
  },

  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: "bold",
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("md")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },
  logo_text: {
    width: rem(150),
    height: rem(28),
    objectFit: "contain",
  },
  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  control: {
    color: "#fff",
    background: theme.colors.chatter[0],
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: rem(120),
    height: rem(42),
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: theme.colors.chatter[0],
    },
  },
  control2: {
    border: `1px solid ${theme.colors.chatter[0]}`,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    background: "none",
    width: rem(120),
    height: rem(42),
    borderRadius: theme.radius.md,
  },
}));

export default function Navbar({ user }: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container size={1200}>
        <Header height={70} className={classes.head}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Link href="/">
              <Text size="lg" fw={500}>
                Chatter
              </Text>
            </Link>

            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Link href="/" className={classes.link}>
                Home
              </Link>

              <Link href="#" className={classes.link}>
                About us
              </Link>

              <Link href="/contact" className={classes.link}>
                Contact
              </Link>

              <Link href="/dashboard" className={classes.link}>
                Blog
              </Link>
            </Group>
            {user ? (
              <img
                src={user?.photoUrl}
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <Group className={classes.hiddenMobile}>
                <Link href="/auth/login" className={classes.link}>
                  <Button
                    className={classes.control2}
                    variant="default"
                    fw="bold"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className={classes.control} fw="bold">
                    Sign up
                  </Button>
                </Link>
              </Group>
            )}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Header>
      </Container>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <>
            <Text size="lg" fw={500}>
              Chatter
            </Text>
          </>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Link href="/">
            <span className={classes.link}>Home</span>
          </Link>
          <Link href="/">
            <span className={classes.link}>About Us</span>
          </Link>

          <Link href="/">
            <span className={classes.link}>Contact</span>
          </Link>

          <Link href="/dashboard">
            <span className={classes.link}>Blog</span>
          </Link>

          <Group position="center" grow pb="xl" px="md">
            <Link href="/auth/login">
              <Button className={classes.control2} variant="default">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className={classes.control}>Get Started</Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
