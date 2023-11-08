import { formatCNPJ, formatCPF, identifyCNPJOrCPF } from "./helpers";

describe("test identifyCnpjOrCpf function", () => {
  it("should identify a valid CPF", () => {
    const result = identifyCNPJOrCPF("123.456.789-09");
    expect(result).toBe("CPF");
  });

  it("should identify a valid CNPJ", () => {
    const result = identifyCNPJOrCPF("12.345.678.0001/90");
    expect(result).toBe("CNPJ");
  });

  it("should return same input for an invalid input", () => {
    const result = identifyCNPJOrCPF("12345");
    expect(result).toBe("12345");
  });

  it("should return same input for an empty input", () => {
    const result = identifyCNPJOrCPF("");
    expect(result).toBe("");
  });
});

describe("test formatCPF function", () => {
  it("should format a valid CPF", () => {
    const result = formatCPF("123.456.789-09");
    expect(result).toBe("123.456.789-09");
  });

  it("should return same input for an invalid input", () => {
    const result = formatCPF("1234567");
    expect(result).toBe("1234567");
  });

  it("should return same input for an empty input", () => {
    const result = formatCPF("");
    expect(result).toBe("");
  });
});

describe("formatCNPJ", () => {
  it("should format a valid CNPJ", () => {
    const formattedCNPJ = formatCNPJ("12345678901234");
    expect(formattedCNPJ).toBe("12.345.678.9012/34");
  });

  it("should return same input for an invalid input", () => {
    const result = formatCNPJ("12345");
    expect(result).toBe("12345");
  });

  it("should return null for an empty input", () => {
    const result = formatCNPJ("");
    expect(result).toBe("");
  });
});
