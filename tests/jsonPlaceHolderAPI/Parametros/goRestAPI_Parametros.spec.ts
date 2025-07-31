import { test, expect } from '@playwright/test';

  test.describe('Casos de Parametros - GoRest API', () => {

    const token = 'Bearer 1342194d39a0f104bc26c2638f6ef57d5857daa8d6ae2a960bb77c2b812e80a3';

    const basePayload = {
        name: "Tenali Ramakrishna",
        gender: "male",
        email: `tenali.ramakrishna${Date.now()}@150ce.com`,
        status: "active"
    };

    const valores = [
        { desc: 'número', valor: 123 },
        { desc: 'punto', valor: '.' },
        { desc: 'caracter especial', valor: '@' },
        { desc: 'guion', valor: '-' },
        { desc: 'null', valor: null }
    ];

    for (const campo of Object.keys(basePayload)) {
        for (const { desc, valor } of valores) {
        test(`Campo '${campo}' con ${desc}`, async ({ request }) => {
            const payload = { ...basePayload, [campo]: valor };
            // Si el campo es email, asegúrate de que sea único para evitar error 422 por duplicado
            if (campo === 'email' && typeof valor === 'string') {
            payload.email = `test${Date.now()}${valor}@mail.com`;
            }
            const response = await request.post('https://gorest.co.in/public/v2/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: payload
            });
            // Solo validamos que la API responda, puedes ajustar el expect según la regla de negocio
            expect([201, 422, 400]).toContain(response.status());
            const data = await response.json();
            // Opcional: loguea la respuesta para análisis
            console.log(`Campo ${campo} con ${valor}`, data);
        });
        }
    }
    });