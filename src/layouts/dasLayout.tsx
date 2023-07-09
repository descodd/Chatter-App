import { ComponentType, ReactNode, useEffect } from "react";

import { useState } from "react";
import {
  AppShell,
  Navbar,
  Text,
  useMantineTheme,
  createStyles,
  LoadingOverlay,
  Center,
  Box,
} from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";
import HeaderComponent from "@/components/dashboard/header";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import HeadMeta from "@/components/dashboard/head";
import { NavbarSearch } from "@/components/dashboard/sidebar";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  user: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colors.chatter[4],
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

const withLayout = (Component: ComponentType, pageName: string = "") => {
  function ApplicationShell(props: any) {
    const theme = useMantineTheme();
    const { classes, cx } = useStyles();

    const [opened, setOpened] = useState(false);
    const [query, setQuery] = useState("");

    const [visible, { toggle }] = useDisclosure(false);

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user as any);
        } else {
          router.push("/auth/login");
        }
      });

      return unsubscribe;
    }, [router]);
    if (!user)
      return (
        <Box bg="#fff" h="100vh" w="100%">
          <Box pos="absolute" top="50%" left="50%" ta="center">
            <Text size="xl" fw={900} c="#543EE0">
              Chatter Blog
            </Text>
          </Box>
        </Box>
      );
    return (
      <>
        <HeadMeta pageName={pageName} />
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={<NavbarSearch opened={opened} setOpened={setOpened} />}
          header={
            <HeaderComponent
              toggleOverlay={toggle}
              opened={opened}
              setOpened={setOpened}
              user={user}
            />
          }
        >
          <Component {...props} user={user} />
        </AppShell>
      </>
    );
  }

  return ApplicationShell;
};

export default withLayout;
