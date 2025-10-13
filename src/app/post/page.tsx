import { collection, getDocs, query } from 'firebase/firestore';
import { FormPost } from './components/form_post';
import { db } from '../services/client/firebaseconfig';
import { PostList } from './components/post_list';

export default async function Post() {
    const postsCol = collection(db, 'posts');
    const snapshot = await getDocs(postsCol);
    const postsContent = snapshot.docs.map(doc => ({
        id: doc.id, 
        text: doc.data().text,
        created_at: doc.data().created_at.seconds,
        pulic: doc.data().public
    }));

    return (<div>
        <FormPost />
        <PostList posts={postsContent} />
    </div>);
}
