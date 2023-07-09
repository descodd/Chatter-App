import React from "react";
import { Box, Card, Container, Flex, Text, createStyles } from "@mantine/core";
import {
  IconBrandWechat,
  IconBook,
  IconHeart,
  IconReportAnalytics,
} from "@tabler/icons-react";
import Link from "next/link";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

const useStyles = createStyles((theme) => ({
  card: {
    cursor: "pointer",
  },

  cardImage: {
    height: "400px",
    width: "100%",
    overflow: "hidden",
  },

  blogImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  avatar: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  profileImage: {
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    overflow: "hidden",
  },
}));

function BlogCard({ data, key, id }: any) {
  const { classes, theme } = useStyles();

  const seconds = data?.createdAt?.seconds;
  const nanoseconds = data?.createdAt?.nanoseconds;

  const timestamp = new Timestamp(seconds, nanoseconds);
  const date = timestamp.toDate();

  const calculateReadingTime = () => {
    const wpm = 225;
    const words = data?.body.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  };

  const getFirst50Words = (str: string) => {
    let result = str.split(" ").splice(0, 35).join(" ");
    return result + "...";
  };

  return (
    <Link href={`/dashboard/${id}`} key={key}>
      <Card withBorder radius={5} className={classes.card} px={20} mb={0}>
        <Container size="900px" m="0">
          <Box>
            <Flex align="center" gap={10}>
              <Box className={classes.profileImage}>
                <img
                  src="https://rb.gy/11l2d"
                  alt="image"
                  className={classes.avatar}
                />
              </Box>

              <Flex direction="column">
                <Text fw={500} fz={20}>
                  {data?.user}
                </Text>
                <Flex align="center" gap={10} mt={2}>
                  <Text fz={14}>Product designer</Text>
                  <Text fz={14}>.{dayjs(date).format("MMMM D, YYYY")}</Text>
                </Flex>
              </Flex>
            </Flex>

            <Box mb={10}>
              <Text fw={600} fz={24} mt={10}>
                {data?.title}
              </Text>
              <Flex align="center">
                <IconBook size={14} />
                <Text ml={5} fz={12}>
                  {calculateReadingTime()}
                  {calculateReadingTime() > 1 ? " mins read" : " min read"}
                </Text>
              </Flex>
            </Box>
            <Text fz={16}>
              <div
                dangerouslySetInnerHTML={{
                  __html: getFirst50Words(data?.body),
                }}
              ></div>
            </Text>
          </Box>

          <Box className={classes.cardImage} mt={20}>
            <img src={data?.image} alt="image" className={classes.blogImage} />
          </Box>
          <>
            <Flex align="center" justify="space-between" mt={10} mb={20}>
              <Flex align="center">
                <IconBrandWechat />
                <Text fz={14} ml={5}>
                  {data?.comments?.length}
                </Text>
              </Flex>
              <Flex align="center">
                <IconHeart />
                <Text fz={14} ml={5}>
                  {data?.likes}
                </Text>
              </Flex>
              <Flex align="center">
                <IconReportAnalytics />
                <Text fz={14} ml={5}>
                  {data?.views} views
                </Text>
              </Flex>
            </Flex>
          </>
        </Container>
      </Card>
    </Link>
  );
}

export default BlogCard;
