# soldier-lunch-budget

Final exam on Node.js - server and DB &amp; testing

### File system:

    - app.js --> # The application that runs the server
    - docker-compose.yml
    - Dockerfile
    - .env --> # Saved passwords
    - src/ --> # All server folders and files
    --- controllers/
    --- --/ budgetController.js
    --- --/ soldierController.js
    --- db/ --> #
    --- --/ benefitDb.js
    --- --/ soldierDb.js
    --- repositories/ --> #
    --- --/ budgetRepo.js
    --- --/ soldierRepo.js
    --- --/ transactionRepo.js
    --- routes/ --> #
    --- --/ budgetRoute.js
    --- --/ soldierRoute.js
    --- services/ --> #
    --- --/ budgetService.js
    --- --/ soldierService.js
    --- tests/ --> # 2 test files with mock, one unimplemented
    --- --/ budgetService.test.js
    --- --/ soldierService.test.js
    --- zodValidations.js --> # Validation for all types of schemas Required in the system

### Choosing DB Types:

I chose mongoDB for the benefits table because there are different schemas, nested documents, and it's impossible to know exactly what the table structure will be. For the budget table and utilization table, I chose SQL (I initially worked with MySQL and later switched to PostgreSQL via Sophos) because I also need rigidity and stability of agreement and a relationship between the tables -- unfortunately, I didn't have time to implement it.

### Endpoints:

### How to run:

    docker compose up --build
