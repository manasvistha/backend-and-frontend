import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
  it('submits the form with user credentials', async () => {
    const mockLogin = jest.fn();
    axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

    const { getByLabelText, getByText } = render(<Login onLogin={mockLogin} />);

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByText(/login/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
        email: 'user@example.com',
        password: 'password123'
      });
      expect(mockLogin).toHaveBeenCalledWith('fake-token');
    });
  });
});

