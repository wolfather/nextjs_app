export default async function Contact() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: 'no-store',
    });

    const session = await res.json();

    console.log('---')
    console.log({session})
    

    return (
        <div>
            <h1>Contact</h1>
        </div>
    )
}