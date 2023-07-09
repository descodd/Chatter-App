import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Divider,
  Image,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} *3)`,
    backgroundColor: "rgba(254, 247, 234, 1)",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: rem(350),
    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color: "#000",
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: theme.fontFamily,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: "#000",
  },

  afterFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.xl,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
  logo_footer: {
    width: rem(160),
    marginBottom: rem(20),
  },
  copy: {
    background: "#fff",
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    paddingBottom: rem(20),
  },
}));

export function Footer() {
  const data = [
    {
      title: "Explore",
      links: [
        { label: "community", link: "/" },
        { label: "Trending blogs", link: "/about" },
        { label: "Chatter for teams", link: "/blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Support docs", link: "/" },
        { label: "Join slack", link: "/" },
        { label: "Contact", link: "/" },
      ],
    },
    {
      title: "Official blog",
      links: [
        { label: "Official blog", link: "/" },
        { label: "Engineering blog", link: "/" },
      ],
    },
  ];
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <>
      <div className={classes.footer}>
        <Container className={classes.inner} size={1200}>
          <div className={classes.logo}>
            <Text fz="lg" fw="bold">
              Chatter
            </Text>

            <Divider my="sm" color={"black"} />
            <Group spacing={1} className={classes.social} noWrap>
              <ActionIcon size="lg">
                <IconBrandFacebook size="1.05rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg">
                <IconBrandTwitter size="1.05rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg">
                <IconBrandInstagram size="1.05rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg">
                <IconBrandLinkedin size="1.05rem" stroke={1.5} />
              </ActionIcon>
              <Group>
                <Text color="dimmed" size="sm">
                  hello@chatter.ng
                </Text>
              </Group>
            </Group>
          </div>
          <div className={classes.groups}>{groups}</div>
        </Container>
      </div>

      <div className={classes.copy}>
        <Container className={classes.afterFooter} maw={1200}>
          <Text color="dimmed" size="sm" align="center">
            Copyright chatter 2023 All rights reserved
          </Text>
        </Container>
      </div>
    </>
  );
}
