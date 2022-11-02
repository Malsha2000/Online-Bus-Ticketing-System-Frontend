/* eslint-disable no-const-assign */
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Notification from "../Components/Notification/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InspectionTableView = () => {
	const [inspections, setInspections] = useState([]);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const [updateClicked, setUpdateClicked] = useState(false);
	const [routeId, setRouteId] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [inspectorName, setInspectorName] = useState("");

	useEffect(() => {
		const fetchInspections = async () => {
			const res = await axios.get(
				"http://localhost:5000/api/inspection/all",
			);
			setInspections(res.data);
			console.log(res.data);
		};
		fetchInspections();
	}, []);
	let navigate = useNavigate();

	const columns = [
		{ title: "Route ID", field: "routeId" },
		{ title: "Date", field: "date" },
		{ title: "Time", field: "time" },
		{ title: "Inspector Name", field: "inspectorName" },
	];




	const downLoadPdf = () => {
		const doc = new jsPDF();
		doc.text(" All Inspection Details", 50, 10);
		doc.autoTable({
			columns: columns.map((col) => ({
				...col,
				dataKey: col.field,
			})),
			body: inspections,
		});
		doc.save("All Inspection Details");
	};

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
													Route ID
												</th>
												<th class="py-3 px-6 text-center">
													Date
												</th>

												<th class="py-3 px-20 text-center">
													Time
												</th>
												<th class="py-3 px-6 text-center">
													Inspector Name
												</th>
												<th class="py-3 px-6 text-center">
													Verification
												</th>
											</tr>
										</thead>
										<tbody class="text-gray-600 text-sm font-light">
											{inspections.map(
												(inspection) => (
													<>
														<tr class="border-b border-gray-200 hover:bg-gray-100">
															<td class="py-3 px-6 text-left">
																<div class="flex items-center">
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
																				inspection.routeId
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
																				inspection.date.split(
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
																				date
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
																				inspection.time.split(
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
																				inspectorName
																			}
																			className="rounded-sm focus:outline-1 focus:outline-red-500 focus:shadow-outline"
																			onChange={(
																				e,
																			) =>
																				setInspectorName(
																					e
																						.target
																						.value,
																				)
																			}
																		/>
																	) : (
																		<span>
																			{
																				inspection.inspectorName
																			}
																		</span>
																	)}
																</div>
															</td>

															<td class="py-3 px-6 text-center">
																<div class="flex items-center justify-center">
																	<button class="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
																		Verify
																	</button>
																</div>
															</td>
														</tr>
													</>
												),
											)}
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
			</div>

			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
};

export default InspectionTableView;
