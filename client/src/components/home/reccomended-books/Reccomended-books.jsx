

export default function Recommended() {

    return (
        <section className="wrapper-class">
            <h2>Recommended for you</h2>
            <div className="book-store">
                <div className="book-item">
                    <img src="https://www.shutterstock.com/image-vector/vintage-book-cover-design-classic-600nw-1546761371.jpg" alt="Vintage book cover" className="book-cover-img" />
                    <div className="book-cover">
                        <img src="https://rocketexpansion.com/wp-content/uploads/2021/11/A-Court-So-Dark-200x300.jpg" alt="Book cover" />
                    </div>
                    <div className="book-info">
                        <h2 className="book-title">The Great Gatsby</h2>
                        <p className="book-description">A novel written by American author F. Scott Fitzgerald that follows a
                            cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island
                            in the summer of 1922.</p>
                        <button className="buy-button">Buy Now</button>
                        <div className="coin">
                            <span className="coin-value">$76.99</span>
                        </div>
                    </div>
                </div>
                <div className="book-item">
                    <img src="https://img.freepik.com/premium-photo/winter-holidays-christmas-background-with-branches-generative-ai_887552-12049.jpg" alt="Christmas background" className="book-cover-img" />
                    <div className="book-cover">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1b8bc827832651.5636b7c45b147.jpg" alt="1984 book cover" />
                    </div>
                    <div className="book-info">
                        <h2 className="book-title">1984</h2>
                        <p className="book-description">A dystopian social science fiction novel and cautionary tale, written by
                            the English writer George Orwell. It was published in 1949.</p>
                        <button className="buy-button">Buy Now</button>
                        <div className="coin">
                            <span className="coin-value">$27.99</span>
                        </div>
                    </div>
                </div>
                <div className="book-item">
                    <img src="https://www.shutterstock.com/image-vector/blue-sky-clouds-anime-style-600nw-2157978867.jpg" alt="Anime style sky background" className="book-cover-img" />
                    <div className="book-cover">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmZWrlw7gR3brNVgHxWUXDzkrh_jTDPYq9Ln5CtSpey7y1znoqmHjLBQmNTDfvm0PZ-4c&usqp=CAU" alt="Mockingbird book cover" />
                    </div>
                    <div className="book-info">
                        <h2 className="book-title">To Kill a Mockingbird</h2>
                        <p className="book-description">A novel by Harper Lee published in 1960. It was immediately successful,
                            winning the Pulitzer Prize, and has become a classic of modern American literature.</p>
                        <button className="buy-button">Buy Now</button>
                        <div className="coin">
                            <span className="coin-value">$35.99</span>
                        </div>
                    </div>
                </div>
                <div className="book-item">
                    <img src="https://cdn.pixabay.com/photo/2024/04/15/16/05/ai-generated-8698127_1280.png" alt="AI-generated book cover" className="book-cover-img" />
                    <div className="book-cover">
                        <img src="https://thebookcoverdesigner.com/wp-content/uploads/2024/07/cover-12-324x519.jpg" alt="Great Gatsby alternate cover" />
                    </div>
                    <div className="book-info">
                        <h2 className="book-title">The Great Gatsby</h2>
                        <p className="book-description">A novel written by American author F. Scott Fitzgerald that follows a
                            cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island
                            in the summer of 1922.</p>
                        <button className="buy-button">Buy Now</button>
                        <div className="coin">
                            <span className="coin-value">$54.99</span>
                        </div>
                    </div>
                </div>
                {/* Add more book items as needed */}
            </div>
        </section>
    );
}
