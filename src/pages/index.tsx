import { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import classNames from "classnames";

import { ChatRooms } from "rooms-model";
import { useRoomActionsContext } from "@app/hooks/roomContextHooks";
import clientApi, { TEST_USER_ID } from "@app/api";
import { sortRooms } from "@app/utils";
import styles from "./styles.module.css";

export const getServerSideProps = (async () => {
  const { data } = await clientApi.room.getRooms(TEST_USER_ID);
  const rooms = data.data.chat_rooms || [];
  return { props: { rooms: sortRooms(rooms) } };
}) satisfies GetServerSideProps<{
  rooms: ChatRooms;
}>;

export default function RootPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const serverRooms = props.rooms;

  const router = useRouter();
  const { createRoomMutation } = useRoomActionsContext();

  useEffect(() => {
    if (serverRooms.length) {
      const firstRoom = serverRooms.at(0);
      router.replace(`/${firstRoom?._id}`);
    } else if (!serverRooms.length) {
      createRoomMutation.mutateAsync().then((res) => {
        if (res?.room_id) {
          router.replace(`/${res?.room_id}`);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{`cBee | loading room...`}</title>
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
