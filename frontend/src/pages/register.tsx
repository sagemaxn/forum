import RegisterForm from "../components/RegisterForm";
import { useRouter } from "next/router";
import { Router } from "express";

const register = ({ loggedIn }) => {
  const router = useRouter();
  if (loggedIn) {
    router.push("/");
  }
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default register;
