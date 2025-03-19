# Website Documentation

Welcome to **SkyTales** – your go-to bookstore! Whether you're a regular user or an admin, we’ve designed this website to be user-friendly and efficient. If you're looking for more technical details on how the server optimizes heavy traffic, please refer to the **[Java Server README](https://github.com/Viktoria12345123/MS-server/blob/main/README.md)** and **[JS Server README](./server/README.md)**.

---

### Frontend Tech Stack

- **JavaScript**: ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white)
- **React**: ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
- **CSS & Styling**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white), ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
- **Charting Library**: ![Chart.js](https://img.shields.io/badge/Chart.js-F3B1A1?style=flat&logo=chartjs&logoColor=white)
- **HTTP Client**: ![Axios](https://img.shields.io/badge/Axios-5A29E8?style=flat&logo=axios&logoColor=white)
- **Markup**: ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)


## User Roles

The website supports two main user roles: **Users** and **Admins**. These roles come with different interfaces tailored to their needs.

### User Role

As a user, you can freely browse through the website, but certain features are restricted until you log in:

#### Browsing Books
You have access to explore books through a **search bar** powered by **Elasticsearch (ES)** for efficient querying.

![Browsing Books](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/cart.png)

#### Login and User-Friendly Validation
The login form supports **user-friendly validation**, displaying proper messages and guiding you smoothly through the process.

![Login Validation](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/validation.png)

#### Cart Access
Once logged in, you will have access to your cart, where you can add or remove items at will.


#### Interactive Messages
Adding items to your cart will trigger **interactive messages** to ensure you’re always up to date with the status of your cart.

![Cart Access](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/addToCart.png)

#### Checkout Process
When you're ready, you can proceed to checkout. We’ve integrated **Stripe** for a secure payment process, ensuring smooth transactions.

![Checkout UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/payment.png)


#### FAQ Page
If you have any questions, you can visit the **FAQ page**, where we provide answers to commonly asked questions.


#### Multi-Language Support
Don’t worry if you’re not fluent in English. We offer **multi-language support**, which can be changed in your profile.

![FAQ Page](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/faq.png)

#### Questions to Admin
If your questions aren’t answered in the FAQ section, feel free to send them directly to an **Administrator**. You’ll be notified once the admin resolves the issue, and it will be stored in the **Mail Tab** under your profile.


![Mail Tab UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/mail.png)

#### Profile Customization
You can customize your **username** and **description** for a more personalized touch.


![Profile Customization](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/account.png)

---

### Admin Role

Admins have more extensive privileges to manage the website and ensure smooth operation:

#### Managing Questions
Admins have a dedicated interface for managing questions sent by users, ensuring timely and relevant responses.

![Admin Question Management UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/faqAdmin.png)

#### Monitoring Server Issues
Admins can closely monitor server performance and availability to ensure the website remains operational. For more technical details about how that happens , please check the [Server README](./server/README.md).

![Server Status UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/troubleshoot.png)

#### Adding New Inventory
Admins can easily add new books to the inventory, ensuring that the bookstore is always up to date with fresh titles.

![Add Inventory](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/addStock.png)

#### Top Picks and Recommendations
The homepage displays **recommendations** and **top picks** that users can browse, making the site even more engaging for everyone.

![Top Picks](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/homePage.png)

![Top Picks](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/homePage2.png)
