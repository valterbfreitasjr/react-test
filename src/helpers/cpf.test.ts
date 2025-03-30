import { validarCPF } from "./cpf";

describe("CPF Helper", () => {
  test("Deve validar CPF corretamente", () => {
    // arrange
    const validCpf = "38322430892";

    // act
    const result = validarCPF(validCpf);

    // assert
    expect(result).toBeTruthy();
  });

  test("Deve retornar false para CPF inválido", () => {
    // arrange
    const invalidCpf = "12334";

    // act
    const result = validarCPF(invalidCpf);

    // assert

    expect(result).toBeFalsy();
  });
});
