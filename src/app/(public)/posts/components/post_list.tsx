'use client'
import { db } from "@/app/services/client/firebaseconfig";
import { collection, onSnapshot, query, orderBy, limit, startAfter, QueryDocumentSnapshot, } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { PostEntity } from "../entities/post.interface";
import { PostListEntity } from "../entities/postList.interface";

export function PostList({ posts }: PostListEntity) {
    const [list, setList] = useState<PostEntity[]>(posts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [cursors, setCursors] = useState<QueryDocumentSnapshot[]>([]);

    useEffect(() => {
        setLoading(true);
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
            console.log(snap.docs[snap.docs.length -1])

            setList(updatePosts);
            setCursors([snap.docs[snap.docs.length - 1]]);
            setLoading(false);
        });

        return () => unsubs();
    }, []);

    const fetchPaginatedPosts = useCallback(async(pageIndex: number) => {
        setLoading(true);
        let q;
        
        if(pageIndex === 0) {
            q = query(
                collection(db, 'posts'), 
                orderBy('created_at', 'desc'),
                limit(5),
            );
        } else {
            q = query(
                collection(db, 'posts'), 
                orderBy('created_at', 'desc'),
                startAfter(cursors[pageIndex -1]),
                limit(5),
            );
        }

        const unsubs = onSnapshot(q, (snap) => {
            const updatePosts = snap.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                created_at: doc.data().created_at.seconds,
                public: doc.data().public,
            }));

            setList(updatePosts);
            
            setCursors(prev => {
                const newCursors = [...prev];
                newCursors[pageIndex] = snap.docs[snap.docs.length -1];
                return newCursors;
            });

            setPage(pageIndex);
            setLoading(false);
        });

        return () => unsubs();
    }, [cursors]);

    const fetchPrevious = () => {
        if(page > 0) {
            fetchPaginatedPosts(page - 1);
        }
    };
    const fetchNext = () => {
        fetchPaginatedPosts(page + 1);
    };

    if (loading) {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <section>
            {list.map(item => (
                <div 
                    key={item.id} 
                    className="max-w-[250px] bg-gray-200 rounded-lg mb-2 px-3 py-4 flex justify-between">
                    {item.public && <span>pública</span>}
                    <p>{item.text}</p>
                </div>
            ))}

            <div className="flex justify-between">
                <button 
                    disabled={loading || page === 0} 
                    onClick={fetchPrevious}>Anterior</button>
                <button 
                    disabled={loading || cursors[cursors.length - 1] === undefined}
                    onClick={fetchNext}>Próxima</button>
            </div>
        </section>
    )
}