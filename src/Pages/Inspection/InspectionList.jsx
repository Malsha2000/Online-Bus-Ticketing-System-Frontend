import React, { useState, useEffect } from "react";
//import InspectionCard from "../../Components/Inspection-card/index";
import Header from "../../Components/Header";
//import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../../Components/Footer";
import Notification from "../../Components/Notification/index";
import { useLocation, useNavigate } from "react-router-dom";
import "../Inspection/index.css";
import axios from "axios";
import InspectionCard from "../../Components/Inspection-card/index";

const InspectionList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const [inspections, setInspections] = useState([]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    useEffect(() => {
        const fetchInspections = async () => {
            const res = await axios.get("http://localhost:5000/api/inspection/all");
            setInspections(res.data);
            console.log(res.data);
        };
        fetchInspections();
    }, []);


    return (
        <>
            
            <Header toggle={toggle} />
            <div className="flex justify-center">
                <h1 className="text-black font-bold px-10 pt-5 text-5xl">
                    Inspection Details
                </h1>
                
            </div>
            <div className="w-full py-10 pl-28 gap-4 flex-wrap flex justify-start mt-10">
                {inspections.map((inspection) => (
                    <InspectionCard inspection={inspection} />
                ))}
            </div>
            <Notification notify={notify} setNotify={setNotify} />
            <Footer />
        </>
    );
};

export default InspectionList;

