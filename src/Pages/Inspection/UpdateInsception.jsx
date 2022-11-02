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
                    // headers: {
                    //     authToken: localStorage.getItem("authToken"),
                    // },
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
                        <div class="mb-4">
                            {/* <label
                                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                                for="username">
                                Date
                            </label> */}
                            {/* <div class="relative flex">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10">
                                    <svg
                                        class="w-5 h-5 text-gray-700 dark:text-gray-400 top-10"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <DatePicker
                                    className="shadow appearance-none border rounded w-full py-2 pr-3 pl-10 text-gray-700 leading-tight focus:outline-1 focus:outline-green-300 focus:shadow-outline"
                                    selected={date}
                                    required
                                    onChange={(date) => setDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                />
                            </div> */}
                        </div>
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
