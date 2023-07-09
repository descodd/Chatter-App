import { colors } from "@/constants/theme";
import {
  createStyles,
  Button,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Flex,
} from "@mantine/core";
import { IconChartDots, IconUsers, IconCookie } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Analytics",
    description:
      "Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time.",
    icon: IconChartDots,
  },
  {
    title: "Social interactions",
    description:
      "Users on the platform can interact with posts they like, comment and engage in discussions",
    icon: IconUsers,
  },
  {
    title: "Content creation",
    description:
      "Write nice and appealing with our in-built markdown, a rich text editor.",
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: "50px 0",
  },

  title: {
    fontSize: rem(34),
    fontWeight: 900,
    color: "#000",
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    color: "#111111",
    marginBottom: rem(10),
  },

  cardIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(214, 209, 248, 0.2)",
    color: "#000",
  },
}));

export function Features() {
  const { classes, theme } = useStyles();

  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="xs" className={classes.card} padding="xl">
      <Flex className={classes.cardIcon} align="center" justify="center">
        {feature.icon && <feature.icon size={30} />}
      </Flex>
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <div className={classes.wrapper}>
      <Container py="xl" size="1000px">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Why you should join chatter
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </Text>

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}
