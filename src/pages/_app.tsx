"use client";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "  /styles/globals.css";
import AuthWrapper from "  /auth/AuthWrapper";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import { useEffect } from "react";
import { ToastProvider } from "  /Context/ToastContext";
import 'material-symbols';
import 'primeicons/primeicons.css';
        

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <PrimeReactProvider>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </PrimeReactProvider>
      </ToastProvider>
    </SessionProvider>
  );
};

export default MyApp;
