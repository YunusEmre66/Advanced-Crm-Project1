// import { AppDispatch } from "@/store";
import React, { ReactNode, createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIsLogin, logout } from "@/store/apps/login";
import { useRouter } from "next/router";

// ** Defaults
const defaultProvider: any = {
  user: null,
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext(defaultProvider);

export function AuthProvider({ children }: Props) {
  // ** Redux
  // const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // useEffect(() => {
  //   if (router.asPath === "/logout") {
  //     dispatch(logout());
  //     router.push('/login')
  //   }
  // }, [router, dispatch]);

  // useEffect(() => {
  //   dispatch(getIsLogin());
  // }, [dispatch, router]);

  const sharedData = "Context API Kullanımı";

  return (
    <AuthContext.Provider value={sharedData}>{children}</AuthContext.Provider>
  );
}

// Consumer Hook
export function useAuthContext() {
  return useContext(AuthContext);
}
