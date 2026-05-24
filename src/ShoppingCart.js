 class ShoppingCart {
  constructor() {
    this.items = {};
    this.discount = 0;
  }

  addItem(productId, quantity, price) {
    if (this.items[productId]) {
      this.items[productId].quantity += quantity;
    } else {
      this.items[productId] = { quantity, price };
    }
  }

  removeItem(productId) {
    if (!this.items[productId]) {
      throw new Error(`Item ${productId} not found in cart`);
    }
    delete this.items[productId];
  }

  updateQuantity(productId, quantity) {
    if (quantity < 1) {
      throw new Error('Quantity must be at least 1');
    }
    if (!this.items[productId]) {
      throw new Error(`Item ${productId} not found in cart`);
    }
    this.items[productId].quantity = quantity;
  }

  applyDiscount(code) {
    const codes = { SAVE10: 0.10, HALF: 0.50 };
    if (!codes[code]) {
      throw new Error(`Unknown discount code: ${code}`);
    }
    this.discount = codes[code];
  }

  getTotal() {
    const subtotal = Object.values(this.items).reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    return Math.round(subtotal * (1 - this.discount) * 100) / 100;
  }

  clear() {
    this.items = {};
    this.discount = 0;
  }
}

module.exports = ShoppingCart;