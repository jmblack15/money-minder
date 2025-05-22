"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { LoadingSpinner } from "@/components/ui/LoadingSpin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type FormErrors = {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPasword?: string;
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [userForm, setUserForm] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
    confirmPasword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setFormErrors(validateErrors);
      return;
    }
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MONEY_MINDER_API}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userForm.name,
            lastName: userForm.lastName,
            email: userForm.email,
            password: userForm.password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validate = () => {
    const errors: FormErrors = {};

    if (!userForm.name.trim()) errors.name = "Name is required";
    if (!userForm.lastName.trim()) errors.lastName = "Name is required";
    if (!userForm.email.includes("@")) errors.email = "Email is invalid";
    if (userForm.password !== userForm.confirmPasword)
      userForm.confirmPasword = "Passwords do not match";

    return errors;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormErrors({});
  }, [userForm]);

  return (
    <section className="bg-background h-screen flex flex-col items-center justify-center">
      <div className="bg-white  w-[375px] h-[700px] rounded-md shadow p-6 flex flex-col justify-evenly items-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-primary">
              Create an Account
            </h2>
            <p className="text-sm text-center">
              Enter your personal details to create account
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <Input
                label="Your Name"
                type="text"
                value={userForm.name}
                onChange={handleChangeInput}
                name="name"
                error={!!formErrors.name}
                errorMessage={formErrors.name}
              />

              <Input
                label="Your Last Name"
                type="text"
                value={userForm.lastName}
                onChange={handleChangeInput}
                name="lastName"
                error={!!formErrors.lastName}
                errorMessage={formErrors.lastName}
              />

              <Input
                label="Your Email"
                type="email"
                value={userForm.email}
                onChange={handleChangeInput}
                name="email"
                error={!!formErrors.email}
                errorMessage={formErrors.email}
              />

              <Input
                label="Password"
                type="password"
                value={userForm.password}
                onChange={handleChangeInput}
                name="password"
                error={!!formErrors.password}
                errorMessage={formErrors.password}
              />

              <Input
                label="Confirm Pasword"
                type="password"
                value={userForm.confirmPasword}
                onChange={handleChangeInput}
                name="confirmPasword"
                error={!!formErrors.confirmPasword}
                errorMessage={formErrors.confirmPasword}
              />

              <Button type="submit" variant="primary">
                Create Account
              </Button>
            </form>

            <p className="text-sm mt-3">
              Already have an account?{" "}
              <Link className="text-blue-600" href="/">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
