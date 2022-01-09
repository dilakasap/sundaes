import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  //render app
  render(<App />);
  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesTopping);
  //find and click order button
  const orderButton = screen.getByRole("button", { name: /order sundae!/i });
  userEvent.click(orderButton);
  //check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();
  const scoopHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopHeading).toBeInTheDocument();
  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();
  //check summary option items
  expect(screen.getByText("3 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();
  //accept terms and conditions and click order button
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);
  //confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  //click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderButton);
  //check that scoop and topping have been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
  // wait for items for does not angry
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
