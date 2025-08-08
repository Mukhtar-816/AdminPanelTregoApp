import React from "react";
import Layout from "../Layouts/CustomLayout";
import Card from "../components/Card";

const UserManagement = () => {
  return (
    <Layout>
      <Card>
        <div className="flex justify-center items-center text-blue-500 text-2xl font-semibold">
          <label>User Management</label>
        </div>
      </Card>
    </Layout>
  );
};

export default UserManagement;
