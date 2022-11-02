import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const navigate = useNavigate();

 	const [name, setName] = useState("");
    const [email, setEmail] = useState("");
	const [nicType, setNicType] = useState("");
	const [number, setNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
	const [type, setType] = useState("");


	const onSubmit = async (e) => {
		e.preventDefault();

		console.log(localStorage.getItem("authToken"));

		try {
			await axios
				.post("http://localhost:5000/api/user/add", {
					// headers: {
					// 	authToken: localStorage.getItem("authToken"),
					// },

					name: name,
					email: email,
                    nicType: nicType,
                    number: number,
					phoneNumber: phoneNumber,
					username: username,
					password: password,
                    type: type,
				})
				.then((res) => {
					console.log("add user res", res);
					navigate("/");
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
					REGISTER
				</h1>
                <h3>Create a new account</h3>
			</div>
			<div className="mx-96">
				<div className="bg-gray-100 shadow-md rounded p-5 mb-10">
					<form
						className="bg-white rounded px-8 pt-6 pb-8 mb-8 shadow-md"
						onSubmit={onSubmit}>
						<div class="mb-6">
									<label
										class="block text-gray-700 text-sm font-bold mb-2 text-left"
										for="EmpID">
										Full Name
									</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="firstname"
								type="text"
								placeholder=""
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="FirstName">
								Email Address
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="firstname"
								type="text"
								placeholder=""
								onChange={(e) =>
									setEmail(e.target.value)
								}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="LastName">
								NIC Type
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="lastname"
								type="text"
								placeholder=""
								onChange={(e) =>
									setNicType(e.target.value)
								}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="email">
								NIC / Passport Number
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="email"
								type="text"
								placeholder=""
								onChange={(e) => setNumber(e.target.value)}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="phonenumber">
								Phone Number
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="phonenumber"
								type="text"
								placeholder=""
								onChange={(e) =>
									setPhoneNumber(e.target.value)
								}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="NIC">
								Username
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-600 focus:shadow-outline"
								id="nic"
								type="text"
								placeholder=""
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="address">
								Password
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="address"
								type="text"
								placeholder=""
								onChange={(e) =>
									setPassword(e.target.value)
								}
								required
							/>
						</div>

						<div class="mb-6">
							<label
								class="block text-gray-700 text-sm font-bold mb-2 text-left"
								for="position">
								Are you a Passanger / Driver / Inspector
							</label>
							<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-red-300 focus:shadow-outline"
								id="position"
								type="text"
								placeholder=""
								onChange={(e) =>
									setType(e.target.value)
								}
								required
							/>
						</div>

						<div class="flex w-full items-center justify-center bg-grey-lighter">
							<button
								class="bg-red-600 mx-48 mt-4 hover:bg-red-600 text-white font-bold py-2 px-24 rounded"
								type="submit">
								Register
							</button>
						</div>
                        <p class="text-sm font-semibold mt-2 pt-1 mb-0">
										Don't have an account? 
										<a
											href="/"
											class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
											Login
										</a>
									</p>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Register;
