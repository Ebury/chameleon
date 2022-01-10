export function obfuscate(text, obfuscateSymbol = '*', visibleChars = 3) {
  const digitsToBeObfuscated = text.length - visibleChars;
  let obfuscatedText = [...text];

  for (let i = 0; i < digitsToBeObfuscated; i++) {
    obfuscatedText[i] = obfuscateSymbol;
  }

  obfuscatedText = obfuscatedText.join('');

  return obfuscatedText;
}
