'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface SidebarServiceItemsProps {
    href: string;
    id: string;
    label: string;
    enabled: boolean;
}

export function Sidebar() {
    const { data: session, status } = useSession();
    const [toggleState, setToggleState] = useState(false);

    const servicesItems: SidebarServiceItemsProps[] = useMemo(() => {
        const items = [
            {
                href: '/',
                id: '1',
                label: 'home',
                enabled: true,
            },
            {
                href: '/messages',
                id: '2',
                label: 'messages',
                enabled: true,
            },
            {
                href: '/notifications',
                id: '3',
                label: 'notifications',
                enabled: true,
            },
            {
                href: '/files',
                id: '4',
                label: 'files',
                enabled: true,
            },
        ].filter(item => item.enabled);

        return items;
    }, []);

    return (
        <aside 
            role='navigation'
            aria-label='User info'
            className={`${toggleState ? 'animate-grow w-2/6 p-3' : 'animate-grow w-0'} bg-gray-400 absolute h-full z-10 shadow-black-800 shadow-lg/30 transition-all duration-100`}>
            <div className="overflow-hidden">
                <button
                    aria-expanded={toggleState}
                    aria-controls='user-sidebar'
                    className="text-right cursor-pointer absolute top-1 right-[-50px] w-[80px] p-2 h-[40px] bg-gray-400 rounded-r-2xl"
                    onClick={() => setToggleState(prev => !prev)}>
                    {toggleState ? '<' : '>'}
                </button>

                <div className="justify-center items-center">
                {
                    status === 'authenticated' ? (<>
                        <Image
                            className="items-center justify-center "
                            priority={true}
                            quality={80}
                            src={session?.user?.image as string}
                            alt={session?.user?.name as string}
                            width={80}
                            height={80}
                        />
                        <p className="font-medium text-sm mt-2 break-words">
                            {session?.user?.name}
                        </p>
                        <p className="font-bold text-lg mt-2 break-words">
                            {session?.user?.email}
                        </p>
                    </>) : (
                        <></>
                    )
                }
                </div>
                <div className="mt-2">
                {
                    status === 'authenticated' ? (
                        <button
                            className="cursor-pointer ease-in bg-gray-700 py-1 px-4 hover:bg-gray-600 text-gray-300 rounded-md" 
                            onClick={() => signOut({callbackUrl: process.env.BASE_URL})}>Sair</button>
                    ) : (
                        <button 
                            className="cursor-pointer ease-in bg-gray-700 py-1 px-4 hover:bg-gray-600 text-gray-300 rounded-md"
                            onClick={() => signIn('google')}>Logar</button>
                    )
                }
                </div>
                <div className="mt-6">
                    <ul className="flex-col inline-flex">
                    {servicesItems.map(item => (
                        <li className="underline-offset-3 underline" key={item.id}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </aside>
    )
}
