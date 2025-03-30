import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Teste do Button", () => {
  test("Deve renderizar um botão corretamente.", () => {
    render(<Button>Click Me</Button>);
    screen.getByText("Click Me");
  });
});
