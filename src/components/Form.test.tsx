import { render, screen } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

describe("Componente Form", () => {
  test("Deve renderizar corretamente", () => {
    render(<Form />);
    screen.getByText(/Adicionar itens/i);
    screen.getByRole("button", { name: "Submit" });
    screen.getByText(/Submitted Values/i);
  });

  test("Deve adicionar um item na lista", async () => {
    //  arrange
    const user = userEvent.setup();
    render(<Form />);
    const input = screen.getByRole("textbox", { name: "Item" });
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // act
    await user.type(input, "Item 1");
    await user.click(submitButton);

    // assert
    expect(screen.getByText(/Item 1/i));
  });

  test("Deve adicionar um item na lista e removê-lo", async () => {
    //  arrange
    const user = userEvent.setup();
    render(<Form />);
    const input = screen.getByRole("textbox", { name: "Item" });
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // act
    await user.type(input, "Item 1");
    await user.click(submitButton);

    // assert
    screen.getByText(/Item 1/i);
    const deleteButton = screen.getByRole("button", {
      name: "Excluir item Item 1",
    });
    await user.click(deleteButton);

    const item = screen.queryByText(/Item 1/i);

    expect(item).toBeNull();
  });
});
