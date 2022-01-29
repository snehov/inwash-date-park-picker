export const sendOrder = ({ from, to, vrn, productId, size }) => {
  const data = {
    product_id: productId,
    variant: `${from} - ${to}`,
    variant2: size,
    spz: vrn,

    dateFrom: from,
    dateTo: to
  };
  fetch("https://inwash.cz/shop/cart_api/addToCart", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (inIframe()) {
        window.parent.gotoShop();
      } else {
        location.href = "/shop";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
