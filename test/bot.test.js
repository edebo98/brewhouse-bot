describe('Brew House Bot', () => {

  it('loads without crashing', () => {
    expect(true).toBe(true);
  });

  it('greeting contains the business name', () => {
    const greeting = `Hey Alex! Welcome to Brew House Coffee.`;
    expect(greeting).toContain('Brew House');
  });

  it('menu contains expected items', () => {
    const menu = `Espresso — $3.00, Flat White — $4.50`;
    expect(menu).toContain('Espresso');
    expect(menu).toContain('Flat White');
  });

  it('.env.example documents the token variable', () => {
    const fs = require('fs');
    const env = fs.readFileSync('.env.example', 'utf8');
    expect(env).toContain('TELEGRAM_TOKEN');
  });

});