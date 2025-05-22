"use client";

import Link from "next/link";
import { useState } from "react";

import { LoadingSpinner } from "@/components/ui/LoadingSpin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
    confirmPasword: "",
  });

  const handleSubmit = () => {
    setIsLoading(true);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(userForm);

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

            <form action={handleSubmit} className="flex flex-col w-full">
              <Input
                label="Your Name"
                type="text"
                value={userForm.name}
                onChange={handleChangeInput}
                name="name"
              />

              <Input
                label="Your Last Name"
                type="text"
                value={userForm.lastName}
                onChange={handleChangeInput}
                name="lastName"
              />

              <Input
                label="Your Email"
                type="email"
                value={userForm.email}
                onChange={handleChangeInput}
                name="email"
              />

              <Input
                label="Password"
                type="password"
                value={userForm.password}
                onChange={handleChangeInput}
                name="password"
              />

              <Input
                label="Confirm Pasword"
                type="password"
                value={userForm.confirmPasword}
                onChange={handleChangeInput}
                name="confirmPasword"
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
