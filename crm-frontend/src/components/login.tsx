import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "./input";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/services/login";
import { RootState } from "@/store";

type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required("Lütfen email giriniz"),
  password: yup.string().required("Lütfen password giriniz"),
});

const defaultValues: FormValues = {
  email: "test@xyz.com",
  password: "123456",
};

const Login = () => {
  const [login] = useLoginMutation();
  
  // ** State
  const [loginError, setLoginError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const router = useRouter();

  const onSubmit = (payload: FormValues) => {
    login(payload)
      .unwrap()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setLoginError(error.data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
          <div className="w-full md:w-1/2 px-1">
            <Input
              type="text"
              placeholder="Email"
              className="mt-1"
              rounded="rounded-2xl"
              {...register("email", { required: true })}
            />
            {errors.email && <>{errors.email.message}</>}
          </div>
          <div className="w-full md:w-1/2 px-1">
            <Input
              type="text"
              placeholder="Password"
              className="mt-1"
              rounded="rounded-2xl"
              {...register("password", { required: true })}
            />
            {errors.password && <>{errors.password.message}</>}
          </div>
          <div className="w-full md:w-2/2 px-1">
            <div>{loginError}</div>
            <button type="submit">Gönder</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
