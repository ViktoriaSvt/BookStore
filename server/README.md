# Server Overview

This server is designed to handle user requests for a bookstore platform efficiently, using Redis caching to optimize database interactions. Below is a detailed description of how the server operates and its features, including its efficiency during high traffic periods like Black Friday or seasonal variations, such as for a winter clothing store.

## How the Server Works

### Caching Strategy
The server integrates Redis caching to reduce the load on the database. Batch updates to the database are performed every 60 seconds to ensure consistency without overloading the database. The server can operate independently of Redis if necessary, using the database as a fallback mechanism when Redis is unavailable. If Redis becomes unavailable, the system logs this event and continues functioning by interacting directly with the database.

### Data Lifecycle
1. **Redis Connection**: When the server connects to Redis, it marks the start of the operation.
2. **User Request**: A user makes a request, and the server checks Redis for the data. If data is missing, it fetches it from the database. During this the user can try to earn a spot in the cache based on the load of requests sent.
3. **Cache as Source of Truth**: After the initial request, the cache becomes the temporary source of truth for the user’s data.
4. **Batch Updates**: Every 60 seconds, the server performs a batch update to sync data from Redis to the database, reducing bottlenecks and ensuring consistency. 
5. **Traffic Management**: The batch update timer can be manually adjusted based on traffic. During high traffic periods, the update frequency decreases to prevent bottlenecks, and during lower traffic periods, it increases to ensure avoiding frequent data updates.

### Concurrency Management
To handle concurrency and ensure data consistency, the server uses a message broker to manage operations sequentially, preventing race conditions and lost data.

### Redis Memory Management
When Redis memory starts running low, it uses the Least Recently Used (LRU) eviction policy to make room for more frequent users while offloading less frequent users’ data to the database. The eviction process ensures that heavy users who make more frequent requests stay in the cache, and others are moved to the database. Every time a user sends a request that bounces to the database a chance for them to earn a spot in the cache will be presented.

### Write-Ahead and Write-Behind Strategy
The server uses a hybrid write-ahead and write-behind strategy to prioritize availability and eventual consistency. This approach is suitable for high-traffic scenarios, such as Black Friday sales, where slight inconsistencies (e.g., a missing cart item) are acceptable in exchange for preventing payment bottlenecks.

## Monitoring and Error Handling
Two middleware functions monitor the server’s health:
1. **Performance Tracking**: Measures request processing times and notifies the admin if the processing time exceeds the expected threshold. This is especially important for cart processing.
2. **Error Handling**: Captures abnormal errors and notifies the admin, while allowing acceptable errors to be sent to the frontend for user notification.

Additionally, there are endpoints available to test performance and monitor system health, but an admin account is required for accessing these results.

## Database & Security
- **Database**: The database currently uses MongoDB, but a transition to a relational database and a Java-based server is in progress to improve scalability.
- **Authentication**: The server uses JWT (JSON Web Tokens) and cookies for session management. Passwords are securely encrypted to prevent unauthorized access.

## Router Structure
The server’s functionality is split across several routers to maintain separation of concerns and avoid clashes between different API endpoints:
- `/user`: Handles user authentication and management.
- `/translations`: Manages localization and language settings.
- `/faq`: Handles frequently asked questions.
- `/catalog`: Manages catalog-related data.
- `/cart`: Handles cart-related operations.
- `/stateTracker`: Tracks user session states and performance.

## Middleware Implementation
The server uses two important middleware functions:
- **AuthValidator**: Ensures users are authenticated before accessing protected routes.
- **TrackingService**: Tracks failed requests and slow queries to ensure performance stays within the acceptable range.

## Server Code Example

Here is an example of how the server is structured using Express.js:

```javascript

const PORT = process.env.PORT || 3000;

async function start() {
    const app = express();

    await configDatabase();
    configExpress(app);

    app.use(cookieParser());
    app.use(validateAuth);

    app.use("/user", userRouter);
    app.use("/translations", languageRouter);
    app.use("/faq", faqRouter);
    app.use("/catalog", bookRouter);
    app.use("/cart", cartRouter);
    app.use("/stateTracker", stateTrackerRouter);

    app.use((err, req, res, next) => {
      const errorType = err.status || 'UnknownError';
      if (errorType >= 500) {
          trackFailedRequest(errorType);
      }
      next(err);
    });

    app.use((err, req, res, next) => {
      console.error('An error occurred:', err); 
      res.status(err.status || 500).json({ message: 'Internal Server Error' });
    });

    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`);
    });
}

start();
