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

function InspectionAdd() {
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

	const [inspectionID, setInspectionID] = useState("");
	const [routeId, setRouteId] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState(new Date());
	const [inspectorName, setInspectorName] = useState("");
	const [enquiries, setEnquiries] = useState("");
	const [inspections, setInspections] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios
				.post("http://localhost:5000/api/inspection/add", {
					routeId: routeId,
					time: time,
					date: date,
					inspectorName: inspectorName,
					enquiries: enquiries,
				})
				.then((res) => {
					setNotify({
						isOpen: true,
						message: "Inspection added successfully",
						type: "success",
					});
					setInterval(() => {
						navigate("/inspection/all");
					}, 2500);

					// console.log("add user res", res);
					// navigate("/inspection/all");
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
					INSPECTION DETAILS
				</h1>
			</div>
			<div className="mx-96">
				<div className="bg-gray-100 shadow-md rounded p-5 mb-10">
					<form
						className="bg-white rounded px-8 pt-6 pb-8 mb-8 shadow-md"
						onSubmit={onSubmit}>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="FirstName">
								Route Id
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="firstname"
								type="text"
								placeholder=""
								onChange={(e) =>
									setRouteId(e.target.value)
									
								}
								
								required
							/>
							
						</div>

						<div class="mb-6 w-full">
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
								for="phonenumber">
								Inspector Name
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="phonenumber"
								type="text"
								placeholder=""
								onChange={(e) =>
									setInspectorName(e.target.value)
								}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="NIC">
								Enquiries
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-600 focus:shadow-outline"
								id="nic"
								type="text"
								placeholder=""
								onChange={(e) =>
									setEnquiries(e.target.value)
								}
								required
							/>
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

export default InspectionAdd;
