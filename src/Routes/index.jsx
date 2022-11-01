import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Components/LoginForm";

const PageRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
