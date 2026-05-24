 const ShoppingCart = require('../../src/ShoppingCart');
const CartRepository = require('../../src/CartRepository');

describe('E2E - Complete Checkout Flow', () => {
  test('simulates a full checkout flow from adding items to final total', () => {
    // 1. إنشاء سلة جديدة
    const cart = new ShoppingCart();
    const repo = new CartRepository();

    // 2. إضافة منتجات
    cart.addItem('shirt', 2, 25.00);
    cart.addItem('pants', 1, 40.00);
    cart.addItem('shoes', 1, 60.00);

    // 3. تعديل كمية
    cart.updateQuantity('shirt', 3);

    // 4. حذف منتج
    cart.addItem('hat', 1, 15.00);
    cart.removeItem('hat');

    // 5. تطبيق خصم
    cart.applyDiscount('SAVE10');

    // 6. حفظ في الـ repository
    repo.save('checkout-cart', cart.items, cart.discount);

    // 7. التحقق من الـ total
    // shirt: 3 * 25 = 75, pants: 40, shoes: 60 => 175 - 10% = 157.5
    expect(cart.getTotal()).toBe(157.5);

    // 8. التحقق إن السلة اتحفظت
    expect(repo.exists('checkout-cart')).toBe(true);

    // 9. تفريغ السلة
    cart.clear();
    expect(cart.getTotal()).toBe(0);
  });
});