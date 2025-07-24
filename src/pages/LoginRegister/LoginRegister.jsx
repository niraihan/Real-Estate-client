import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import useTitle from "../../hooks/useTitle";
import { Player } from "@lottiefiles/react-lottie-player";
import { NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";
const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { createUser, signIn, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useTitle(isLogin ? "Login" : "Register");

    const onSubmit = async (data) => {
        const { email, password, name, image } = data;

        if (!isLogin) {
            if (!/[A-Z]/.test(password)) return toast.error("একটি বড় হাতের অক্ষর থাকা আবশ্যক!");
            if (!/[!@#$%^&*]/.test(password)) return toast.error("একটি special character থাকা আবশ্যক!");
            if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");

            try {
                await createUser(email, password);
                await axios.post("http://localhost:5000/users", { email, name, image, role: "user" });
                toast.success("Registration Successful!");
                navigate("/");
                reset();
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            try {
                await signIn(email, password);
                const res = await axios.post("http://localhost:5000/jwt", { email });
                localStorage.setItem("token", res.data.token);
                toast.success("Login Successful!");
                navigate("/");
                reset();
            } catch (err) {
                toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
            }
        }
    };

    const handleGoogleLogin = () => {
        googleLogin().then(async (result) => {
            const user = result.user;
            await axios.post("http://localhost:5000/users", {
                email: user.email,
                name: user.displayName,
                image: user.photoURL,
                role: "user"
            });
            const res = await axios.post("http://localhost:5000/jwt", { email: user.email });
            localStorage.setItem("token", res.data.token);
            toast.success("Google Login Successful");
            navigate("/");
        });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 bg-base-200">
            {/* Animation Section */}
            <div className="w-full lg:w-1/2 hidden lg:flex justify-center">
                <Player
                    autoplay
                    loop
                    src="https://assets10.lottiefiles.com/packages/lf20_zrqthn6o.json"
                    className="w-[300px] h-[300px]"
                />
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 max-w-md bg-base-100 shadow-xl rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {isLogin ? "Welcome Back!" : "Create an Account"}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {!isLogin && (
                        <>
                            <input {...register("name")} className="input input-bordered w-full" placeholder="Full Name" />
                            <input {...register("image")} className="input input-bordered w-full" placeholder="Photo URL" />
                        </>
                    )}

                    <input
                        {...register("email", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Email"
                        type="email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">ইমেইল আবশ্যক</p>}

                    <input
                        {...register("password", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Password"
                        type="password"
                    />
                    {errors.password && <p className="text-red-500 text-sm">পাসওয়ার্ড আবশ্যক</p>}

                    <button className="btn btn-primary w-full" type="submit">
                        {isLogin ? "Login" : "Register"}
                    </button>

                    {isLogin && (
                        <div className="text-right">
                            <NavLink to="/forgot-password" className="text-sm text-blue-600 hover:underline transition">
                                🔐 Forgot your password?
                            </NavLink>
                        </div>
                    )}

                    <div className="divider">OR</div>

                    <button onClick={handleGoogleLogin} type="button" className="btn btn-outline w-full">
                        <FcGoogle />    Continue with Google
                    </button>

                    <p className="text-center mt-4">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            className="text-blue-600 ml-2 underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
