'use client'
import { db } from "@/app/services/client/firebaseconfig"
import { collection, onSnapshot, query, orderBy, limit, where, } from "firebase/firestore"
import { useEffect, useState } from "react"

interface Posts {
    posts: any[]
}
export function PostList({ posts }: Posts) {
    const [list, setList] = useState(posts)

    useEffect(() => {
        const q = query(
            collection(db, 'posts'), 
            orderBy('created_at', 'desc'),
            limit(5),
        );

        const unsubs = onSnapshot(q, (snap) => {
            const updatePosts = snap.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                created_at: doc.data().created_at.seconds,
                public: doc.data().public,
            }));

            setList(updatePosts);
        });

        return () => unsubs();
    }, []);

    return (
        <section>
            {list.map((item: any) => (
                <div className="flex justify-between">
                    {item.public && <span>pública</span>}
                    <p key={item.id}>{item.text}</p>
                </div>
            ))}
        </section>
    )
}