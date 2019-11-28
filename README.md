## How to use

### To Start Apollo api Server

```
npm run dev
```

script equivalent: 

```
"dev": "ts-node-dev --no-notify --respawn --transpileOnly src/server"
```

### Prisma2 related commands

to run prisma stupid at [`http://localhost:5555`](http://localhost:5555)

```
prisma2 dev
```

update schema

```
prisma2 generate
```

### Run seed script in /prisma/seed.ts

```
npm run seed
```

script equivalent:

```
"seed": "ts-node prisma/seed"
```