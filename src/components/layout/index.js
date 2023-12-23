import Head from "next/head";
import Navbar from "./navbar";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
