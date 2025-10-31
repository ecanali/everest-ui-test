![Everest Logo](public/everest-logo.svg?raw=true "Everest Logo")

# TODO App Challenge - Everest Tasks

This is an implementation of the TODO App challenge, built with a focus on robustness, accessibility, and modern React development practices.

Live demo of the application: [https://everest-tasks.vercel.app/](https://everest-tasks.vercel.app/)

Instructions for the implementation can be found in the [INSTRUCTIONS](./INSTRUCTIONS.md) doc.

## Tech Stack

* **UI:** React 18
* **Core State:** React Hooks (`useReducer`, `useContext`)
* **Build Tool:** Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS (with a Mobile-First approach)
* **Data Validation:** Zod
* **Testing:** Vitest + React Testing Library

## Running Locally

1.  Clone this repository:
    ```bash
    git clone https://github.com/ecanali/everest-ui-test.git
    cd everest-ui-test
    ```

2.  Install dependencies (using `yarn` as defined in `package.json`):
    ```bash
    yarn install
    ```

3.  Start the development server:
    ```bash
    yarn start
    ```

4.  To run the tests and code coverage report:
    ```bash
    yarn test
    yarn coverage
    ```

## Technical Decisions & Rationale

As the challenge encourages technical decisions, here are the primary choices and their justifications:

### 1. State Management with `useReducer` + `useContext`

* **Why?** Instead of a third-party library, I opted for React's built-in hooks. This demonstrates mastery of the core platform, reduces bundle size, and removes external dependencies.
* **Implementation:** The `useReducer` hook is perfect for managing state with multiple, well-defined actions (add, remove, toggle). It co-locates all state transition logic in a pure `todoReducer` function. This logic is then provided to the entire application via a custom `TodoProvider` (`src/context/TodoContext.tsx`), which combines the reducer with the Context API. This pattern is clean, highly testable, and avoids prop-drilling.

### 2. Defensive Data Validation with Zod

* **Why?** The instruction to "discard entries that do not match" is a classic requirement for defensive programming.
* **Implementation:** The service layer (`src/services/todoService.ts`) does not trust the API. It validates **each item individually** using `todoEntrySchema.safeParse()`. Malformed items are discarded and logged to the console, protecting the application from breaking due to unexpected data.

### 3. Accessibility (a11y) as a Core Feature

* **Why?** Software must be usable by everyone.
* **Implementation:**
    * **Semantic HTML:** Use of `<main>`, `<form>`, `<label>`, etc.
    * **Keyboard Navigation:** All interactive elements (inputs, buttons, checkboxes) have clear focus states (`focus-visible:ring`).
    * **ARIA:** Correct use of `aria-label` for icon buttons, `aria-invalid` for form errors, and `role="status"` for the spinner.

### 4. Component Architecture

* **Why?** The folder structure (`/components/ui` vs. `/components/Todo`) clearly separates generic, reusable UI components from feature-specific components. This facilitates maintainability, theming, and code reuse in a larger project.

## Future Enhancements (Next Steps)

Given more time, the next steps would be:

1.  **Item Editing:** Add an `isEditing` state to the `TodoItem`, toggling the text for an input field.
2.  **Persistence:** Persist the state to `localStorage` to maintain data between sessions. This could be done with a simple `useEffect` in the `TodoProvider` that watches for state changes.
3.  **Filtering (All/Active/Completed):** Add a filter state to the `todoReducer` and update the `TodoList` to filter the items based on this state *before* sorting.
