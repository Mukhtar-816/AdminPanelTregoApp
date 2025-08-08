import React, { useMemo } from "react";
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
    <span className="text-xl sm:text-3xl font-semibold text-blue-500">{value}</span>
    <span className="text-white/70 font-semibold">{label}</span>
  </div>
);

const Dashboard = () => {
  const { vehiclesData, realEstateData, usersData, messagingData, dataLoading } = useApp();

  const loading = dataLoading;

  // Early loader return
  if (loading) return <Loader show={true} />;

  // Memoize analytics computations
  const vehicleListing = useMemo(() => getListingAnalytics(vehiclesData), [vehiclesData]);
  const realEstateListing = useMemo(() => getListingAnalytics(realEstateData), [realEstateData]);
  const user = useMemo(() => getUserAnalytics(usersData), [usersData]);
  const message = useMemo(() => getMessagingAnalytics(messagingData), [messagingData]);

  // Memoize combined listing stats for easy access
  const listingStats = useMemo(() => [
    { label: "Vehicles For Sale", value: vehicleListing.forSale || 0 },
    { label: "Vehicles For Rent", value: vehicleListing.forRent || 0 },
    { label: "Houses For Sale", value: realEstateListing.forSale || 0 },
    { label: "Houses For Rent", value: realEstateListing.forRent || 0 },
  ], [vehicleListing, realEstateListing]);

  // Destructure for fast lookup
  const vehiclesForSale = listingStats[0].value;
  const vehiclesForRent = listingStats[1].value;
  const housesForSale = listingStats[2].value;
  const housesForRent = listingStats[3].value;

  const userStats = useMemo(() => [
    { label: "Total Users", value: user.totalUsers },
    { label: "New Users Today", value: user.newToday },
    { label: "Daily Active Users", value: user.dailyActive },
    { label: "Weekly Active Users", value: user.weeklyActive },
    { label: "Monthly Active Users", value: user.monthlyActive },
  ], [user]);

  const messageStats = useMemo(() => [
    { label: "Total Messages", value: message.totalMessages },
    { label: "Unread Messages", value: message.unreadMessages },
    { label: "Messages Today", value: message.todayMessages },
    { label: "Post Messages", value: message.postMessages },
    { label: "Chat Messages", value: message.chatMessages },
  ], [message]);

  // Adjust max for messaging graphs
  const highestMessageValue = Math.max(...messageStats.map((s) => s.value));
  const adjustedMax = highestMessageValue * 2 || 100; // fallback 100 just in case

  return (
    <CustomLayout>
      <div className="flex flex-col h-full w-full gap-10 px-6 py-8 overflow-auto ">
        {/* Listing Analytics */}
        <div className="flex flex-col lg:flex-row w-full gap-10 ">
          <Card title="Listing Analytics">
            <StatRow
              key={0}
              label={"Total Listings"}
              value={vehiclesData.length + realEstateData.length}
            />

            <div className="flex flex-row gap-8 pt-6 justify-center lg:justify-start">
              <MiniCard label={"Vehicles"} value={vehicleListing.totalListings || 0} />
              <MiniCard label={"Houses"} value={realEstateListing.totalListings || 0} />
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vehicles Stats */}
              <div>
                <h3 className="text-blue-400 font-semibold mb-3 text-lg">Vehicles</h3>
                <StatRow label="For Sale" value={vehiclesForSale} />
                <StatRow label="For Rent" value={vehiclesForRent} />
              </div>

              {/* Houses Stats */}
              <div>
                <h3 className="text-blue-400 font-semibold mb-3 text-lg">Houses</h3>
                <StatRow label="For Sale" value={housesForSale} />
                <StatRow label="For Rent" value={housesForRent} />
              </div>
            </div>

            {/* Created Today */}
            <div className="mt-2">
              <StatRow
                label="Created Today"
                value={(vehicleListing.createdToday || 0) + (realEstateListing.createdToday || 0)}
              />
            </div>
          </Card>

          {/* User Analytics */}
          <Card title="User Analytics">
            {userStats.map(({ label, value }) => (
              <StatRow key={label} label={label} value={value} />
            ))}
          </Card>
        </div>

        {/* Messaging Analytics */}
        <Card title="Messaging Analytics">
          <div className="space-y-2">
            {messageStats.map(({ label, value }) => (
              <StatRow
                key={label}
                label={label}
                value={value}
                max={adjustedMax}
                Graph={1}
              />
            ))}
          </div>
        </Card>
      </div>
    </CustomLayout>
  );
};

export default Dashboard;
