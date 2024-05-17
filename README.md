# issueiq-web-apis

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Installation Guidelines

We are using supabase as our database, supabase is esentially postgres.
It also has other awesome features such as objects storage, built-in auth and many more...

- Install supabase cli
- create a supabase account if you don't have one already...
- start developing your stuff

# DB Schemas

This is the example issue which can be used to map fields in the table

```
{
    "issue_id": "ISSUE-35",
    "category": "Documentation and Knowledge Base Queries",
    "summary": "Request for advanced API usage examples",
    "description": "Developer requests advanced examples demonstrating complex API usage scenarios for better understanding.",
    "priority": "High",
    "status": "In Progress",
    "created_at": "2024-06-14T09:00:00",
    "updated_at": "2024-06-14T09:30:00",
    "reporter": {
      "name": "Emily Wilson",
      "email": "emily.wilson@example.com"
    },
    "assignee": {
      "name": "Michael Lee",
      "email": "michael.lee@example.com"
    },
    "comments": [
      {
        "author": "Emily Wilson",
        "timestamp": "2024-06-15T11:00:00",
        "text": "Michael, any updates on the advanced API examples? We have a deadline approaching."
      },
      {
        "author": "Michael Lee",
        "timestamp": "2024-06-15T12:00:00",
        "text": "Emily, I'm still working on gathering the examples. Will provide an update soon."
      }
    ]
  }
```

# Schema Genrator drizzle

- to generate schemas we can use
  `drizzle-kit generate:pg --schema=src/schema.ts --out=migrations/`

## Team Name

Team name is D5
