import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [dataLoading, setDataLoading] = useState(false);
  const [listingsData, setListingsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [messagingData, setMessagingData] = useState([]);

  useEffect(() => {
    const unsubscribes = loadAllDataRealtime();
    return () => {
      unsubscribes.forEach((unsub) => unsub && unsub());
    };
  }, []);

  /** Realtime Listings */
  const loadListingsRealtime = () => {
    const collectionsList = ["Cars", "Houses"];
    const unsubscribes = collectionsList.map((name) =>
      onSnapshot(collection(db, name), (snapshot) => {
        setListingsData((prev) => {
          const updated = snapshot.docs.map((doc) => ({
            id: doc.id,
            type: name.toLowerCase().slice(0, -1),
            ...doc.data(),
          }));
          const other = prev.filter(
            (item) => item.type !== name.toLowerCase().slice(0, -1)
          );
          return [...other, ...updated];
        });
      })
    );
    return unsubscribes;
  };

  /** Realtime Users */
  const loadUsersRealtime = () => {
    return onSnapshot(collection(db, "users"), (snapshot) => {
      setUsersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  /** Fully Realtime Messaging */
  const loadMessagingRealtime = () => {
    let messageUnsubs = []; // to store per-chat listeners

    const unsubChats = onSnapshot(collection(db, "chats"), (chatsSnapshot) => {
      // Clear old message listeners whenever chats list changes
      messageUnsubs.forEach((unsub) => unsub && unsub());
      messageUnsubs = [];

      let allMessages = [];

      chatsSnapshot.docs.forEach((chatDoc) => {
        const messagesRef = collection(db, "chats", chatDoc.id, "messages");

        const unsubMessages = onSnapshot(messagesRef, (messagesSnapshot) => {
          // Merge messages from all chats in real time
          allMessages = [
            ...allMessages.filter((m) => m.chatId !== chatDoc.id),
            ...messagesSnapshot.docs.map((doc) => ({
              id: doc.id,
              chatId: chatDoc.id,
              ...doc.data(),
            })),
          ];
          setMessagingData(allMessages);
        });

        messageUnsubs.push(unsubMessages);
      });
    });

    // Return one unsubscribe function that stops both chats and messages listeners
    return () => {
      unsubChats();
      messageUnsubs.forEach((unsub) => unsub && unsub());
    };
  };

  /** Start all realtime listeners */
  const loadAllDataRealtime = () => {
    setDataLoading(true);
    const unsubListings = loadListingsRealtime();
    const unsubUsers = loadUsersRealtime();
    const unsubMessaging = loadMessagingRealtime();
    setDataLoading(false);

    return Array.isArray(unsubListings)
      ? [...unsubListings, unsubUsers, unsubMessaging]
      : [unsubListings, unsubUsers, unsubMessaging];
  };

  return (
    <AppContext.Provider
      value={{
        dataLoading,
        listingsData,
        usersData,
        messagingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
