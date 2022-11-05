import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notification from "../Components/Notification";

function TimetableAdd() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const [open, setOpen] = useState(false);

	const handletime = (newTime) => {
		setTime(newTime);
	};

	const navigate = useNavigate();

	const [timetableID, setTimetableID] = useState("");
	const [vehicleNo, setVehicleNo] = useState("");
	const [routeId, setRouteId] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState(new Date());
	const [startLocation, setStartLocation] = useState("");
	const [EndLocation, setEndLocation] = useState("");
	const [timetable, setTimetable] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();


		try {
			await axios
				.post("http://localhost:5000/api/busroutes/add", {
					
					vehicleNo: vehicleNo,
					routeId: routeId,
					time: time,
					date: date,
					startLocation: startLocation,
					EndLocation: EndLocation,
				})
				.then((res) => {
					setNotify({
						isOpen: true,
						message: "Bus route timetable added successfully",
						type: "success",
					});
					setInterval(() => {
						navigate("/busroutes/all");
					}, 2500);

				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header toggle={toggle} />
			<div className="text-center py-5">
				<h1 className="font-bold text-5xl text-black">
					TIMETABLE DETAILS
				</h1>
			</div>
			<div className="mx-96">
				<div className="bg-gray-100 shadow-md rounded p-5 mb-10">
					<form
						className="bg-white rounded px-8 pt-6 pb-8 mb-8 shadow-md"
						onSubmit={onSubmit}>
						{/* <div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="Timetable ID">
								Timetable ID
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="Timetable ID"
								type="text"
								placeholder=""
								onChange={(e) =>
									setTimetableID(e.target.value)
								}
								required
							/>
						</div> */}

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="Vehicle No">
								Vehicle No.
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="Vehicle No"
								type="text"
								placeholder=""
								onChange={(e) =>
									setVehicleNo(e.target.value)
								}
								required
							/>
						</div>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="Route ID">
								Route ID
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="Route ID"
								type="text"
								placeholder=""
								onChange={(e) =>
									setRouteId(e.target.value)
								}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="LastName">
								Date
							</label>
							<DatePicker
								selected={date}
								onChange={(date) => setDate(date)}
								style={{
									background: "transparent",
									border: "none",
									borderBottom: "2px solid #265673",
									marginTop: "10px",
									width: "100%",
									color: "#265673",
								}}
							/>
							{/* <DatePicker selected={date} onChange={(start_date:Date) => setDate(date)} /> */}
							{/* <input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="lastname"
								type="text"
								placeholder=""
								onChange={(e) =>
									setDate(e.target.value)
								}
								required
							/> */}
						</div>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="email">
								Time
							</label>

							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="email"
								type="text"
								placeholder=""
								onChange={(e) => setTime(e.target.value)}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="StartLocation">
								Start Location
							</label>

							<select
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="StartLocation"
								type="text"
								placeholder=""
								onChange={(e) =>
									setStartLocation(e.target.value)
								}
								required>
								<option value="Select the Test Name You want to do">
									Select The Start Location{" "}
								</option>
								<option value="Kaduwela">
									Kaduwela
								</option>
								<option value="Hanwella">Hanwella</option>
								<option value="Kirindiwela">
									Kirindiwela
								</option>
								<option value="Homagama">
									Homagama
								</option>
								<option value="Padukka">Padukka</option>
								<option value="Pettah">Pettah</option>
								<option value="Gampaha">Gampaha</option>
								<option value="Panadura">
									Panadura
								</option>
								<option value="Kandy">
									Kandy
								</option>
								<option value="Kurunagala">
									Kurunagala
								</option>
								<option value="Nittabuwa">
									Nittabuwa
								</option>
								<option value="Aissawella">Aissawella</option>
							</select>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="End Location">
								End Location
							</label>
							<select
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="EndLocation"
								type="text"
								placeholder=""
								onChange={(e) =>
									setEndLocation(e.target.value)
								}
								required>
								<option value="Select the Test Name You want to do">
									Select The End Location{" "}
								</option>
								<option value="Kaduwela">
									Kaduwela
								</option>
								<option value="Hanwella">Hanwella</option>
								<option value="Kirindiwela">
									Kirindiwela
								</option>
								<option value="Homagama">
									Homagama
								</option>
								<option value="Padukka">Padukka</option>
								<option value="Pettah">Pettah</option>
								<option value="Gampaha">Gampaha</option>
								<option value="Panadura">
									Panadura
								</option>
								<option value="Kandy">
									Kandy
								</option>
								<option value="Kurunagala">
									Kurunagala
								</option>
								<option value="Nittabuwa">
									Nittabuwa
								</option>
								<option value="Aissawella">Aissawella</option>
							</select>
						</div>

						<div class="flex w-full items-center justify-center bg-grey-lighter">
							<button
								class="bg-red-600 mx-32 mt-4 hover:bg-red-600 text-white font-bold py-2 px-16 rounded"
								type="submit">
								Submit
							</button>
							
						</div>
					</form>
				</div>
			</div>
			<Footer />
			<Notification notify={notify} setNotify={setNotify} />
		</>
	);
}

export default TimetableAdd;
