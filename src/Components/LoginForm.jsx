import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Notification from "../Components/Notification/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	// if (isLoggedIn) {
	// 	localStorage.setItem("loggedIn", true);
	// }

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/login/", {
				username: username,
				password: password,
			})
			.then((result) => {
				console.log({ result });
				setNotify({
					isOpen: true,
					message: "Login Successful",
					type: "success",
				});
				localStorage.setItem("authToken", result.data.authToken);
				localStorage.setItem("isLoggedIn", true);

				setUsername("");
				setPassword("");
				setIsLoggedIn(true);
				setInterval(() => {
					// navigate("/");
				}, 2500);
			});
	};

	return (
		<div>
			<Header />
			<section class="h-screen">
				<div class="px-6 h-full text-gray-800">
					<div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
						<div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
							<img
								src="https://mytechvisor.com/img/my/login.svg"
								class="w-50 ml-40"
								alt="Sample image"
							/>
						</div>
						<div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
							<form>
								<div class="flex flex-row items-center justify-center lg:justify-start text-red-600">
									<p class="text-4xl mb-0 mr-4">
										WELCOME BACK
									</p>
								</div>
								<div class="flex flex-row items-center justify-center lg:justify-start">
									<h3>Login to your account</h3>
								</div>
								<div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

								<div class="mb-6">
									<input
										type="text"
										class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
										id="exampleFormControlInput2"
										placeholder="Email / Username"
										onChange={(e) =>
											setUsername(e.target.value)
										}
										required
									/>
								</div>

								<div class="mb-6">
									<input
										type="password"
										class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
										id="exampleFormControlInput2"
										placeholder="Password"
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
									/>
								</div>
								<a
									href="/user/add"
									class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-60">
									Forgot Password ?
								</a>
								<div class="text-center lg:text-left">
									<button
										type="submit"
										onClick={onSubmit}
										class="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
										Login
									</button>
									<p class="text-sm font-semibold mt-2 pt-1 mb-0">
										Don't have an account?
										<a
											href="/user/add"
											class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
											Register
										</a>
									</p>
								</div>
							</form>
						</div>
					</div>
					<Notification notify={notify} setNotify={setNotify} />
				</div>
			</section>
			<Footer />
		</div>
	);
}
