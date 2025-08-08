import React from "react";
import Card from "../components/Card";
import CustomLayout from "../Layouts/CustomLayout";

const ListingManagement = () => {
  return (
    <CustomLayout>
      <Card>
        <div className="flex justify-center items-center text-blue-500 text-2xl font-semibold">
          <label>Listing Management</label>
        </div>
      </Card>
    </CustomLayout>
  );
};

export default ListingManagement;
