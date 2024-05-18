import Head from "next/head";
import classNames from "classnames";

import styles from "./styles.module.css";

export default function RootPage() {
  return (
    <>
      <Head>
        <title>{`cBee | loading rooms...`}</title>
        <meta name="description" content="cBee App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={classNames(styles.pageContainer, styles.rootPageContainer)}
      >
        <h2>Loading Rooms, please wait...</h2>
      </div>
    </>
  );
}
