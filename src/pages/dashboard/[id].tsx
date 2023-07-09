import React, { useState } from "react";
import { GetServerSideProps } from "next";
import withLayout from "@/layouts/dasLayout";
import HeadMeta from "@/components/head";
import { Fragment } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Text,
  createStyles,
  rem,
  Textarea,
  Group,
} from "@mantine/core";
import {
  IconBrandWechat,
  IconBook,
  IconHeart,
  IconReportAnalytics,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";

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
  control: {
    color: "#fff",
    background: "#000",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: rem(100),
    height: rem(46),
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: "#000",
    },
  },
}));

function SingleBlog({ data }: any) {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const [comment, setComment] = useState("");

  const { id } = router.query;

  const [likes, setLikes] = useState(data?.likes);
  const [views, setViews] = useState(data?.views);

  const handleLikes = async () => {
    // @ts-ignore comment
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, {
      likes: data?.likes + 1,
    });
    setLikes(likes + 1);
  };

  const handleComments = async () => {
    const commentData = {
      comment,
      user: data?.user,
    };

    // @ts-ignore comment
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, {
      comments: [...data?.comments, commentData],
    });
    setComment("");
  };

  return (
    <Fragment>
      <HeadMeta pageName="Single Blog" />
      <Container fluid>
        <Box mt={40} mb={20}>
          <Flex align="center" justify="space-between">
            <Link href="/dashboard">
              <Button className={classes.control}>Go back</Button>
            </Link>
          </Flex>
        </Box>
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
                  <Text fw={500} fz={20} tt="capitalize">
                    {data?.user}
                  </Text>
                  <Flex align="center" gap={10} mt={2}>
                    <Text fz={14}>Product designer</Text>
                    <Text fz={14}>
                      {dayjs(JSON.parse(data?.createdAt)).format(
                        "MMMM D, YYYY"
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Box className={classes.cardImage} mt={20}>
                <img
                  src={data?.image}
                  alt="image"
                  className={classes.blogImage}
                />
              </Box>

              <Box mb={10}>
                <Text fw={600} fz={24} mt={10} tt="capitalize">
                  {data?.title}
                </Text>
                <Flex align="center">
                  <IconBook size={14} />
                  <Text ml={5} fz={12}>
                    10 mins read
                  </Text>
                </Flex>
              </Box>
              <Text fz={16} mt={20}>
                <div dangerouslySetInnerHTML={{ __html: data?.body }}></div>
              </Text>
            </Box>
            <Box mt={20}>
              <Flex align="center" justify="space-between" mt={10} mb={10}>
                <Flex align="center">
                  <IconBrandWechat />
                  <Text fz={14} ml={5}>
                    {data?.comments?.length}
                  </Text>
                </Flex>
                <Box onClick={handleLikes} style={{ cursor: "pointer" }}>
                  <Flex align="center">
                    <IconHeart />
                    <Text fz={14} ml={5}>
                      {likes}
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex align="center">
                    <IconReportAnalytics />
                    <Text fz={14} ml={5}>
                      {views} views
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Container>

          <Box mt={40}>
            <Text fz={20} fw={600}>
              Comments
            </Text>
            {data?.comment ? (
              data?.comments.map((comment: any, id: number) => (
                <Box mt={10} key={id} ml={10}>
                  <Group>
                    <Flex align="center">
                      <Text size="sm" fw="bold" tt="capitalize">
                        {comment?.user}
                      </Text>
                    </Flex>
                  </Group>
                  <Text size="xs" mt={5}>
                    {comment?.comment}
                  </Text>
                </Box>
              ))
            ) : (
              <Text size="xs" ml={10}>
                No comments yet
              </Text>
            )}
          </Box>

          <Box mt={40} mx={10}>
            <Textarea
              placeholder="Your comment"
              label="Your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Flex align="flex-end" justify="flex-end" onClick={handleComments}>
              <Button mt={14} bg="black" radius="xs">
                Comment
              </Button>
            </Flex>
          </Box>
        </Card>
      </Container>
    </Fragment>
  );
}

export default withLayout(SingleBlog, "Blog");

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const id = ctx.params?.id;

  if (!id) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  let data = null;

  try {
    // @ts-ignore comment
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      data = docSnap.data();
      data.createdAt = JSON.stringify(data.createdAt.toDate());
    } else {
      return {
        notFound: true,
      };
    }

    // @ts-ignore comment
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, {
      views: data?.views + 1,
    });

    return {
      props: { data },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
};
