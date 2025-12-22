import { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../common/Input";
import Button from "../common/Button";

import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const SignupForm = ({ onSubmit, loading = false }) => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prevForm => {
            const newForm = { ...prevForm, [name]: value };
            return newForm;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.includes("@")) newErrors.email = "Valid email required";
        if (form.password.length < 8) newErrors.password = "Min 8 characters";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(form)
        }
    };


    return (
        <AuthLayout title="Sign Up">
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <div className="relative">
                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
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

                {Object.values(errors).length > 0 && (
                    <ul className="text-red-400 text-sm space-y-1">
                        {Object.values(errors).map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                )}

                <Button type="submit" className="mx-auto block">
                    {loading ? "Sign Up..." : "Sign Up"}
                </Button>
            </form>
        </AuthLayout>

    );
};

export default SignupForm;
