const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR", // feel free to change to your local currency
});

export default function Cart({ cart, checkout, removeFromCart }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }
  if (cart.length === 0) {
    return <p>Your cart is empty!</p>;
  }
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <div>
            <span className="size">{item.size}</span> –
            <span className="type">{item.pizza.name}</span> –
            <span className="price">{item.price}</span> 
            <span className="remove-button">
            &nbsp;
            <button onClick={() => removeFromCart(index)}><strong>x</strong></button>
            </span>
            
            </div>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
