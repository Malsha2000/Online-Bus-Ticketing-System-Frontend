import React, { useState } from "react";
import TimetableTable from "../../Components/TimetableTableView";
import Header from "../../Components/Header";

import Footer from "../../Components/Footer";

const TimetableViewList = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<>
			<Header toggle={toggle} />
			<div>
				<h1 className="text-black font-bold px-10 pt-5 mt-4 mb-6 text-5xl">
					Timetable details
				</h1>
				<TimetableTable />
			</div>
			<Footer />
		</>
	);
};

export default TimetableViewList;
