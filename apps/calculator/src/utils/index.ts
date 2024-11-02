export const calculate = (num1: string, num2: string, op: string): number => {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (op) {
    case '/':
      return n1 / n2;
    case '*':
      return n1 * n2;
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    default:
      return n2;
  }
};
