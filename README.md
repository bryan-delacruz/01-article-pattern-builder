# Builder Pattern in Next.js | Bank Transfer Form

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Live:** [bdlc-01-article-pattern-builder.vercel.app](https://bdlc-01-article-pattern-builder.vercel.app)

A small, focused example of the **Builder design pattern** in a modern Next.js app. A bank transfer form sends its data to a **Server Action**, which builds and validates a `Transfer` object step by step with a fluent `TransferBuilder`.

## What it shows

- **Builder pattern:** `TransferBuilder` sets each field with a chainable method (`setFromAccount().setToAccount().setAmount()...`) and validates the object in `build()`.
- **Validation at the right step:** `setAmount()` rejects amounts ≤ 0. `build()` rejects a transfer without origin account, destination account or amount.
- **Sensible defaults:** currency starts as `USD`. Reference and message are optional.
- **Server Actions:** the form posts to `processTransfer` (`"use server"`) with no API route.
- **Pending UI with `useTransition`:** the submit button shows "Procesando..." and is disabled while the action runs.

## How it works

```ts
const transfer = new TransferBuilder()
  .setFromAccount(data.fromAccount)
  .setToAccount(data.toAccount)
  .setAmount(parseFloat(data.amount))
  .setCurrency(data.currency)
  .setReference(data.reference)
  .setMessage(data.message)
  .build();
```

## Project structure

```
app/page.tsx              Transfer form (client component)
actions/transfer.tsx      Server Action that uses the builder
lib/transferBuilder.ts    Transfer type and TransferBuilder class
```

## Tech stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
