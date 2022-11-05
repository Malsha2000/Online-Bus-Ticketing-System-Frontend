import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Components/LoginForm";
import Register from "../Pages/Register";
import InspectionAdd from "../Pages/inspectionAdd";
import InspectionStart from "../Pages/InspectionStart";
import InspectionList from "../Pages/Inspection/InspectionList";
import InspectionTable from "../Pages/Inspection/InspectionTable";
import UpdateInspection from "../Pages/Inspection/UpdateInsception";
import AdminDashboard from "../Pages/Admin/index";

const PageRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/user/add" element={<Register />}></Route>
					<Route
						path="/inspection/add"
						element={<InspectionAdd />}></Route>
					<Route
						path="/inspection/card"
						element={<InspectionStart />}></Route>
					<Route
						path="/inspections"
						element={<InspectionList />}
					/>
					<Route
						path="/inspection/all"
						element={<InspectionTable />}
					/>
					<Route
						path="/inspection/update/:id"
						element={<UpdateInspection />}
					/>
					<Route
							path="/admin"
							element={<AdminDashboard />}
						/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
