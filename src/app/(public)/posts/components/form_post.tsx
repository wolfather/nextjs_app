'use client'

import { db } from '../../../services/client/firebaseconfig';
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";

export const FormPost = () => {
    const [post, setPost] = useState('');

    async function onSubmitHandler(event: FormEvent) {
        event.preventDefault();

        if(post === '') {
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                text: post,
                created_at: new Date(),
                user: '',
                public: true,
            });

            setPost('');
        } catch(error) {
            console.log(error);
            //throw new Error(new Error().message);
        }
    }

    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <textarea onChange={(e) => setPost(e.target.value)} value={post}></textarea>
                <button type='submit'>Post</button>
            </form>
        </div>
    )
}