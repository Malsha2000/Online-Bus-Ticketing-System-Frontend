import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
//import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../Components/Footer";

function InspectionStart() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    let navigate = useNavigate();

    const [inspectionId, setInspectionID] = useState("");
    const [routeId, setRouteId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [inspectorName, setInspectorName] = useState("");

    useEffect(() => {
        const getData = async () => {
            setInspectionID(location.state.inspectionId);
            setRouteId(location.state.routeId);
            setTime(location.state.time);
            setDate(location.state.date);
            setInspectorName(location.state.inspectorName);

        };
        getData();
    }, [location]);

    console.log(inspectionId);

    return (
        <>
        
            <Header toggle={toggle} />

        <div className="">
            <div className="w-full rounded-lg shadow-lg hover:shadow-2xl">
                <div className=" pt-2 px-2 bg-gray-100 p-10">
                    <div className=""></div>
                    

                    <div>
                        <div>
                    <span className="text-gray-800 font-bold pl-2">
                            Inspection ID: {inspectionId}
                            </span>
                            </div>
                            <div>
                            <span className="text-gray-800 font-bold pl-2">
                            Route ID: {routeId}
                            </span>
                            </div>
                        <div>
                            <span className="text-gray-800 font-bold pl-2">
                            Date: {date}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-800 font-bold pl-2">
                                Time: {time}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-800 font-bold pl-2">
                            Inspector Name: {inspectorName}
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
        </>

        
    );
}

export default InspectionStart;
