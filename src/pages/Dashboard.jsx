import React from "react";
import Card from "../components/Card";
import StatRow from "../components/StatRow";
import {
  getListingAnalytics,
  getMessagingAnalytics,
  getUserAnalytics,
} from "../utils/helper";
import { useApp } from "../context/AppContext";
import Loader from "../components/Loader";
import CustomLayout from "../Layouts/CustomLayout";

const MiniCard = ({ label, value }) => (
  <div className="w-full bg-white/10 border border-white/10 backdrop-blur-3xl rounded-xl py-5 flex flex-col items-center gap-1">
    <span className="text-xl sm:text-3xl font-semibold text-blue-500">
      {value}
    </span>
    <span className="text-white/70 font-semibold">{label}</span>
  </div>
);

const Dashboard = () => {
  const { listingsData, usersData, messagingData, dataLoading } = useApp();

  // Get analytics data
  const listing = getListingAnalytics(listingsData);
  const user = getUserAnalytics(usersData);
  const message = getMessagingAnalytics(messagingData);

  // Build stats arrays
  const listingStats = [
    { label: "For Rent", value: listing.forRent },
    { label: "For Sale", value: listing.forSale },
    { label: "Created Today", value: listing.createdToday },
  ];

  const userStats = [
    { label: "Total Users", value: user.totalUsers },
    { label: "New Users Today", value: user.newToday },
    { label: "Daily Active Users", value: user.dailyActive },
    { label: "Weekly Active Users", value: user.weeklyActive },
    { label: "Monthly Active Users", value: user.monthlyActive },
  ];

  const messageStats = [
    { label: "Total Messages", value: message.totalMessages },
    { label: "Unread Messages", value: message.unreadMessages },
    { label: "Messages Today", value: message.todayMessages },
    { label: "Post Messages", value: message.postMessages },
    { label: "Chat Messages", value: message.chatMessages },
  ];

  // Adjust max for messaging graphs
  const highestMessageValue = Math.max(...messageStats.map((s) => s.value));
  const adjustedMax = highestMessageValue * 2; // ← your “highest value's half” rule

  return (
    <CustomLayout>
      <div className="flex flex-col h-full w-full gap-10 px-6 py-8 overflow-auto">
        {/* Listing Analytics */}
        <div className="flex flex-col lg:flex-row w-full gap-10 h-full">
          <Card title="Listing Analytics">
            <StatRow
              key={0}
              label={"Total Listings"}
              value={listing.totalListings}
            />

            <div className="flex flex-row gap-10 pt-5">
              <MiniCard label={"Cars"} value={listing.cars} />
            <MiniCard label={"Houses"} value={listing.houses} />
            </div>
            {listingStats.map(({ label, value }, i) => (
              <StatRow key={label} label={label} value={value} />
            ))}
          </Card>

          {/* User Analytics */}
          <Card title="User Analytics">
            {userStats.map(({ label, value }, i) => (
              <StatRow key={label} label={label} value={value} />
            ))}
          </Card>
        </div>

        {/* Messaging Analytics */}
        <Card title="Messaging Analytics">
          <div className="space-y-2">
            {messageStats.map(({ label, value }, i) => (
              <StatRow
                key={label}
                label={label}
                value={value}
                max={adjustedMax}
                Graph={1} // skip graph for first one if desired
              />
            ))}
          </div>
        </Card>
      </div>
    </CustomLayout>
  );
};

export default Dashboard;
