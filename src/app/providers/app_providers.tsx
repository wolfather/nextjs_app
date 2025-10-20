'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from 'react-redux'
import { store } from "../redux/store/store";
import type { Session } from "next-auth";

type Props = {
    children: ReactNode,
    session: Session | null,
}
export function AppProviders({children, session}: Props) {
    return (
        <SessionProvider session={session}>
            <ReduxProvider store={store() || {}}>
                {children}
            </ReduxProvider>
        </SessionProvider>
    );
}
