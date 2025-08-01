import { test, expect } from '@playwright/test';

  test.describe('Casos de interfaz - GoRest API', () => {

    const token = 'Bearer 1342194d39a0f104bc26c2638f6ef57d5857daa8d6ae2a960bb77c2b812e80a3';
    const email = `tenali.ramakrishna${Date.now()}@15ce.com`;
    
    test('Crear usuario con gender female', async ({ request }) => {
        const payload = {
        name: "Tenalia Ramakrishna",
        gender: "female",
        email: email,
        status: "active"
        };
        const response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: payload
        });
        console.log(response);
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('name', 'Tenalia Ramakrishna');
        expect(data).toHaveProperty('gender', 'female');
        expect(data).toHaveProperty('email', email);
        expect(data).toHaveProperty('status', 'active');
    });

  test('Crear usuario con status inactive', async ({ request }) => {
    const payload = {
      name: "Tenalia Ramakrishna",
      gender: "male",
      email: email,
      status: "inactive"
    };
    const response = await request.post('https://gorest.co.in/public/v2/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: payload
    });
    console.log(response);
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name', 'Tenalia Ramakrishna');
    expect(data).toHaveProperty('gender', 'male');
    expect(data).toHaveProperty('email', email);
    expect(data).toHaveProperty('status', 'inactive');
  });
});