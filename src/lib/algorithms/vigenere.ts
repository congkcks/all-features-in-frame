
// Helper function to convert letter to number (A=0, B=1, ..., Z=25)
function letterToNumber(letter: string): number {
  return letter.toUpperCase().charCodeAt(0) - 65;
}

// Helper function to convert number to letter (0=A, 1=B, ..., 25=Z)
function numberToLetter(num: number): string {
  return String.fromCharCode((num % 26) + 65);
}

// Vigenere Encrypt with repeating key
export function vigenereEncrypt(plaintext: string, key: string): string {
  if (!plaintext || !key) return "";
  
  // Remove non-alphabetic characters and convert to uppercase
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  let result = '';
  
  for (let i = 0; i < plaintext.length; i++) {
    // Get the numeric value of the plaintext and key characters
    const plaintextChar = letterToNumber(plaintext[i]);
    const keyChar = letterToNumber(key[i % key.length]); // Repeat key as needed
    
    // Apply Vigenere formula: C = (M + K) mod 26
    const encryptedChar = (plaintextChar + keyChar) % 26;
    
    // Convert back to letter and add to result
    result += numberToLetter(encryptedChar);
  }
  
  return result;
}

// Vigenere Decrypt with repeating key
export function vigenereDecrypt(ciphertext: string, key: string): string {
  if (!ciphertext || !key) return "";
  
  // Remove non-alphabetic characters and convert to uppercase
  ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  let result = '';
  
  for (let i = 0; i < ciphertext.length; i++) {
    // Get the numeric value of the ciphertext and key characters
    const ciphertextChar = letterToNumber(ciphertext[i]);
    const keyChar = letterToNumber(key[i % key.length]); // Repeat key as needed
    
    // Apply Vigenere formula: M = (C - K + 26) mod 26
    // +26 ensures the result is positive
    const decryptedChar = (ciphertextChar - keyChar + 26) % 26;
    
    // Convert back to letter and add to result
    result += numberToLetter(decryptedChar);
  }
  
  return result;
}

// Vigenere Autokey Encrypt
export function vigenereAutokeyEncrypt(plaintext: string, key: string): string {
  if (!plaintext || !key) return "";
  
  // Remove non-alphabetic characters and convert to uppercase
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  let result = '';
  let fullKey = key;
  
  // Generate full autokey by appending plaintext to the key
  for (let i = 0; i < plaintext.length - key.length; i++) {
    fullKey += plaintext[i];
  }
  
  for (let i = 0; i < plaintext.length; i++) {
    // Get the numeric value of the plaintext and key characters
    const plaintextChar = letterToNumber(plaintext[i]);
    const keyChar = letterToNumber(fullKey[i]);
    
    // Apply Vigenere formula: C = (M + K) mod 26
    const encryptedChar = (plaintextChar + keyChar) % 26;
    
    // Convert back to letter and add to result
    result += numberToLetter(encryptedChar);
  }
  
  return result;
}

// Vigenere Autokey Decrypt
export function vigenereAutokeyDecrypt(ciphertext: string, key: string): string {
  if (!ciphertext || !key) return "";
  
  // Remove non-alphabetic characters and convert to uppercase
  ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  let result = '';
  let fullKey = key;
  
  for (let i = 0; i < ciphertext.length; i++) {
    // Get the numeric value of the ciphertext and key characters
    const ciphertextChar = letterToNumber(ciphertext[i]);
    const keyChar = letterToNumber(fullKey[i]);
    
    // Apply Vigenere formula: M = (C - K + 26) mod 26
    // +26 ensures the result is positive
    const decryptedChar = (ciphertextChar - keyChar + 26) % 26;
    
    // Convert back to letter and add to result
    result += numberToLetter(decryptedChar);
    
    // Add the decrypted character to the key for autokey
    if (i >= key.length - 1 && i < ciphertext.length - 1) {
      fullKey += numberToLetter(decryptedChar);
    }
  }
  
  return result;
}

