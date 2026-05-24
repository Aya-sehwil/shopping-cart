 const ShoppingCart = require('../../src/ShoppingCart');
const CartRepository = require('../../src/CartRepository');

describe('Cart Integration Tests', () => {
  let cart;
  let repo;

  beforeEach(() => {
    cart = new ShoppingCart();
    repo = new CartRepository();
  });

  test('saves and loads cart from repository', () => {
    cart.addItem('apple', 2, 1.5);
    cart.addItem('banana', 1, 0.5);
    repo.save('cart1', cart.items, cart.discount);

    const saved = repo.load('cart1');
    expect(saved.items['apple']).toEqual({ quantity: 2, price: 1.5 });
    expect(saved.items['banana']).toEqual({ quantity: 1, price: 0.5 });
  });

  test('saves cart with discount and loads it correctly', () => {
    cart.addItem('item', 1, 100);
    cart.applyDiscount('SAVE10');
    repo.save('cart2', cart.items, cart.discount);

    const saved = repo.load('cart2');
    expect(saved.discount).toBe(0.10);
  });

  test('deletes cart from repository', () => {
    cart.addItem('apple', 1, 1.5);
    repo.save('cart3', cart.items, cart.discount);
    repo.delete('cart3');

    expect(repo.exists('cart3')).toBe(false);
  });


  test('returns null when loading non-existent cart', () => {
    const result = repo.load('non-existent');
    expect(result).toBeNull();
  });

  test('exists returns false for non-existent cart', () => {
    expect(repo.exists('non-existent')).toBe(false);
  });
});