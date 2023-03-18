import { handlers } from './__mocks__/handlers';
// Importing the required testing libraries
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';

// Establish a Mock Service Worker server before tests run
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
