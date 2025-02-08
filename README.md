# Website Documentation

Welcome to **SkyTales** – your go-to bookstore! Whether you're a regular user or an admin, we’ve designed this website to be user-friendly and efficient. If you're looking for more technical details on how the server optimizes heavy traffic, please refer to the **[Server README](./server/README.md)**.

---

## User Roles

The website supports two main user roles: **Users** and **Admins**. These roles come with different interfaces tailored to their needs.

### User Role

As a user, you can freely browse through the website, but certain features are restricted until you log in:

#### Browsing Books
You have access to explore books through a **search bar** powered by **Elasticsearch (ES)** for efficient querying.

![Browsing Books](doc/images/cart.png)

#### Login and User-Friendly Validation
The login form supports **user-friendly validation**, displaying proper messages and guiding you smoothly through the process.

![Login Validation](doc/images/validation.png)

#### Cart Access
Once logged in, you will have access to your cart, where you can add or remove items at will.


#### Interactive Messages
Adding items to your cart will trigger **interactive messages** to ensure you’re always up to date with the status of your cart.

![Cart Access](doc/images/addToCart.png)

#### Checkout Process
When you're ready, you can proceed to checkout. We’ve integrated **Stripe** for a secure payment process, ensuring smooth transactions.

![Checkout UI](doc/images/payment.png)

#### FAQ Page
If you have any questions, you can visit the **FAQ page**, where we provide answers to commonly asked questions.


#### Multi-Language Support
Don’t worry if you’re not fluent in English. We offer **multi-language support**, which can be changed in your profile.

![FAQ Page](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/faq.png)

#### Questions to Admin
If your questions aren’t answered in the FAQ section, feel free to send them directly to an **Administrator**. You’ll be notified once the admin resolves the issue, and it will be stored in the **Mail Tab** under your profile.

![Mail Tab UI](doc/images/mail.png)

#### Profile Customization
You can customize your **username** and **description** for a more personalized touch.

![Profile Customization](doc/images/account.png)

---

### Admin Role

Admins have more extensive privileges to manage the website and ensure smooth operation:

#### Managing Questions
Admins have a dedicated interface for managing questions sent by users, ensuring timely and relevant responses.

![Admin Question Management UI](doc/images/faq_admin.png)

#### Monitoring Server Issues
Admins can closely monitor server performance and availability to ensure the website remains operational. For more technical details about how the server handles heavy traffic, please check the **[Server README](./server/README.md)**.

![Server Status UI](doc/images/troubleshoot.png)

#### Adding New Inventory
Admins can easily add new books to the inventory, ensuring that the bookstore is always up to date with fresh titles.

![Add Inventory](doc/images/add_stock.png)

#### Top Picks and Recommendations
The homepage displays **recommendations** and **top picks** that users can browse, making the site even more engaging for everyone.

![Top Picks](doc/images/Home_page.png)
![Top Picks](doc/images/Home_page2.png)
