const { useState, useEffect } = React;

function Cart() {
  const [cart, setCart] = useState([]);

  window.addToCart = function (product) {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === product.id);
      if (cartItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return React.createElement(
    "div",
    { className: "cartContainer" },
    React.createElement(
      "div",
      { onClick: () => window.cartToggle(), className: "close" },
      React.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "32",
          height: "32",
          viewBox: "0 0 24 24",
        },
        React.createElement("path", {
          fill: "#000",
          d: "m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z",
        })
      )
    ),
    React.createElement("h1", {}, "Your items"),
    React.createElement("br"),
    React.createElement(
      "div",
      { className: "itemsWrapper" },
      cart.map((item) =>
        React.createElement(
          "div",
          { key: item.id, className: "cartItem" },
          React.createElement("img", {
            src: item.image,
            alt: item.title,
          }),
          React.createElement(
            "div",
            {},
            React.createElement("h3", {}, item.title),
            React.createElement("p", {}, `$${item.price}`),
            React.createElement("p", {}, `Qty: ${item.quantity}`)
          ),
          React.createElement(
            "button",
            {
              className: "remove-item",
              onClick: () => removeFromCart(item.id),
            },
            "Remove"
          )
        )
      )
    ),
    React.createElement(
      "h1",
      {},
      "Overall: ",
      React.createElement("span", {}, `$${total}`)
    )
  );
}
