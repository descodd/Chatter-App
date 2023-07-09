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
  SimpleGrid,
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
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import BlogCard from "@/views/dashboard/blogCard";

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

function TagPage({ blogs }: any) {
  const { classes, theme } = useStyles();
  const router = useRouter();

  return (
    <Fragment>
      <HeadMeta pageName="Blog TagPage" />
      <Container fluid>
        <>
          <SimpleGrid
            cols={1}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            spacing={0}
          >
            <Card p={0}>
              {blogs.map((item: any) => (
                <BlogCard
                  key={item?.id}
                  id={item.id}
                  data={JSON.parse(item.data)}
                />
              ))}
            </Card>
          </SimpleGrid>
        </>

        {blogs.length === 0 && (
          <Box pos="absolute" top="50%" left="50%" ta="center">
            <Text size="lg" weight={500}>
              No blogs found
            </Text>
            <Text size="sm" weight={400}>
              Try searching for something else
            </Text>
          </Box>
        )}
      </Container>
    </Fragment>
  );
}

export default withLayout(TagPage, "Blog TagPage");

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const tag = ctx.params?.id;
  console.log(tag);

  if (!tag) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  try {
    // @ts-ignore comment
    const listingRef = collection(db, "blogs");
    const q = query(listingRef, orderBy("tags", `asc`), limit(4));
    const querySnap = await getDocs(q);

    let blogs: any[] = [];

    // @ts-ignore comment
    querySnap.forEach((doc) => {
      return blogs.push({
        id: doc.id,
        data: JSON.stringify(doc.data()),
      });
    });

    // filter blogs by tag name and return
    blogs = blogs.filter((blog) => {
      const data = JSON.parse(blog.data);
      return data.tags.includes(tag);
    });

    return {
      props: { blogs },
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
