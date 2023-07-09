import { useEffect, useState } from "react";
import { ComponentType, Fragment } from "react";
import HeadMeta from "@/components/head";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { auth } from "../../firebase";

export default function withLayout(Component: ComponentType) {
  const LayoutComponent = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          console.log({ user });
          setUser(user as any);
        } else {
          setUser(null);
        }
      });

      return unsubscribe;
    }, [user]);

    return (
      <Fragment>
        <HeadMeta />
        <Navbar user={user} />
        <Component />
        <Footer />
      </Fragment>
    );
  };

  return LayoutComponent;
}
