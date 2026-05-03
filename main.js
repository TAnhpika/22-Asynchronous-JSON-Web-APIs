/**
 * Cấu trúc Execution Context:
 * 1. Variable environment
 * - lưu var và func declaration
 * 2. Lexical environment
 * - Lưu let, const & func parameters
 * 3. This binding (!)
 * - Xđ this tham chiếu về đâu
 * - func: this trỏ về đối tượng gọi nó
 * - arrow func: this trỏ về window (toàn cục)
 */