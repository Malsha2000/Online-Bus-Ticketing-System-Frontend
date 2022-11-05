import React from "react";
import Inspection from "../../Assests/Inspection.png";
import schedule from "../../Assests/schedule.png";
// import LabAssistantDashboardImg from "../../Assests/LabAssistantDashboard.png";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let navigate = useNavigate();

	const id = localStorage.getItem("id");
	console.log("RoleID: " + id);

	const InspectionNav = () => {
		navigate("/inspection/add");
	};

	const TimetableNav = () => {
		navigate("/busroutes/all");
	};

	return (
		<>
			<table>
				<tr>
					<td className="w-fit">
						<div className="bg-white w-[100%] h-full">
							<div className="flex justify-center items-center">
								<div className="ml-20 w-full">
									<div className="w-[75%] mb-10 mt-12 ml-40">
										<h1 className="text-black font-bold text-4xl text-center">
											Admin Dashboard
										</h1>
									</div>

									<div className="bg-red-400 w-[75%] h-auto p-14 rounded-xl mt-10 mb-10 mr-20 ml-40 ">
										<div className="flex-row">
											<div className="mr-40 flex justify-center items-center">
												
                                            <div className="my-10 flex flex-row">
                                                <div className="flex flex-row h-20 mr-20 ml-40 bg-white w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																TimetableNav
															}
															class="bg-black hover:bg-black text-white font-bold text-lg px-40 rounded">
															Schedule Timetable
														</button>
														{/* <img
															src={
																schedule
															}
															className=" h-20 w-35"
															alt="tute"
														/> */}
													</div>
												</div>
												<div className="my-10 flex flex-row">
                                                <div className="flex flex-row h-20 bg-white w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																InspectionNav
															}
															class="bg-black hover:bg-black text-white font-bold text-lg px-40 rounded">
															Inspection Details
														</button>
														{/* <img
															src={
																Inspection
															}
															className=" h-20 w-35"
															alt="tute"
														/> */}
													</div>
												</div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</td>
					
				</tr>
			</table>
		</>
	);
};

export default AdminDashboard;
