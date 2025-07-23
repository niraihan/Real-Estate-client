import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { createUser, login, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password, name, image } = data;

        if (!isLogin) {
            // Registration
            if (!/[A-Z]/.test(password)) return toast.error("একটি বড় হাতের অক্ষর থাকা আবশ্যক!");
            if (!/[!@#$%^&*]/.test(password)) return toast.error("একটি special character থাকা আবশ্যক!");
            if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");

            try {
                await createUser(email, password);
                // আপনার backend এ user save করুন
                await axios.post("http://localhost:5000/users", { email, name, image, role: "user" });
                toast.success("Registration Successful!");
                navigate("/");
                reset();
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            // Login
            try {
                await login(email, password);
                toast.success("Login Successful!");
                navigate("/");
                reset();
            } catch (err) {
                toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
            }
        }
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(async result => {
                const user = result.user;
                await axios.post("http://localhost:5000/users", {
                    email: user.email,
                    name: user.displayName,
                    image: user.photoURL,
                    role: "user"
                });
                toast.success("Google Login Successful");
                navigate("/");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-3 rounded shadow bg-white">
                <h1 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Register"}</h1>

                {!isLogin && (
                    <>
                        <input {...register("name")} className="input input-bordered w-full" placeholder="Name" />
                        <input {...register("image")} className="input input-bordered w-full" placeholder="Image URL" />
                    </>
                )}

                <input {...register("email", { required: true })} className="input input-bordered w-full" placeholder="Email" />
                <input {...register("password", { required: true })} type="password" className="input input-bordered w-full" placeholder="Password" />

                <button className="btn btn-primary w-full" type="submit">
                    {isLogin ? "Login" : "Register"}
                </button>

                <button onClick={handleGoogleLogin} type="button" className="btn btn-outline w-full">Continue with Google</button>

                <p className="text-center mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" className="text-blue-600 ml-2" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginRegister;
