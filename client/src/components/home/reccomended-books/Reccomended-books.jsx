import ReccomendedItem from "./reccomended-item/Reccomended-Item";


export default function Recommended() {
    return (
        <section className="wrapper-class">
            <h2>Recommended for you</h2>
            <div className="book-store">
                <ReccomendedItem
                    title="The Great Gatsby"
                    description="A novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922."
                    price="$76.99"
                    coverImg="https://www.shutterstock.com/image-vector/vintage-book-cover-design-classic-600nw-1546761371.jpg"
                    bookImg="https://rocketexpansion.com/wp-content/uploads/2021/11/A-Court-So-Dark-200x300.jpg"
                    altText="Vintage book cover"
                />
                <ReccomendedItem
                    title="1984"
                    description="A dystopian social science fiction novel and cautionary tale, written by the English writer George Orwell. It was published in 1949."
                    price="$27.99"
                    coverImg="https://img.freepik.com/premium-photo/winter-holidays-christmas-background-with-branches-generative-ai_887552-12049.jpg"
                    bookImg="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1b8bc827832651.5636b7c45b147.jpg"
                    altText="Christmas background"
                />
                <ReccomendedItem
                    title="To Kill a Mockingbird"
                    description="A novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature."
                    price="$35.99"
                    coverImg="https://www.shutterstock.com/image-vector/blue-sky-clouds-anime-style-600nw-2157978867.jpg"
                    bookImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmZWrlw7gR3brNVgHxWUXDzkrh_jTDPYq9Ln5CtSpey7y1znoqmHjLBQmNTDfvm0PZ-4c&usqp=CAU"
                    altText="Anime style sky background"
                />
                <ReccomendedItem
                    title="The Great Gatsby"
                    description="A novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922."
                    price="$54.99"
                    coverImg="https://cdn.pixabay.com/photo/2024/04/15/16/05/ai-generated-8698127_1280.png"
                    bookImg="https://thebookcoverdesigner.com/wp-content/uploads/2024/07/cover-12-324x519.jpg"
                    altText="AI-generated book cover"
                />
                {/* Add more BookItem components as needed */}
            </div>
        </section>
    );
}
