export default function generateOrderId() {
  return `ORD-${Math.floor(Math.random() * 1000)}`;
}
