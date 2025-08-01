import { test, expect } from '@playwright/test';

  test.describe('Casos de interfaz - GoRest API', () => {

    const token = 'Bearer 1342194d39a0f104bc26c2638f6ef57d5857daa8d6ae2a960bb77c2b812e80a3';
    
    test('Happy path - crear usuario con datos validos', async ({ request }) => {
      const email = `tenali.ramakrishna${Date.now()}@15ce.com`;
      const payload = {
        name: "Tenalia Ramakrishna",
        gender: "male",
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
      expect(data).toHaveProperty('gender', 'male');
      expect(data).toHaveProperty('email', email);
      expect(data).toHaveProperty('status', 'active');
  });

  const basePayload: Record<string, string> = {
    name: "Tenali Ramakrishna",
    gender: "male",
    email: `tenali.ramakrishna@150ce.com`,
    status: "active"
  };

  for (const field of Object.keys(basePayload)) {
    test(`POST /users - campo '${field}' vacío`, async ({ request }) => {
      const payload = { ...basePayload, [field]: '' };
      const response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: payload
      });
      console.log(response);
      expect(response.status()).toBe(422);
      const data = await response.json();
      // Verifica que el error mencione el campo vacío
      const error = data.find((e: any) => e.field === field);
      expect(error).toBeTruthy();
      expect(error.message).toContain('can\'t be blank');
    });
  }

  for (const campo of Object.keys(basePayload)) {
  test(`POST /users - campo '${campo}' sin enviar`, async ({ request }) => {
    const { [campo]: omitted, ...payload } = basePayload; // Elimina el campo
    const response = await request.post('https://gorest.co.in/public/v2/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: payload
    });
    console.log(response);
    expect(response.status()).toBe(422);
    const data = await response.json();
    // Verifica que el error mencione el campo faltante
    const error = data.find((e: any) => e.field === campo);
    expect(error).toBeTruthy();
    expect(error.message).toContain('can\'t be blank');
  });
}
});
    


