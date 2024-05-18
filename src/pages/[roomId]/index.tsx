import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import PdfAnalyzationMain from "@app/components/PdfAnalyzationMain";
import styles from "../styles.module.css";
import { useRoomsContext } from "@app/hooks/roomContextHooks";
import { ChatRoom } from "rooms-model";

const RoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };
  const rooms = useRoomsContext();

  const currentRoom = useMemo(
    () => rooms.find((room) => room._id === roomId) || ({} as ChatRoom),
    [roomId, rooms]
  );

  return (
    <>
      <Head>
        <title>{`cBee | ${currentRoom?.room_name}`}</title>
        <meta name="description" content="cBee App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <PdfAnalyzationMain room={currentRoom} />
      </div>
    </>
  );
};

export default RoomPage;
