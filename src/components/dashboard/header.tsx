import { useState } from "react";
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  Image,
  useMantineTheme,
  Group,
  Avatar,
  rem,
  Flex,
  Menu,
  UnstyledButton,
  createStyles,
  Indicator,
  Kbd,
  TextInput,
  Container,
} from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import Link from "next/link";
import Logo from "@/assets/images/logo-text.png";
import {
  IconChevronDown,
  IconLogout,
  IconMaximize,
  IconPlayerPause,
  IconSearch,
  IconUser,
  IconSettings,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import { RiNotification2Line } from "react-icons/ri";
import { colors } from "@/constants/theme";
import { useFullscreen } from "@mantine/hooks";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const useStyles = createStyles((theme) => ({
  user: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userText: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
  },

  textkbdContainer: {
    flexGrow: 1,
    display: "flex",
    margin: "0 20px 0 0",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  searchbtn: {
    display: "none",

    [theme.fn.smallerThan("md")]: {
      display: "block",
    },
  },

  textkbd: {
    maxWidth: rem(400),
    width: "100%",
    margin: "0 auto",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      minWidth: "100%",
    },
  },

  bgHover: {},
}));

interface Props {
  toggleOverlay: () => void;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  user: any;
}

export default function HeaderComponent({
  toggleOverlay,
  opened,
  setOpened,
  user,
}: Props) {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const { toggle, fullscreen } = useFullscreen();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    let initials = "";
    names.forEach((n) => {
      initials += n[0];
    });
    return initials;
  };

  return (
    <Header height={{ base: 60, md: 60 }} p="xl">
      <div className={classes.wrapper}>
        <div style={{ width: 234 }}>
          <Flex align="center">
            <Link href="/">
              <Text fw={600} fz={22} c={theme.colors.chatter[0]}>
                CHATTER
              </Text>
            </Link>
          </Flex>
        </div>

        <div className={classes.textkbdContainer}>
          <TextInput
            className={classes.textkbd}
            placeholder="Search"
            icon={<IconSearch size="1rem" />}
            styles={{ rightSection: { pointerEvents: "none" } }}
          />
        </div>

        <Group spacing={7}>
          <Flex align="center">
            <UnstyledButton mr={15} className={classes.searchbtn}>
              <IconSearch color={colors.chatter[2]} size={20} />
            </UnstyledButton>

            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Indicator
                inline
                label={<Text size="8px">2</Text>}
                size={15}
                mr={20}
                mt={3}
              >
                <RiNotification2Line color="black" size={20} />
              </Indicator>
            </MediaQuery>

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton className={cx(classes.user)}>
                  <Group spacing={7}>
                    <Avatar radius="xl" size={30} color="black">
                      <Text tt="uppercase">
                        {getInitials(user?.displayName)}
                      </Text>
                    </Avatar>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  className={classes.bgHover}
                  icon={<IconUser size="0.9rem" stroke={1.5} />}
                >
                  {user?.displayName}
                </Menu.Item>
                <Menu.Label>Settings</Menu.Label>

                <Menu.Item
                  className={classes.bgHover}
                  icon={<IconSettings size="0.9rem" stroke={1.5} />}
                >
                  Notification
                </Menu.Item>

                <Menu.Item
                  className={classes.bgHover}
                  icon={<IconSettings size="0.9rem" stroke={1.5} />}
                >
                  Account settings
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  className={classes.bgHover}
                  onClick={handleLogout}
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(!opened)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </Flex>
        </Group>
      </div>
    </Header>
  );
}
