import {
  Title,
  Text,
  Container,
  Button,
  Grid,
  createStyles,
  rem,
  Image,
} from "@mantine/core";
import FooterImage from "@/assets/footerImage.png";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(30),
    paddingBottom: rem(30),
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop: rem(70),
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
    width: "100%",
    height: "100%",
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

export function FooterBanner() {
  const { classes, cx } = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Container size="1000px">
          <div className={classes.inner}>
            <Grid px="xl" gutterMd={50}>
              <Grid.Col md={4} lg={4}>
                <Image
                  className={classes.imageStyle}
                  src={FooterImage.src}
                  alt="Random image from unsplash"
                  withPlaceholder
                  placeholder="footer image"
                />
              </Grid.Col>
              <Grid.Col md={8} lg={8} className={classes.textCenter}>
                <Title className={classes.title} fw="bold">
                  Write, read and connect with great minds on chatter
                </Title>
                <Text size="sm" className={classes.description}>
                  Share people your great ideas, and also read write-ups based
                  on your interests. connect with people of same interests and
                  goals
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
