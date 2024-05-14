import Head from "next/head";
import styles from "./styles.module.css";

export default function RootPage() {
  return (
    <>
      <Head>
        <title>cBee</title>
        <meta name="description" content="cBee App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>Not selected room</div>
    </>
  );
}
