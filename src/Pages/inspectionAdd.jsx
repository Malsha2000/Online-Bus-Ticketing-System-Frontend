import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AdvertiserForm = () => {
	const [listOfinspection, setListOfinspection] = useState([]);
	const [routeId, setRouteId] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState(new Date());
	const [inspectorName, setInspectorName] = useState("");
	const [enquiries, setEnquiries] = useState("");
	const [inspections, setInspections] = useState("");
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
		if (!routeId) {
			errors.routeId = "routeId is required!";
		}
		if (!time) {
			errors.time = "time is required!";
		}
		if (!date) {
			errors.date = "date is required!";
		}
		if (!inspectorName) {
			errors.inspectorName = "inspectorName is required!";
		}

		if (!enquiries) {
			errors.enquiries = "enquiries is required!";
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
			.post("http://localhost:5000/api/inspection/add", {
				routeId,
				time,
				date,
				inspectorName,
				enquiries,
			})
			.then((response) => {
				setListOfinspection([
					...listOfinspection,
					{
						routeId,
						time,
						date,
						inspectorName,
						enquiries,
					},
				]);
			});
		swal({
			title: "Inspection Added Successfuly!",
			icon: "success",
			confirmButtonText: "OK",
		}).then(function () {
			// Redirect the user
			window.location.href = "/inspection/all";
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
				Advertiser Form
			</h1>
			<br />
			<div className="text-4xl text-bold text-black">
			<h1>Add Inspection Details</h1>
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
							routeId
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
							<p class="alert-txt" style={{color:"red"}}>{formErrors.routeId}</p>
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
							<p class="alert-txt" style={{color:"red"}}>{formErrors.time}</p>
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
							<p class="alert-txt" style={{color:"red"}}>{formErrors.date}</p>
						</div>
					</div>
					<div className="row mb-3">
						<label
							for="inputEmail3"
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							InspectorName
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setInspectorName(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{color:"red"}}>
								{formErrors.inspectorName}
							</p>
						</div>
					</div>
					<div className="row mb-3">
						<label
							for="inputEmail3"
							class="col-sm-2 col-form-label"
							style={{ color: "#000000" }}>
							Enquiries
						</label>
						<div className="col-sm-10">
							<input
								style={{ backgroundColor: "#D3D3D3" }}
								type="text"
								className="form-control"
								required
								onChange={(e) => {
									setEnquiries(e.target.value);
								}}
							/>
							<p class="alert-txt" style={{color:"red"}}>{formErrors.enquiries}</p>
						</div>
					</div>

					<div class="row justify-content-end" id="add-btn">
						<center>
							<Link to="/inspection/all">
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
