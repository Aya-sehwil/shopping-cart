 class CartRepository {
  constructor() {
    this.store = {};
  }

  save(cartId, items, discount) {
    this.store[cartId] = { items: { ...items }, discount };
  }

  load(cartId) {
    return this.store[cartId] || null;
  }

  delete(cartId) {
    delete this.store[cartId];
  }

  exists(cartId) {
    return !!this.store[cartId];
  }
}

module.exports = CartRepository;