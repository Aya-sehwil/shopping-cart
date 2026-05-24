# TDD Evidence - Red Green Refactor

## Feature: applyDiscount

### RED - Failing Test First
Written a failing test before implementation:
- test: 'throws on unknown discount code'
- Expected: throw Error('Unknown discount code: FAKE')
- Result: FAILED (function did not exist yet)

### GREEN - Make Test Pass
Implemented applyDiscount() in ShoppingCart.js:
- Added SAVE10 = 10% and HALF = 50%
- Added error throwing for unknown codes
- Result: PASSED

### REFACTOR - Clean Up
- Moved discount codes to a const object
- Kept all tests passing after refactor
- Result: ALL TESTS PASSED
