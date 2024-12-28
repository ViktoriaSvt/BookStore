import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Header() {

    const [activeIndex, setActiveIndex] = useState(0);


    const navItems = [
        { path: "/", icon: "fa-house" },
        { path: "/search", icon: "fa-magnifying-glass" },
        { path: "/cart", icon: "fa-cart-shopping" },
        { path: "/wishlist", icon: "fa-heart" },
        { path: "/profile", icon: "fa-user" },
    ];


    const indicatorPosition = 70 * activeIndex;

    return (
        <>
            <div className="nav-container-header">
                <div className="content">
                    <div className="container">
                        <div className="brand">
                 
                            <div className="logo">
                                <img src="https://img.freepik.com/premium-vector/orange-logo_121531-38.jpg" alt="Logo" />
                            </div>
                            <h2>Sweetopia</h2>
                        </div>
                        <button className="questions-answers">
                            <a href="/frequentlyAsked">Q&amp;A</a>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <nav className="nav-container">
                    <div className="navigation">
                        <ul className="nav-ul-element">

                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <Link to={item.path} className="nav-link">
                                        <span className="icon">
                                            <i className={`fa-solid ${item.icon}`} />
                                        </span>
                                    </Link>
                                </li>
                            ))}

                            <div
                                className="indicator"
                                style={{
                                    transform: `translateX(${indicatorPosition}px)`,
                                }}
                            />
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}
