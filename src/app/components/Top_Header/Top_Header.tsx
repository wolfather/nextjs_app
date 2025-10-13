'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function TopHeader() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (<>loading...</>);
    }
    if (status === 'authenticated') {
        return (
            <div>
                <div>
                    <Image
                        priority={true}
                        src={session.user?.image as string}
                        alt={session.user?.name as string}
                        width={40}
                        height={40}
                    />
                    <span>Olá {session.user?.name}</span>
                </div>
                <button onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sair</button>
            </div>
        )
    }

    return (
        <div>
            <button onClick={() => signIn('google')}>Logar</button>
        </div>
    );
}
