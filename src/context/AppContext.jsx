import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [dataLoading, setDataLoading] = useState(false);
  const [vehiclesData, setVehiclesData] = useState([]);    // For Cars
  const [realEstateData, setRealEstateData] = useState([]); // For Houses
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
    const unsubscribes = [];

    // Subscribe to Cars collection (vehicles)
    const unsubVehicles = onSnapshot(collection(db, "Cars"), (snapshot) => {
      const cars = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: "vehicle",
        ...doc.data(),
      }));
      setVehiclesData(cars);
    });
    unsubscribes.push(unsubVehicles);

    // Subscribe to Houses collection (real estate)
    const unsubRealEstate = onSnapshot(collection(db, "Houses"), (snapshot) => {
      const houses = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: "realestate",
        ...doc.data(),
      }));
      setRealEstateData(houses);
    });
    unsubscribes.push(unsubRealEstate);

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

    return [...unsubListings, unsubUsers, unsubMessaging];
  };

  return (
    <AppContext.Provider
      value={{
        dataLoading,
        vehiclesData,
        realEstateData,
        usersData,
        messagingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
