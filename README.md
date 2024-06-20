# Pokésaurus

## Project Overview

The Pokésaurus is a frontend application built for a coding challenge for the Leonardo Ai Frontend role. The application provides a comprehensive Pokémon pocketbook, allowing users to search, view, and interact with detailed information about various Pokémon. The project leverages modern web technologies and best practices to deliver a responsive and user-friendly experience.

## Tech Stack

- **Framework**: Next.js
- **State Management**: React Context API
- **Styling**: Chakra UI
- **GraphQL Client**: Apollo Client
- **Testing**: Cypress (e2e), @apollo/client/testing (mocked API)
- **Form Handling**: React Hook Form

## Project Structure

The project follows a modular structure to ensure scalability and maintainability

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pokepoke-challenge.git
   cd pokepoke-challenge
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Testing Approach

### End-to-End Testing

Cypress is used for end-to-end testing. Cypress tests can be found in the `cypress/e2e` directory. The tests cover user interactions and critical workflows to ensure the application works as expected.

1. To open Cypress test runner:

   ```bash
   npm run cypress:open
   ```

2. To run Cypress tests in headless mode:

   ```bash
   npm run cypress:run
   ```

## Further Potential Improvements

If more time was allowed, the following improvements could be made:

- 404 Page: Implement a custom 404 page to improve user experience.
- Enhanced Pokémon Details: Add tabs to the Pokémon details modal for more detailed information.
- Save Function: Implement a save function to bookmark favorite Pokémon.
- Logout Confirmation: Add a pop-up modal to confirm the logout action.
- Autocomplete Search: Enhance the search functionality with autocomplete suggestions.
- Filter by Type: Add functionality to filter Pokémon by type.
