import request from 'supertest';
import { server } from '../src/server'

test('returns 200 status code', async () => {
    const result = await request(server)
        .post('/encode')
        .send({
            url: 'https://google.com'
        });

    expect(result.statusCode).toBe(200);
});