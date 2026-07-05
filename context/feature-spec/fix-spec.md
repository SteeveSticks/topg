# Add MySQL & MongoDB Support

## Context
Symplax supports PostgreSQL and Redis. Add MySQL and MongoDB to complete relational, document, and cache coverage.

---

## Tasks

### 1. Register engines in provisioning config
File: `database.route.ts`

| Engine  | Port  | Version |
|---------|-------|---------|
| MySQL   | 3306  | 8       |
| MongoDB | 27017 | 7       |

### 2. Connection string builder
Add cases for:
- MySQL → `mysql://username:password@host:port/dbname`
- MongoDB → `mongodb://username:password@host:port/dbname`

### 3. Engine validation error
Update the invalid-engine error message to include `mysql` and `mongodb` alongside existing options.

### 4. Docker provisioning (agent side)
- MySQL → pull image `mysql:8`
- MongoDB → pull image `mongo:7`, append `--auth` flag to enforce password access

### 5. Frontend engine selector
File: `C:\Users\DELL\Documents\projects\symplax\app\dashboard\databases\page.tsx`

Add MySQL and MongoDB cards to the Create Database sheet. Match the existing PostgreSQL and Redis dropdown structure.

### 6. Empty state hint text
Update the text that reads *"PostgreSQL or Redis"* to include all four engines.

### Rules
- Do not change the front-end UI. Any existing updates, just add them to it. 
- For now, connect MongoDB and MySQL frontend UI to the postgreSQL own, not the Redis.
---

## Acceptance Criteria

- [ ] `mysql` and `mongodb` appear in the provisioning config with correct ports and versions
- [ ] Passing an unsupported engine returns an error listing all four engines
- [ ] Provisioning a MySQL database pulls `mysql:8` and starts successfully
- [ ] Provisioning a MongoDB database pulls `mongo:7` and starts with `--auth` enabled — password login required, unauthenticated access rejected
- [ ] Create Database sheet shows MySQL and MongoDB cards with icon and description, consistent with PostgreSQL and Redis cards
- [ ] Empty state hint text references all four engines
- [ ] Ensure there is no lint or typescript error.