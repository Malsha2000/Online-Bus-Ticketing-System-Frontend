import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

    return (
        <div className="w-1/5 rounded-lg transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <div className=" pt-2 px-2 bg-gray-100 h-[480px] p-10">
                <div className=""></div>
                

                <div className="p-2">
                    <h2 className="font-bold text-lg mb-2">
                        {inspection.inspectionId}
                    </h2>
                    <p className="text-sm text-justify text-gray-600">
                        {inspection.routeId}
                    </p>
                </div>
                <div>
                    <div>
                        <span className="text-gray-800 font-bold pl-2">
                            Date: {inspection.date.split("T")[0]}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-800 font-bold pl-2">
                            Time: {inspection.time}
                        </span>
                    </div>
                </div>
            </div>
            <a>
                <button
                    className="bg-red-600 w-full text-white font-bold py-2 px-4 rounded-b-lg"
                    onClick={() => callInspection(inspection._id)}>
                    View
                </button>
            </a>
        </div>
    );
}
