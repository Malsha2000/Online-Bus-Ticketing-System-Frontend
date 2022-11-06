import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AdvertiserForm = () => {
	const [listOftimetable, setListOftimetable] = useState([]);
	const [timetableID, setTimetableID] = useState("");
	const [vehicleNo, setVehicleNo] = useState("");
	const [routeId, setRouteId] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState(new Date());
	const [startLocation, setStartLocation] = useState("");
	const [EndLocation, setEndLocation] = useState("");
	const [timetable, setTimetable] = useState("");
	const [errors, setErrors] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate());
		setIsSubmit(true);
		sub();
	};

	const validate = () => {
		const errors = {};
		if (!vehicleNo) {
			errors.vehicleNo = "vehicleNo is required!";
		}
		if (!routeId) {
			errors.routeId = "routeId is required!";
		}
		if (!time) {
			errors.time = "time is required!";
		}
		if (!date) {
			errors.date = "date is required!";
		}

		if (!startLocation) {
			errors.startLocation = "startLocation is required!";
		}
		if (!EndLocation) {
			errors.EndLocation = "EndLocation is required!";
		}

		return errors;
	};

	const sub = () => {
		if (Object.keys(formErrors).length == 0 && isSubmit) {
			createAd();
		}
	};

	const createAd = () => {
		axios
			.post("http://localhost:5000/api/busroutes/add", {
				vehicleNo,
				routeId,
				time,
				date,
				startLocation,
				EndLocation,
			})
			.then((response) => {
				setListOftimetable([
					...listOftimetable,
					{
						vehicleNo,
						routeId,
						time,
						date,
						startLocation,
						EndLocation,
					},
				]);
			});
		swal({
			title: "Bus Routes Timetable Added Successfuly!",
			icon: "success",
			confirmButtonText: "OK",
		}).then(function () {
			// Redirect the user
			window.location.href = "/busroutes/all";
		});
	};

	return (
		<div
			className="text-center py-5"
			style={{
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}>
			<br />
			<h1
				style={{
					fontFamily: "Georgia",
					fontSize: "100px",
					textAlign: "center",
					color: "white",
				}}>
				Timetable Form
			</h1>
			<br />
			<div className="text-4xl text-bold text-black">
			<h1>Bus Route Shedule Time Table</h1>
			</div>
			<div style={{ backgroundColor: "black" }}></div>
			<div
				className="col-md-8 mt-4 mx-auto"
				style={{
					fontWeight: "bold",
					fontFamily: "sans-serif",
					borderRadius: "30px",
					border: "3px solid red",
					margin: "2px",
				}}>
				<br />
				
				<form style={{ margin: "20px" }}>
					<br />

					<div className="row mb-3">
						<label
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							Vehicle No.
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setVehicleNo(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{ color: "red" }}>
								{formErrors.vehicleNo}
							</p>
						</div>
					</div>
					<div className="row mb-3">
						<label
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							Route ID
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setRouteId(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{ color: "red" }}>
								{formErrors.routeId}
							</p>
						</div>
					</div>

					<div className="row mb-3">
						<label
							for="inputEmail3"
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							Time
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setTime(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{ color: "red" }}>
								{formErrors.time}
							</p>
						</div>
					</div>
					<div className="row mb-3">
						<label
							for="inputEmail3"
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							Date
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setDate(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{ color: "red" }}>
								{formErrors.date}
							</p>
						</div>
					</div>
					<div className="row mb-3">
						<label
							for="inputEmail3"
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							Start Location
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setStartLocation(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{ color: "red" }}>
								{formErrors.startLocation}
							</p>
						</div>
					</div>
					<div className="row mb-3">
						<label
							for="inputEmail3"
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							End Location
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setEndLocation(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{ color: "red" }}>
								{formErrors.EndLocation}
							</p>
						</div>
					</div>

					<div class="row justify-content-end" id="add-btn">
						<center>
							<Link to="/busroutes/all">
								{" "}
								<button
									type="button"
									onClick={handleSubmit}
									class="btn-block btn-primary"
									style={{
										backgroundColor: "#1bb004",
										padding: "5px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}>
									Submit
								</button>
							</Link>{" "}
						</center>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AdvertiserForm;
