'use client';

import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";

type NextUIProviderProps = {
    children: React.ReactNode;
};

export default function Providers({children}: NextUIProviderProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider>

    );
}