// Process standard Vigenere
export function processVigenere(input: { plaintext?: string; ciphertext?: string; key: string }, mode: 'encrypt' | 'decrypt'): { result: string; steps: string[] } {
  const steps: string[] = [];
  
  if (mode === 'encrypt' && input.plaintext) {
    steps.push(`Bản rõ: ${input.plaintext}`);
    steps.push(`Khóa: ${input.key}`);
    steps.push(`Lặp khóa để có độ dài bằng bản rõ`);
    
    // Create an array to show the encryption steps
    const plaintextArray = input.plaintext.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const keyRepeated = [];
    
    for (let i = 0; i < plaintextArray.length; i++) {
      keyRepeated.push(input.key.toUpperCase().charAt(i % input.key.length));
    }
    
    steps.push(`Bản rõ:       ${plaintextArray.join(' ')}`);
    steps.push(`Khóa (lặp):   ${keyRepeated.join(' ')}`);
    steps.push(`Áp dụng công thức: C = (M + K) mod 26 cho mỗi ký tự`);
    
    const encryptedChars = [];
    for (let i = 0; i < plaintextArray.length; i++) {
      const pChar = letterToNumber(plaintextArray[i]);
      const kChar = letterToNumber(keyRepeated[i]);
      const eChar = (pChar + kChar) % 26;
      encryptedChars.push(numberToLetter(eChar));
    }
    
    steps.push(`Bản mã:       ${encryptedChars.join(' ')}`);
    
    const result = vigenereEncrypt(input.plaintext, input.key);
    return { result, steps };
  } 
  else if (mode === 'decrypt' && input.ciphertext) {
    steps.push(`Bản mã: ${input.ciphertext}`);
    steps.push(`Khóa: ${input.key}`);
    steps.push(`Lặp khóa để có độ dài bằng bản mã`);
    
    // Create an array to show the decryption steps
    const ciphertextArray = input.ciphertext.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const keyRepeated = [];
    
    for (let i = 0; i < ciphertextArray.length; i++) {
      keyRepeated.push(input.key.toUpperCase().charAt(i % input.key.length));
    }
    
    steps.push(`Bản mã:       ${ciphertextArray.join(' ')}`);
    steps.push(`Khóa (lặp):   ${keyRepeated.join(' ')}`);
    steps.push(`Áp dụng công thức: M = (C - K + 26) mod 26 cho mỗi ký tự`);
    
    const decryptedChars = [];
    for (let i = 0; i < ciphertextArray.length; i++) {
      const cChar = letterToNumber(ciphertextArray[i]);
      const kChar = letterToNumber(keyRepeated[i]);
      const dChar = (cChar - kChar + 26) % 26;
      decryptedChars.push(numberToLetter(dChar));
    }
    
    steps.push(`Bản rõ:       ${decryptedChars.join(' ')}`);
    
    const result = vigenereDecrypt(input.ciphertext, input.key);
    return { result, steps };
  }
  
  return { result: '', steps: ['Vui lòng nhập đủ thông tin'] };
}

// Process Vigenere Autokey
export function processVigenereAutokey(input: { plaintext?: string; ciphertext?: string; key: string }, mode: 'encrypt' | 'decrypt'): { result: string; steps: string[] } {
  const steps: string[] = [];
  
  if (mode === 'encrypt' && input.plaintext) {
    steps.push(`Bản rõ: ${input.plaintext}`);
    steps.push(`Khóa: ${input.key}`);
    
    // Create arrays to show the encryption steps
    const plaintextArray = input.plaintext.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const keyArray = input.key.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const fullKeyArray = [...keyArray];
    
    // Fill the full key with plaintext characters
    for (let i = 0; i < plaintextArray.length - keyArray.length; i++) {
      fullKeyArray.push(plaintextArray[i]);
    }
    
    steps.push(`Autokey: ${fullKeyArray.join('')}`);
    steps.push(`Bản rõ:       ${plaintextArray.join(' ')}`);
    steps.push(`Khóa (auto):  ${fullKeyArray.join(' ')}`);
    steps.push(`Áp dụng công thức: C = (M + K) mod 26 cho mỗi ký tự`);
    
    const encryptedChars = [];
    for (let i = 0; i < plaintextArray.length; i++) {
      const pChar = letterToNumber(plaintextArray[i]);
      const kChar = letterToNumber(fullKeyArray[i]);
      const eChar = (pChar + kChar) % 26;
      encryptedChars.push(numberToLetter(eChar));
    }
    
    steps.push(`Bản mã:       ${encryptedChars.join(' ')}`);
    
    const result = vigenereAutokeyEncrypt(input.plaintext, input.key);
    return { result, steps };
  } 
  else if (mode === 'decrypt' && input.ciphertext) {
    steps.push(`Bản mã: ${input.ciphertext}`);
    steps.push(`Khóa: ${input.key}`);
    
    // Create arrays to show the decryption steps
    const ciphertextArray = input.ciphertext.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const keyArray = input.key.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const fullKeyArray = [...keyArray];
    const decryptedChars = [];
    
    // Decrypt and build the key simultaneously
    for (let i = 0; i < ciphertextArray.length; i++) {
      const cChar = letterToNumber(ciphertextArray[i]);
      const kChar = letterToNumber(fullKeyArray[i]);
      const dChar = (cChar - kChar + 26) % 26;
      decryptedChars.push(numberToLetter(dChar));
      
      // Add the decrypted character to the key for autokey
      if (i >= keyArray.length - 1 && i < ciphertextArray.length - 1) {
        fullKeyArray.push(numberToLetter(dChar));
      }
    }
    
    steps.push(`Autokey: ${fullKeyArray.join('')}`);
    steps.push(`Bản mã:       ${ciphertextArray.join(' ')}`);
    steps.push(`Khóa (auto):  ${fullKeyArray.join(' ')}`);
    steps.push(`Áp dụng công thức: M = (C - K + 26) mod 26 cho mỗi ký tự`);
    steps.push(`Bản rõ:       ${decryptedChars.join(' ')}`);
    
    const result = vigenereAutokeyDecrypt(input.ciphertext, input.key);
    return { result, steps };
  }
  
  return { result: '', steps: ['Vui lòng nhập đủ thông tin'] };
}
