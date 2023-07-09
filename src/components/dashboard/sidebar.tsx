import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconSmartHome,
  IconWallet,
  IconFileInvoice,
  IconCreditCard,
  IconUser,
  IconBell,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,

    [theme.fn.smallerThan("sm")]: {
      transform: "translateX(-100%)",
      transition: "transform 500ms ease",
    },
  },

  openNavbar: {
    [theme.fn.smallerThan("sm")]: {
      transform: "translateX(0)",
      transition: "transform 500ms ease",
    },
  },

  section: {
    marginLeft: `calc(${theme.spacing.xs} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: 165,
    fontSize: theme.fontSizes.sm,
    marginLeft: 20,
    padding: `${rem(4)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      color: theme.colors.chatter[0],
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  customFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },

  activeState: {
    color: theme.colors.chatter[0],
  },
}));

const general = [{ icon: IconSmartHome, label: "Feed", path: "/dashboard" }];

const payments = [
  { icon: IconSmartHome, label: "Programming", path: `/tags/${"Programming"}` },
  {
    icon: IconSmartHome,
    label: "Data science",
    path: `/tags/${"data science"}`,
  },
  { icon: IconSmartHome, label: "Technology", path: `/tags/${"Technology"}` },
  {
    icon: IconSmartHome,
    label: "Machine learning",
    path: `/tags/${"Machine learning"}`,
  },
  { icon: IconSmartHome, label: "Politics", path: `/tags/${"Politics"}` },
];

const account = [
  { icon: IconUser, label: "Account", notifications: 3, path: "/account" },
];

const other = [{ icon: IconLogout, label: "Log Out" }];

export function NavbarSearch({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}) {
  const router = useRouter();
  const { classes } = useStyles();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generalLinks = general.map((link) => (
    <Link href={link.path} key={link.path}>
      <UnstyledButton
        key={link.label}
        className={
          router.pathname === link.path
            ? `${classes.mainLink} ${classes.activeState}`
            : `${classes.mainLink}`
        }
      >
        <div className={classes.mainLinkInner}>
          <link.icon size={22} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
      </UnstyledButton>
    </Link>
  ));

  const paymentsLinks = payments.map((link) => (
    <Link href={link.path} key={link.path}>
      <UnstyledButton
        key={link.label}
        className={
          router.pathname === link.path
            ? `${classes.mainLink} ${classes.activeState}`
            : `${classes.mainLink}`
        }
      >
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
      </UnstyledButton>
    </Link>
  ));

  const accountLinks = account.map((link) => (
    <Link href={link.path} key={link.path}>
      <UnstyledButton
        key={link.label}
        className={
          router.pathname === link.path
            ? `${classes.mainLink} ${classes.activeState}`
            : `${classes.mainLink}`
        }
      >
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
      </UnstyledButton>
    </Link>
  ));

  const otherLinks = other.map((link) => (
    <UnstyledButton
      key={link.label}
      className={classes.mainLink}
      onClick={handleLogout}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  return (
    <Navbar
      height="100%"
      width={{ sm: 250, md: 250 }}
      p="md"
      className={opened ? `${classes.openNavbar}` : `${classes.navbar}`}
    >
      <div className={classes.customFlex}>
        <div>
          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="sm" weight={500} color="black">
                Overview
              </Text>
            </Group>
            <div className={classes.mainLinks}>{generalLinks}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="sm" weight={500} color="black">
                Trending Tags
              </Text>
            </Group>
            <div className={classes.mainLinks}>{paymentsLinks}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="sm" weight={500} color="black">
                Personal
              </Text>
            </Group>
            <div className={classes.mainLinks}>{accountLinks}</div>
          </Navbar.Section>
        </div>

        <Navbar.Section className={classes.section} mb={60}>
          <div className={classes.mainLinks}>{otherLinks}</div>
        </Navbar.Section>
      </div>
    </Navbar>
  );
}
