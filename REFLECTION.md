# Testing Reflection

## What edge cases did you discover while writing tests?

While writing tests, I discovered several edge cases:

- Removing an item that doesn't exist in the cart should throw an error,
  not silently fail.
- Updating quantity to 0 or negative numbers should be rejected.
- Applying an unknown discount code should throw a clear error message.
- The getTotal() function needed careful rounding to handle
  floating point precision issues in JavaScript.
- Clearing the cart must also reset the discount, not just the items.

## How did TDD change how you designed any feature?

When implementing the applyDiscount feature using TDD, I wrote the
failing test first. This forced me to think about the interface before
the implementation — what parameters it takes, what it returns, and
what errors it should throw. Without TDD, I might have forgotten to
handle unknown discount codes. The failing test made the requirement
explicit before I wrote a single line of implementation code.

## What would you test next if you had more time?

- Test concurrent cart updates (two users modifying the same cart)
- Test very large quantities and prices for overflow issues
- Test applying multiple discounts in sequence
- Test cart persistence across sessions using a real database
- Add performance tests for carts with hundreds of items
- Test invalid input types (strings instead of numbers for price)
