import { useState } from "react";
import AuthLayout from "./AuthLayout";
import InputField from "./Input";
import Button from "./Button";

import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const SignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('handleChange called:', name, 'value:', value);
    
    setForm(prevForm => {
      const newForm = { ...prevForm, [name]: value };
      console.log('New form state:', newForm);
      return newForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic client side validation
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.password.length < 8) newErrors.password = "Min 8 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // temporary console log
      console.log("Signup payload:", form);
    }
  };

  console.log('Current form state:', form);

  return (
    <AuthLayout title="Sign Up">
      <div>
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

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" className="mx-auto block" onClick={handleSubmit}>
          Create Account
        </Button>
      </div>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </AuthLayout>
  );
};

export default SignupForm;
