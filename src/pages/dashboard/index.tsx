import { Fragment, useState, useEffect } from "react";
import withLayout from "@/layouts/dasLayout";
import { GetServerSideProps } from "next";
import HeadMeta from "@/components/head";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  SimpleGrid,
  Tabs,
  Text,
  createStyles,
  rem,
  Loader,
} from "@mantine/core";
import Link from "next/link";
import { IconPencil } from "@tabler/icons-react";
import BlogCard from "@/views/dashboard/blogCard";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../../firebase";

const useStyles = createStyles((theme) => ({
  control: {
    color: "#fff",
    background: theme.colors.chatter[0],
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: rem(180),
    height: rem(46),
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: theme.colors.chatter[0],
    },
  },

  tabStyle: {
    borderBottom: "none",
  },
}));

function Dashboard({ data }: any) {
  const { classes, theme } = useStyles();
  const [recentBlog, setRecentBlog] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);

  const fetchRecentBlog = async () => {
    const listingRef = collection(db, "blogs");
    const q = query(listingRef, orderBy("createdAt", "desc"), limit(4));
    const querySnap = await getDocs(q);

    let blogs: any[] = [];

    querySnap.forEach((doc) => {
      return blogs.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setRecentBlog(blogs);
    setLoading(false);
  };

  return (
    <Fragment>
      <HeadMeta pageName="Dashboard" />
      <Container fluid>
        <Box mt={40} mb={20}>
          <Flex align="center" justify="space-between">
            <Box>
              <Text fw={600} fz={20} mb={2}>
                FEED
              </Text>
              <Text fz={14}>Explore different content you’d love </Text>
            </Box>

            <Link href="/dashboard/new">
              <Button className={classes.control} leftIcon={<IconPencil />}>
                Post a content
              </Button>
            </Link>
          </Flex>
        </Box>

        <Tabs radius="xs" defaultValue="you">
          <Card withBorder radius={5} pb={2}>
            <Tabs.List className={classes.tabStyle}>
              <Flex justify="space-between" w="100%">
                <Tabs.Tab value="you">
                  <Text fw={600}>For you</Text>
                </Tabs.Tab>
                <Tabs.Tab value="Featured">
                  <Text fw={600}>Featured</Text>
                </Tabs.Tab>
                <Tabs.Tab value="Recent" onClick={fetchRecentBlog}>
                  <Text fw={600}>Recent</Text>
                </Tabs.Tab>
              </Flex>
            </Tabs.List>
          </Card>

          <Tabs.Panel value="you">
            <>
              <SimpleGrid
                cols={1}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                spacing={0}
              >
                <Card p={0}>
                  {data.map((item: any) => (
                    <BlogCard
                      key={item?.id}
                      id={item.id}
                      data={JSON.parse(item.data)}
                    />
                  ))}
                </Card>
              </SimpleGrid>
            </>
          </Tabs.Panel>

          <Tabs.Panel value="Featured" pt="xs">
            {loading2 && (
              <Flex align="center" justify="center" style={{ height: "50vh" }}>
                <Loader size={40} />
              </Flex>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="Recent" pt="xs">
            {loading && (
              <Flex align="center" justify="center" style={{ height: "50vh" }}>
                <Loader size={40} />
              </Flex>
            )}
            <SimpleGrid
              cols={1}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              spacing={0}
            >
              <Card p={0}>
                {recentBlog.map((item: any) => (
                  <BlogCard key={item?.id} id={item.id} data={item.data} />
                ))}
              </Card>
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Fragment>
  );
}

export default withLayout(Dashboard, "Dashboard");

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const id = ctx.params?.id;

  let data = [] as any;

  try {
    const blogRef = collection(db, "blogs");
    const q = query(blogRef, orderBy("createdAt", "desc"), limit(3));
    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      return data.push({
        id: doc.id,
        data: JSON.stringify(doc.data()),
      });
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
