# Add MariaDB, Valkey, RabbitMQ & ClickHouse

## Context
Extends the existing database provisioning pattern (same as MySQL/MongoDB) with 4 new engines.

---

## Engines

### MariaDB v11 — port 3307
| Key | Value |
|-----|-------|
| Image | `mariadb:11` |
| Env | `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE` |
| Health | `mysqladmin ping -h localhost -u root -p{password} --silent` |
| Connection | `mysql://root:{password}@{ip}:{port}/{dbName}` |
| Color | `bg-blue-700/10` |
| Icon | `logos:mariadb-icon` |

### Valkey v8 — port 6380
| Key | Value |
|-----|-------|
| Image | `valkey/valkey:8` |
| Health | `valkey-cli ping` → `PONG` |
| Connection | `redis://{ip}:{port}` |
| Color | `bg-violet-500/10` |
| Icon | `simple-icons:valkey` |

### RabbitMQ v3 — port 5672
| Key | Value |
|-----|-------|
| Image | `rabbitmq:3-management` |
| Env | `RABBITMQ_DEFAULT_USER=admin`, `RABBITMQ_DEFAULT_PASS` |
| Health | `rabbitmq-diagnostics ping` → `Ping succeeded` |
| Connection | `amqp://admin:{password}@{ip}:{port}` |
| Color | `bg-orange-500/10` |
| Icon | `logos:rabbitmq-icon` |

### ClickHouse v24 — port 8123
| Key | Value |
|-----|-------|
| Image | `clickhouse/clickhouse-server:24` |
| Env | `CLICKHOUSE_PASSWORD`, `CLICKHOUSE_DB` |
| Health | `clickhouse-client --password {password} --query "SELECT 1"` → `1` |
| Connection | `http://default:{password}@{ip}:{port}/{dbName}` |
| Color | `bg-yellow-400/10` |
| Icon | `simple-icons:clickhouse` |

---
### Frontend engine selector
Add the new database to the Create Database sheet. Match the existing PostgreSQL and Redis dropdown structure.

## Tasks

1. **Provisioning config** (`database.route.ts`) — register all 4 engines with their ports and versions
2. **Docker provisioning** — pull correct image, inject env vars per engine
3. **Health checks** — implement per-engine health command as specified above
4. **Connection string builder** — add cases for `mariadb`, `valkey`, `rabbitmq`, `clickhouse`
5. **Engine validation error** — add all 4 to the supported engines list
6. **Frontend engine selector**(`app\dashboard\databases\page.tsx, ServerDatabasesTab.tsx `) — add to the dropdown with correct icon, color, match the existing dropdown structure

---

### Rules
- Do not change the front-end UI. Any existing updates, just add them to it. 

---

## Acceptance Criteria

- [ ] All 4 engines register with correct port and version in provisioning config
- [ ] Docker pulls correct image and injects the right env vars per engine
- [ ] Health check passes for each engine after provisioning
- [ ] Unsupported engine error lists all engines including the 4 new ones
- [ ] All 4 database appear in the dropdown, in the Create Database sheet with correct icon and color