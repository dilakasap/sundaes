import { render, screen } from "@testing-library/react";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check teh subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubTotal).toHaveTextContent("2.00");

  //update chocolate scoop to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubTotal).toHaveTextContent("6.00");
});

test("update topping subtotal ehwn toppings change", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });
  //make sure total starts out $0.00
  const toppingTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingTotal).toHaveTextContent("0.00");

  //tick cherries topping and check  the subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingTotal).toHaveTextContent("1.50");

  //tick hotfudge topping and check the subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingTotal).toHaveTextContent("3.00");
  userEvent.click(hotFudgeCheckbox);
  expect(toppingTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total check 0 $", () => {
    render(<OrderEntry />,{ wrapper: OrderDetailsProvider });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total update properly scoop", async () => {
    render(<OrderEntry />,{ wrapper: OrderDetailsProvider });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("4.00");
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total update properly topping", async () => {
    render(<OrderEntry />,{ wrapper: OrderDetailsProvider });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total uncheck", async () => {
    render(<OrderEntry />,{ wrapper: OrderDetailsProvider });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("4.00");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
