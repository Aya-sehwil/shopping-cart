 const ShoppingCart = require('../../src/ShoppingCart');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  // ===== addItem =====
  test('adds a new item to the cart', () => {
    cart.addItem('apple', 2, 1.5);
    expect(cart.items['apple']).toEqual({ quantity: 2, price: 1.5 });
  });

  test('increments quantity if item already exists', () => {
    cart.addItem('apple', 2, 1.5);
    cart.addItem('apple', 3, 1.5);
    expect(cart.items['apple'].quantity).toBe(5);
  });

  test('adds multiple different items', () => {
    cart.addItem('apple', 1, 1.5);
    cart.addItem('banana', 2, 0.5);
    expect(Object.keys(cart.items).length).toBe(2);
  });

  // ===== removeItem =====
  test('removes an existing item', () => {
    cart.addItem('apple', 1, 1.5);
    cart.removeItem('apple');
    expect(cart.items['apple']).toBeUndefined();
  });

  test('throws when removing item not in cart', () => {
    expect(() => cart.removeItem('ghost')).toThrow('Item ghost not found in cart');
  });

  // ===== updateQuantity =====
  test('updates quantity of existing item', () => {
    cart.addItem('apple', 1, 1.5);
    cart.updateQuantity('apple', 5);
    expect(cart.items['apple'].quantity).toBe(5);
  });

  test('throws when quantity is less than 1', () => {
    cart.addItem('apple', 1, 1.5);
    expect(() => cart.updateQuantity('apple', 0)).toThrow('Quantity must be at least 1');
  });

  test('throws when updating item not in cart', () => {
    expect(() => cart.updateQuantity('ghost', 2)).toThrow('Item ghost not found in cart');
  });

  // ===== applyDiscount =====
  test('applies SAVE10 discount correctly', () => {
    cart.addItem('apple', 1, 100);
    cart.applyDiscount('SAVE10');
    expect(cart.getTotal()).toBe(90);
  });

  test('applies HALF discount correctly', () => {
    cart.addItem('apple', 1, 100);
    cart.applyDiscount('HALF');
    expect(cart.getTotal()).toBe(50);
  });

  test('throws on unknown discount code', () => {
    expect(() => cart.applyDiscount('FAKE')).toThrow('Unknown discount code: FAKE');
  });

  // ===== getTotal =====
  test('returns 0 for empty cart', () => {
    expect(cart.getTotal()).toBe(0);
  });

  test('calculates total correctly without discount', () => {
    cart.addItem('apple', 2, 1.5);
    cart.addItem('banana', 3, 0.5);
    expect(cart.getTotal()).toBe(4.5);
  });

 test('rounds total to 2 decimal places', () => {
    cart.addItem('item', 3, 0.1);
    expect(cart.getTotal()).toBe(0.3);
});

  // ===== clear =====
  test('clears all items and resets discount', () => {
    cart.addItem('apple', 2, 1.5);
    cart.applyDiscount('SAVE10');
    cart.clear();
    expect(cart.getTotal()).toBe(0);
    expect(cart.discount).toBe(0);
    expect(Object.keys(cart.items).length).toBe(0);
  });
});