import { format } from "date-fns";
import { variantDateFormat } from "./variables";

export const sendOrder = async ({
  from,
  to,
  vrp,
  productId,
  size,
  daysOver
}) => {
  const data = {
    product_id: productId,
    variant: `${format(from, variantDateFormat)} - ${format(
      to,
      variantDateFormat
    )}`,
    variant2: size,
    spz: vrp,
    //dateFrom: from,
    //dateTo: to,
    daysOver: daysOver
  };
  console.log("DATA", data);
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
      console.error("Error?:", error);
    });
};

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
