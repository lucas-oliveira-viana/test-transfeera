export function identifyCNPJOrCPF(input: string) {
  const cleanedInput = input.replace(/\D/g, "");

  if (cleanedInput.length === 11) {
    return "CPF";
  }

  if (cleanedInput.length === 14) {
    return "CNPJ";
  }

  return input;
}

export function formatCPF(input: string): string {
  const cleanedCPF = input.replace(/\D/g, "");

  if (cleanedCPF.length !== 11) {
    return input;
  }

  return cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(input: string) {
  const cleanedCNPJ = input.replace(/\D/g, "");

  if (cleanedCNPJ.length !== 14) {
    return input;
  }

  return cleanedCNPJ.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3.$4/$5"
  );
}

export function dinamicallyIdentifyAndFormat(input: string) {
  const type = identifyCNPJOrCPF(input);

  if (type === "CPF") {
    return formatCPF(input);
  }

  if (type === "CNPJ") {
    return formatCNPJ(input);
  }

  return input;
}
