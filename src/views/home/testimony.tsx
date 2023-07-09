import {
  Text,
  Container,
  Button,
  Grid,
  createStyles,
  rem,
  Image,
} from "@mantine/core";
import TesAvatar from "@/assets/tesAvatar.png";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(80),
    paddingBottom: rem(80),
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(254, 247, 234, 1)",
    [theme.fn.smallerThan("xs")]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontSize: rem(32),
    fontWeight: 800,
    letterSpacing: rem(-1),
    color: "#1C1B23",
    marginBottom: theme.spacing.xs,
    textAlign: "left",

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  imageStyle: {
    objectFit: "contain",
  },

  description: {
    color: "#1C1B23",
    textAlign: "left",

    [theme.fn.smallerThan("xs")]: {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },
  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  textCenter: {
    margin: "auto 0",
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: theme.colors.chatter[0],

    "&:hover": {
      backgroundColor: theme.colors.chatter[0],
    },

    [theme.fn.smallerThan("xs")]: {
      marginTop: "20px",
    },
  },
}));

export function Testimony() {
  const { classes, cx } = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Container size="1000px">
          <div className={classes.inner}>
            <Grid px="xl">
              <Grid.Col md={3} lg={3}>
                <Image
                  className={classes.imageStyle}
                  height={200}
                  width={200}
                  radius={100}
                  src={TesAvatar.src}
                  alt="Random image from unsplash"
                  withPlaceholder
                  placeholder="https://images.unsplash.com/photo-1612837017391-4b6b7e9b0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJsb2d8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                />
              </Grid.Col>
              <Grid.Col md={9} lg={9} className={classes.textCenter}>
                <Text size="sm" className={classes.description}>
                  &quot; Chatter has become an integral part of my online
                  experience. As a user of this incredible blogging platform, I
                  have discovered a vibrant community of individuals who are
                  passionate about sharing their ideas and engaging in
                  thoughtful discussions.&quot;
                </Text>

                <Text mt={20}>
                  <span>- Adebobola Muhydeen, </span>
                  <span>Software developer at Apple</span>
                </Text>

                <Link href="/dashboard">
                  <Button
                    className={cx(classes.control, classes.secondaryControl)}
                    size="lg"
                    radius="md"
                    mt={30}
                  >
                    Join chatter
                  </Button>
                </Link>
              </Grid.Col>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}
