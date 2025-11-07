# Report Card Page

This page displays the results of a privacy analysis for a given website.

## Purpose
The `reportcard` view shows an overview of privacy grades for different categories such as cookies, data sharing, and consent.

## Components
- **CategoryCard**: Displays the category name, grade, and details.
- **IssueRow**: Lists specific findings within each category.

## Props Expected (future integration)
- `reportData`: Object containing categories, scores, and issues.

Example structure:
```js
{
  url: "example.com",
  categories: [
    { name: "Cookies", score: 85, issues: [...] },
    { name: "Data Sharing", score: 72, issues: [...] }
  ]
}
