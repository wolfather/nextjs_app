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
            <div className="flex justify-between bg-gray-300 p-2">
                <div className="flex w-1/4 max-w-2/5 items-center">
                    <Image
                        className="mr-3"
                        priority={true}
                        quality={80}
                        src={session.user?.image as string}
                        alt={session.user?.name as string}
                        width={40}
                        height={40}
                    />
                    <span className="font-medium text-sm align-middle">Olá {session.user?.name}</span>
                </div>
                <button
                    className="cursor-pointer ease-in bg-gray-700 py-2 px-4 hover:bg-gray-600 text-gray-300 rounded-md" 
                    onClick={() => signOut({callbackUrl: process.env.BASE_URL})}>Sair</button>
            </div>
        )
    }

    return (
        <div className="flex justify-between bg-gray-300 p-2">
            <div className="flex w-1/4 max-w-2/5 items-center"></div>
            <button 
                className="place-self-end cursor-pointer ease-in bg-gray-700 py-2 px-4 hover:bg-gray-600 text-gray-300 rounded-md"
                onClick={() => signIn('google')}>Logar</button>
        </div>
    );
}
