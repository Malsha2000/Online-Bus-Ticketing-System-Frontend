import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Components/LoginForm";
import Register from '../Pages/Register'
import InspectionAdd from "../Pages/inspectionAdd";
import InspectionStart from "../Pages/InspectionStart";
import InspectionList from "../Pages/Inspection/InspectionList";
import InspectionTable from "../Pages/Inspection/InspectionTable";
import UpdateInspection from "../Pages/Inspection/UpdateInsception";
import TimetableAdd from "../Pages/TimetableAdd";
import TimetableTable from "../Pages/Timetable/TimetableTable";
import UpdateTimetable from "../Pages/Timetable/UpdateTimetable";

const PageRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path='/user/add' element={<Register/>}></Route>
					<Route path='/inspection/add' element={<InspectionAdd/>}></Route>
					<Route path='/inspection/card' element={<InspectionStart/>}></Route>
					<Route path="/inspections" element={<InspectionList />} />
					<Route path="/inspection/all" element={<InspectionTable />} />
					<Route
                            path="/inspection/update/:id"
                            element={<UpdateInspection />}
                        />
						<Route path='/busroutes/add' element={<TimetableAdd/>}></Route>
						<Route path="/busroutes/all" element={<TimetableTable />} />
						<Route path="/busroutes/update/:id" element={<UpdateTimetable />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default PageRoutes;
