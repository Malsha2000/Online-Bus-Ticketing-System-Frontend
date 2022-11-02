import React, { useState } from "react";
import InspectionTable from "../../Components/InspectionTableView";
import Header from "../../Components/Header";

import Footer from "../../Components/Footer";

const InspectionViewList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
   
            <Header toggle={toggle} />
            <div>
                <h1 className="text-black font-bold px-10 pt-5 mt-4 mb-6 text-5xl">
                    Inspection details
                </h1>
                <InspectionTable />
            </div>
            <Footer />
        </>
    );
};

export default InspectionViewList;
