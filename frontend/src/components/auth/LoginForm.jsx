import { useState } from "react";
import AuthLayout from "./AuthLayout";
import InputField from "./Input";
import Button from "./Button";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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

    // basic client side validation
    const newErrors = {};
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.password.length < 8) newErrors.password = "Min 8 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // temprory console log
      console.log("Signup payload:", form);
    }
  };

  return (
    <AuthLayout title="Login">
      <div >
        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit" onSubmit={handleSubmit} className="mx-auto block">Log In</Button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        New here?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Create an account
        </a>
      </p>
    </AuthLayout>
  );
};

export default LoginForm;
