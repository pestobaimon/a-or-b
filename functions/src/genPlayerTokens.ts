import getRanHex from "./hexDigits";

const genPlayerTokens = (): [string, string] => {
  const token1 = getRanHex(16);
  let token2 = getRanHex(16);
  while (token1 === token2) {
    token2 = getRanHex(16);
  }
  return [token1, token2];
};

export default genPlayerTokens;
