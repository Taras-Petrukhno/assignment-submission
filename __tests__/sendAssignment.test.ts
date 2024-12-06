import { sendAssigment, fetchAssigmentData } from '../app/actions/sendAssigment'; // Adjust path as needed
import { redirect } from 'next/navigation';

// Mock fetchAssigmentData
jest.mock('../app/actions/sendAssigment', () => ({
  ...jest.requireActual('../app/actions/sendAssigment'),
  fetchAssigmentData: jest.fn(),
}));

// Mock redirect
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('sendAssigment', () => {
  let formData;

  beforeEach(() => {
    formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test.user@gmail.com');
    formData.append('assignment_description', 'This is a test description');
    formData.append('github_repo_url', 'https://github.com/test/repo');
    formData.append('candidate_level', 'Senior');
  });

  test('should return errors when form data is invalid', async () => {
    formData.set('name', ''); // Invalid name

    const result = await sendAssigment({}, formData);

    expect(result.errors).toHaveProperty('name');
    expect(result.errors.name).toContain('Name is required.');
  });


});
