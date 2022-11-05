import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Notification from "../../Components/Notification/index";
import ConfirmDialog from "../ConfirmDialog/index";

export default function InspectionCard({ inspection }) {
	let navigate = useNavigate();

	const callInspection = (id) => {
		console.log("clicked");
		navigate("/inspection/start/" + id, {
			state: {
				inspectionId: inspection.inspectionId,
				routeId: inspection.routeId,
				date: inspection.date,
				time: inspection.time,
			},
		});
	};

	const handleUpdate = () => {
		navigate(`/inspection/update/${inspection._id}`, {
			state: {
				inspectionId: inspection.inspectionId,
				routeId: inspection.routeId,
				date: inspection.date,
				time: inspection.time,
				inspectorName: inspection.inspectorName,
				enquiries: inspection.enquiries,
			},
		});
	};

	const handleDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		axios
			.delete(`http://localhost:5000/api/inspection/delete/${id}`, {
				headers: {
					authToken: localStorage.getItem("authToken"),
				},
			})
			.then((res) => {
				console.log("Inspection deleted");
				window.location.reload();
				setNotify({
					isOpen: true,
					message: "Inspection deleted successfully",
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

	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});

	return (
		<div className="w-1/5 rounded-lg transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
			<div className=" pt-2 px-2 bg-gray-100 h-[275px] p-10">
				<div className=""></div>

				<div className="p-2 mt-5">
					<span className="text-gray-800 font-bold pl-2">
						InspectionID: {inspection.inspectionId}
					</span>
				</div>
				<div className="p-2">
					<span className="text-gray-800 font-bold pl-2">
						Route ID: {inspection.routeId}
					</span>
				</div>

				<div>
					<div className="p-2">
						<span className="text-gray-800 font-bold pl-2">
							Date: {inspection.date.split("T")[0]}
						</span>
					</div>
					<div className="p-2">
						<span className="text-gray-800 font-bold pl-2">
							Time: {inspection.time}
						</span>
					</div>
				</div>
			</div>

			<div>
				<DeleteOutlined
					className="text-red-800 text-lg pl-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
					onClick={() => {
						setConfirmDialog({
							isOpen: true,
							title: "Inspection",
							subTitle:
								"Are you sure you want to delete this Inspection?",
							onConfirm: () => {
								handleDelete(inspection._id);
							},
						});
					}}
				/>
				<EditOutlined
					className="text-green-600 text-lg ml-52 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
					onClick={handleUpdate}
				/>
			</div>
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}
