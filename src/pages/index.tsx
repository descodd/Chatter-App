import { Fragment } from "react";
import withLayout from "@/layouts/appLayout";
import { Hero } from "@/views/home/hero";
import { Banner } from "@/views/home/banner";
import { Features } from "@/views/home/features";
import { Testimony } from "@/views/home/testimony";
import { FooterBanner } from "@/views/home/footerBanner";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Banner />
      <Features />
      <Testimony />
      <FooterBanner />
    </Fragment>
  );
};

export default withLayout(Home);
