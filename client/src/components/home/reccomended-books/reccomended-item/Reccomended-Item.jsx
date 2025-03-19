export default function ReccomendedItem({ title, description, price, coverImg, bookImg, altText }) {
    return (
        <div className="book-item">
    
            <img src={coverImg} alt={altText} className="book-cover-img" />
            <div className="book-cover">
                <img src={bookImg} alt={`${title} book cover`} />
            </div>
            <div className="book-info">
                <h2 className="book-title">{title}</h2>
                <p className="book-description">{description}</p>
                <button className="buy-button">Buy Now</button>
                <div className="coin">
                    <span className="coin-value">{price}</span>
                </div>
            </div>
        </div>
    );
}
