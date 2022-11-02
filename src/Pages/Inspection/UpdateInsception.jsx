import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notification from "../../Components/Notification/index";

function UpdateInspection() {
	const [isOpen, setIsOpen] = useState(false);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const id = window.location.pathname.split("/")[3];
	let navigate = useNavigate();
	const location = useLocation();

	const [inspectionID, setInspectionID] = useState("");
	const [routeId, setRouteId] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [inspectorName, setInspectorName] = useState("");
	const [enquiries, setEnquiries] = useState("");

	useEffect(() => {
		const getData = async () => {
			console.log(id);
			setInspectionID(location.state.inspectionId);
			setRouteId(location.state.routeId);
			setDate(location.state.date);
			setTime(location.state.time);
			setInspectorName(location.state.inspectorName);
			setEnquiries(location.state.enquiries);
		};
		getData();
	}, [location]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = {
			inspectionID: inspectionID,
			routeId: routeId,
			// date: date,
			time: time,
			inspectorName: inspectorName,
			enquiries: enquiries,
		};
		console.log(id);
		try {
			await axios
				.put("http://localhost:5000/api/inspection/update/" + id, {
					inspectionID,
					routeId,
					time,

					inspectorName,
					enquiries,
				})
				.then((res) => {
					setNotify({
						isOpen: true,
						message: "Inspection updated successfully",
						type: "success",
					});
					setInspectionID("");
					setRouteId("");
					setDate("");
					setTime("");
					setInspectorName("");
					setEnquiries("");
					setInterval(() => {
						navigate("/inspections");
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
					Inspection Details
				</h1>
			</div>
			<div className="mx-96 w-1/2 ">
				<div className="bg-gray-100 shadow-md rounded p-5 mb-10">
					<form
						className="bg-white rounded px-8 pt-6 pb-8 mb-4"
						autoComplete="off"
						onSubmit={onSubmit}>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="username">
								Inspection ID
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-green-300 focus:shadow-outline"
								id="username"
								type="text"
								onChange={(e) =>
									setInspectionID(e.target.value)
								}
								value={inspectionID}
								placeholder=""
							/>
						</div>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="username">
								Route ID
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-green-300 focus:shadow-outline"
								id="username"
								type="text"
								onChange={(e) =>
									setRouteId(e.target.value)
								}
								value={routeId}
								placeholder=""
							/>
						</div>
						<div class="mb-4"></div>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="username">
								Time
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-green-300 focus:shadow-outline"
								id="username"
								type="text"
								onChange={(e) => setTime(e.target.value)}
								value={time}
								placeholder=""
							/>
						</div>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="username">
								Inspector Name
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-green-300 focus:shadow-outline"
								id="username"
								type="text"
								onChange={(e) =>
									setInspectorName(e.target.value)
								}
								value={inspectorName}
								placeholder=""
							/>
						</div>
						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="username">
								Enquiries
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-green-300 focus:shadow-outline"
								id="username"
								type="number"
								onChange={(e) =>
									setEnquiries(e.target.value)
								}
								value={enquiries}
								placeholder=""
							/>
						</div>
						<button
							type="submit"
							class="bg-red-600 mx-48 mt-4 hover:bg-red-700 text-white font-bold py-2 px-24 rounded">
							Save
						</button>
					</form>
				</div>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
			<Footer />
		</>
	);
}

export default UpdateInspection;
