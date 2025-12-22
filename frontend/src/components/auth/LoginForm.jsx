import { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../common/Input";
import Button from "../common/Button";
import { Eye, EyeOff } from "lucide-react";

import { Link } from "react-router-dom"

const LoginForm = ({ onSubmit, loading = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = ({ email, password }) => {
        const newErrors = {};
        if (!email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!password?.trim()) {
            newErrors.password = "Password is required";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm({ email, password });
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({ email, password });
        }
    };


    return (
        <AuthLayout title="Login">
            <form  onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    error={errors.email}
                />
                <div className="relative">
                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        error={errors.password}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-10 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>


                <Button type="submit" className="mx-auto block" disable={loading}>{loading ? "Logging in..." : "Log In"}</Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                New here?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Create an account
                </Link>
            </p>
        </AuthLayout>
    );
};

export default LoginForm;
