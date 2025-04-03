import { render, screen, waitFor } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

describe("Componente Form", () => {
  // Testa a renderização
  test("Deve renderizar corretamente sem itens", async () => {
    mock
      .onGet("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .reply(200, []);
    render(<Form />);
    screen.getByText(/Adicionar itens/i);
    screen.getByRole("button", { name: "Submit" });

    await screen.findByText(/Submitted Values/i);

    //ou

    await waitFor(() => {
      screen.getByText(/Submitted Values/i);
    });
  });

  // Renderizar com 5 itens
  test("Deve renderizar corretamente com 5 itens", async () => {
    const tasks = [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
      },
      {
        userId: 1,
        id: 4,
        title: "et porro tempora",
        completed: true,
      },
      {
        userId: 1,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      },
    ];

    mock
      .onGet("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .reply(200, tasks);
    render(<Form />);
    screen.getByText(/Adicionar itens/i);
    screen.getByRole("button", { name: "Submit" });

    await screen.findByText(tasks[0].title);
    screen.getByText(tasks[1].title);
    screen.getByText(tasks[2].title);
    screen.getByText(tasks[3].title);
    screen.getByText(tasks[4].title);
  });

  // Adiciona na lista
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

  // Remove da lista
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
