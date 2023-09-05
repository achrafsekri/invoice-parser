import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/router";
import { publicRoutes } from "../shared/constants";
import axios from "axios";
import { getToken } from "  /shared/apiCalls";

interface Props {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
  const router = useRouter();
  const session = useSession();
  const getCsrfToken = getToken().catch(() => {
    console.log("getCsrfToken failed");
  });
  if (session.status === "loading") {
    return <div>loading... </div>;
  }
  if (
    session.status === "unauthenticated" &&
    !publicRoutes.includes(router.pathname)
  ) {
    signIn().catch(() => {
      console.log("Sign in failed");
    });
    return <div>Redirecting...</div>;
  }
  if (
    session.status === "authenticated" ||
    publicRoutes.includes(router.pathname)
  ) {
    return <>{children}</>;
  }
};

export default AuthWrapper;
