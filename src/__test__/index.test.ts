import kimaris from '../index';

test('has correct properties', () => {
    expect(kimaris).toHaveProperty('icons');
    expect(kimaris).toHaveProperty('replace');
});
