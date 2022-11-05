import React, { useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Dashboard from "../../Components/Admin Dashboard/dashboard";

const AdminDashboard = () => {

    return (
		<>
			<div className="bg-main-blue">
                <Header/>
				<div className="flex justify-center items-center">
				<Dashboard />
				</div>
				<Footer />
                </div>
		</>
	);
};

export default AdminDashboard;
