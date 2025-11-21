# Report Details Page

This page displays detailed analysis results for a selected report based on a dynamic `id` from the URL.

## What It Does
- Fetches mock data from `/src/data/mockReports.ts`
- Uses a dynamic route: `/report-details/[id]`
- Shows domain, date, performance scores, and risk level
- Includes a styled “missing report” state with a placeholder back button
- Built with React + Next.js App Router + Tailwind CSS

## Props / Data
The page receives:

```ts
params: {
  id: string;
}
