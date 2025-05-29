# Website Documentation

Welcome to **SkyTales** – your go-to bookstore! Whether you're a regular user or an admin, we’ve designed this website to be user-friendly and efficient. If you're looking for more technical details on how the server optimizes heavy traffic, please refer to the **[Java Server README](https://github.com/ViktoriaSvt/MS-server/blob/main/README.md)**.

If you're interested in checking out the initial Node.js server, feel free to refer to the following **[README](server/README.md)**.

---

### Frontend Tech Stack (Front-End)

- **JavaScript**: ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white)
- **React**: ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
- **CSS & Styling**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
- **HTTP Client**: ![Axios](https://img.shields.io/badge/Axios-5A29E8?style=flat&logo=axios&logoColor=white)
- **Markup**: ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)


## User Roles

The website supports two main user roles: **Users** and **Admins**. These roles come with different interfaces tailored to their needs.

### User Role

As a user, you can freely browse through the website, but certain features are restricted until you log in:

#### Browsing Books
in the dashboard page you can view all the stock that is currently for sale.

![Browsing Books](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/dashboardPage.png)

#### Login and User-Friendly Validation
The login form supports **user-friendly validation**, displaying proper messages and guiding you smoothly through the process.

![Login Validation](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/login_form.png)

#### Cart Access
Once logged in, you will have access to your cart, where you can add or remove items at will.

![Cart Access](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/cartCheckout.png)

#### Interactive Messages
Adding items to your cart will trigger **interactive messages** to ensure you’re always up to date with the status of your cart.


#### Checkout Process
When you're ready, you can proceed to checkout. We’ve integrated **Stripe** for a secure payment process, ensuring smooth transactions.

![Payment](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/6.png)

#### FAQ Page
If you have any questions, you can visit the **FAQ page**, where we provide answers to commonly asked questions.
![FAQ Page](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/StaticQuestions.png)

#### Multi-Language Support
Don’t worry if you’re not fluent in **English** or perhaps **French**. We offer **multi-language support**, which can be changed in your profile.

![FAQ Page](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/ProfilePageViewUser.png)

#### Questions to Admin
If your questions aren’t answered in the FAQ section, feel free to send them directly to an **Administrator**. You’ll be notified once the admin resolves the issue, and it will be stored in the **Mail Tab** under your profile.


![Mail Tab UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/QuestionsAsk.png)

#### Where do i see the response?
Oonce the question has been answered this is how your mail might look like.
![Mail Tab UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/ProfileMailBox.png)

---

### Admin Role

Admins have more extensive privileges to manage the website and ensure smooth operation:

#### Managing Questions
Admins have a dedicated interface for managing questions sent by users, ensuring timely and relevant responses.

![Admin Question Management UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/QuestionsAdmin.png)

 ---
![Admin Question Management UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/12.png)

#### Perks
Admins can also alternate the roles of users.

![Server Status UI](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/UsersListAdmin.png)

#### Adding New Inventory
Admins can easily add new books to the inventory, ensuring that the bookstore is always up to date with fresh titles.

![Add Inventory](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/AdminCreate.png)

#### Preview while building
Sometimes it might be frustrating to not see what is happening while you edit so we have added a preview to assist.

![Add Inventory](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/addPReview.png)

#### Managing Inventory
Its important that it goes both ways, so a delete option was introduced recently to ensure no stale data is left out.

![Add Inventory](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/DeleteAdmin.png)


#### Top Picks and Recommendations
The homepage displays **recommendations** and **top picks** that users can browse, making it the hotspot for marketing.
While i wasnt able to fit everything the UI stays clean and managed to the users.

![Top Picks](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/official_page1.png)


![Top Picks](https://github.com/Viktoria12345123/BookStore/raw/main/docs/images/official_page2.png)
