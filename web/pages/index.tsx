import { GetStaticProps } from "next";

export default function Index() {
  return <></>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // revalidate every hour
  };
};
