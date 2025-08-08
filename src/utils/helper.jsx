// Takes a Date, Firestore Timestamp, ISO string, or millis, returns a JS Date
export const toDateObject = (value) => {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (value?.toDate) return value.toDate(); // Firestore Timestamp

  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return isNaN(d) ? null : d;
  }

  return null;
};

// Checks if the date is today
export const isToday = (value) => {
  const date = toDateObject(value);
  if (!date) return false;

  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// users data
export const getUserAnalytics = (users) => {
  if (!Array.isArray(users)) return {};

  const totalUsers = users.length;

  const newToday = users.filter((u) => isToday(u.createdAt)).length;

  const now = new Date();

  const dailyActive = users.filter((u) => {
    const lastActive = toDateObject(u.lastActive);
    return (
      lastActive &&
      lastActive.getDate() === now.getDate() &&
      lastActive.getMonth() === now.getMonth() &&
      lastActive.getFullYear() === now.getFullYear()
    );
  }).length;

  const weeklyActive = users.filter((u) => {
    const lastActive = toDateObject(u.lastActive);
    if (!lastActive) return false;
    const diff = (now - lastActive) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const monthlyActive = users.filter((u) => {
    const lastActive = toDateObject(u.lastActive);
    if (!lastActive) return false;
    const diff = (now - lastActive) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  }).length;

  return {
    totalUsers,
    newToday,
    dailyActive,
    weeklyActive,
    monthlyActive,
  };
};

// Listings data
export const getListingAnalytics = (listings) => {
  if (!Array.isArray(listings)) return {};

  const total = listings.length;

  // Separate forSale / forRent for cars and houses

  const forRent = listings.filter((item) => item?.rentDuration !== "forSale");
  const forSale = listings.filter((item) => item?.rentDuration === "forSale");

  const createdToday = listings.filter((item) => isToday(item.createdAt));

  return {
    totalListings: total,
    forRent: forRent.length,
    forSale: forSale.length,
    createdToday: createdToday.length,
  };
};

//messages data
export const getMessagingAnalytics = (messages) => {
  if (!Array.isArray(messages)) return {};

  const totalMessages = messages.length;

  const unreadMessages = messages.filter((m) => !m.read).length;

  const todayMessages = messages.filter((m) => isToday(m.timestamp)).length;

  const postMessages = messages.filter(
    (m) => m.type?.toLowerCase() === "post"
  ).length;

  const chatMessages = messages.filter(
    (m) => m.type?.toLowerCase() === "message"
  ).length;

  return {
    totalMessages,
    unreadMessages,
    todayMessages,
    postMessages,
    chatMessages,
  };
};
