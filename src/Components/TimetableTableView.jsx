/* eslint-disable no-const-assign */
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Notification from "../Components/Notification/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "../Components/ConfirmDialog/index";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TimetableTableView = () => {
	const [timetable, setTimetable] = useState([]);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const [updateClicked, setUpdateClicked] = useState(false);
	const [timetableID, setTimetableID] = useState("");
	const [vehicleNo, setVehicleNo] = useState("");
	const [routeId, setRouteId] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState(new Date());
	const [startLocation, setStartLocation] = useState("");
	const [EndLocation, setEndLocation] = useState("");

	useEffect(() => {
		const fetchTimetable = async () => {
			const res = await axios.get(
				"http://localhost:5000/api/busroutes/all",
			);
			setTimetable(res.data);
			console.log(res.data);
		};
		fetchTimetable();
	}, []);
	let navigate = useNavigate();

	const columns = [
		{ title: "Timetable ID", field: "timetableID" },
		{ title: "Vehicle No", field: "vehicleNo" },
		{ title: "Route ID", field: "routeId" },
		{ title: "Date", field: "date" },
		{ title: "Time", field: "time" },
		{ title: "Start Location", field: "startLocation" },
		{ title: "End Location", field: "endLocation" },
	];
	const addTimetable = () => {
        const path = `/busroutes/add`;
        navigate(path);
    };


	const downLoadPdf = () => {
		const doc = new jsPDF();
		doc.text(" All Timetable Details", 50, 10);
		doc.autoTable({
			columns: columns.map((col) => ({
				...col,
				dataKey: col.field,
			})),
			body: timetable,
		});
		doc.save("All Inspection Details");
	};

	const handleDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		axios
			.delete(`http://localhost:5000/api/busroutes/delete/${id}`, {
				headers: {
					authToken: localStorage.getItem("authToken"),
				},
			})
			.then((res) => {
				console.log("Timetable deleted");
				window.location.reload();
				setNotify({
					isOpen: true,
					message: "Timetable deleted successfully",
					type: "error",
				});
			})
			.catch((err) => {
				console.log("delete error" + err);
			});
	};

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const handleUpdate = async (
		id,
		e,
		timetableID,
		vehicleNo,
		routeId,
		time,
		date,
		startLocation,
		EndLocation,
	) => {
		navigate(`/busroutes/update/${id}`, {
			state: {
				timetableID: timetableID,
				vehicleNo: vehicleNo,
				routeId: routeId,
				time: time,
				date: date,
				startLocation: startLocation,
				EndLocation: EndLocation,
			},
		});
	};

	// const handleUpdate = () => {
	// 	navigate(`/busroutes/update/${timetable._id}`, {
	// 		state: {
	// 			inspectionId: timetable.inspectionId,
	// 			routeId: timetable.routeId,
	// 			date: timetable.date,
	// 			time: timetable.time,
	// 			inspectorName: timetable.inspectorName,
	// 			enquiries: timetable.enquiries,
	// 		},
	// 	});
	// };

	return (
		<>
			<div class="overflow-x-auto">
				<div class="min-w-screen min-h-fit flex justify-center font-sans overflow-hidden mt-5 mb-10">
					<div class="w-full lg:w-5/6 h-fit">
						<>
						
							<div class="flex justify-center items-center  ">
								<div class="bg-white shadow-md rounded-2xl w-fit ">
									<table class="min-w-5/6 w-full table-auto">
										<thead>
											<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal w-full">
												<th class="py-3 px-6 text-center">
													Timetable ID
												</th>
												<th class="py-3 px-6 text-center">
													Vehicle No
												</th>
												<th class="py-3 px-6 text-center">
													Route ID
												</th>
												<th class="py-3 px-6 text-center">
													Date
												</th>

												<th class="py-3 px-20 text-center">
													Time
												</th>
												<th class="py-3 px-6 text-center">
													Start Location
												</th>
												<th class="py-3 px-6 text-center">
													End Location
												</th>
												<th class="py-3 px-6 text-center">
												
										<button
											
											class="bg-red-600 mx-32 mt-4 hover:bg-red-600 text-white font-bold py-2 px-16 rounded"
											type="submit"
											onClick={addTimetable}>
											Add New Timetable
										</button>
									
												</th>
												<th class="py-3 px-6 text-center">
													
												</th>
												<th class="py-3 px-6 text-center">
													
												</th>
                                                
											</tr>
										</thead>
										<tbody class="text-gray-600 text-sm font-light">
											{timetable.map((r) => (
												<>
													<tr class="border-b border-gray-200 hover:bg-gray-100">
														<td class="py-3 px-6 text-left">
															<div class="flex items-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			timetableID
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setTimetableID(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.timetableID
																		}
																	</span>
																)}
															</div>
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			vehicleNo
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setVehicleNo(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.vehicleNo
																		}
																	</span>
																)}
															</div>
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			routeId
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setRouteId(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.routeId
																		}
																	</span>
																)}
															</div>
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			date
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setDate(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.date.split(
																				"T",
																			)[0]
																		}
																	</span>
																)}
															</div>
														</td>

														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			time
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setTime(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.time.split(
																				"T",
																			)[0]
																		}
																	</span>
																)}
															</div>
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			startLocation
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setStartLocation(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.startLocation
																		}
																	</span>
																)}
															</div>
														</td>
														<td class="py-3 px-6 text-center">
															<div class="flex items-center">
																{updateClicked ? (
																	<input
																		type="text"
																		value={
																			EndLocation
																		}
																		className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																		onChange={(
																			e,
																		) =>
																			setEndLocation(
																				e
																					.target
																					.value,
																			)
																		}
																	/>
																) : (
																	<span>
																		{
																			r.EndLocation
																		}
																	</span>
																)}
															</div>
														</td>

														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																<EditOutlined
																	class="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
																	onClick={(
																		e,
																	) =>
																		handleUpdate(
																			r._id,
																			e,
																			r.timetableID,
																			r.vehicleNo,
																			r.routeId,
																			r.time,
																			r.date,
																			r.startLocation,
																			r.EndLocation,
																		)
																	}>
																	Edit
																</EditOutlined>
																<DeleteOutlined
																	className="text-red-800 text-lg pl-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
																	onClick={() => {
																		setConfirmDialog(
																			{
																				isOpen: true,
																				title: "Timetable",
																				subTitle:
																					"Are you sure you want to delete this Timetable?",
																				onConfirm:
																					() => {
																						handleDelete(
																							r._id,
																						);
																					},
																			},
																		);
																	}}
																/>
															</div>
														</td>
														
														<td class="py-3 px-6 text-center">
															<div class="flex items-center justify-center">
																<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
															</div>

															<div></div>
														</td>
													</tr>
												</>
											))}
										</tbody>
									</table>
									<div class="text-center lg:text-right mt-10">
										<button
											onClick={() => downLoadPdf()}
											class="bg-red-600 mx-32 mt-4 hover:bg-red-600 text-white font-bold py-2 px-16 rounded"
											type="submit">
											Get Reoprt
										</button>
									</div>
								</div>
							</div>
						</>
					</div>
				</div>
				<ConfirmDialog
					confirmDialog={confirmDialog}
					setConfirmDialog={setConfirmDialog}
				/>
			</div>

			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
};

export default TimetableTableView;
