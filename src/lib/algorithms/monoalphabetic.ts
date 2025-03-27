
// Helper function to validate monoalphabetic key
function validateMonoalphabeticKey(key: string): boolean {
  if (key.length !== 26) return false;
  const uniqueChars = new Set(key.toUpperCase().split(''));
  return uniqueChars.size === 26;
}

// Monoalphabetic substitution cipher encryption
export function monoalphabeticEncrypt(plaintext: string, key: string): string {
  if (!plaintext || !validateMonoalphabeticKey(key)) return "";
  
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase();
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (char.match(/[A-Z]/)) {
      const index = alphabet.indexOf(char);
      result += key[index];
    } else {
      result += char;
    }
  }
  
  return result;
}

// Monoalphabetic substitution cipher decryption
export function monoalphabeticDecrypt(ciphertext: string, key: string): string {
  if (!ciphertext || !validateMonoalphabeticKey(key)) return "";
  
  ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase();
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    if (char.match(/[A-Z]/)) {
      const index = key.indexOf(char);
      result += alphabet[index];
    } else {
      result += char;
    }
  }
  
  return result;
}

// Process monoalphabetic cipher
export function processMonoalphabetic(input: { plaintext?: string; ciphertext?: string; key: string }, mode: 'encrypt' | 'decrypt'): { result: string; steps: string[] } {
  const steps: string[] = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  if (!validateMonoalphabeticKey(input.key)) {
    return { 
      result: '', 
      steps: ['Khóa không hợp lệ. Khóa phải có đúng 26 ký tự và chứa tất cả các chữ cái của bảng chữ cái (không trùng lặp).']
    };
  }
  
  steps.push(`Bảng chữ cái: ${alphabet}`);
  steps.push(`Khóa: ${input.key.toUpperCase()}`);
  
  if (mode === 'encrypt' && input.plaintext) {
    steps.push(`Bản rõ: ${input.plaintext}`);
    
    // Show the mapping
    const mappingStep = alphabet.split('').map((char, index) => 
      `${char}→${input.key.toUpperCase()[index]}`
    ).join(', ');
    
    steps.push(`Ánh xạ: ${mappingStep}`);
    
    const result = monoalphabeticEncrypt(input.plaintext, input.key);
    steps.push(`Bản mã: ${result}`);
    
    return { result, steps };
  } 
  else if (mode === 'decrypt' && input.ciphertext) {
    steps.push(`Bản mã: ${input.ciphertext}`);
    
    // Show the reverse mapping
    const reverseMappingStep = input.key.toUpperCase().split('').map((char, index) => 
      `${char}→${alphabet[index]}`
    ).join(', ');
    
    steps.push(`Ánh xạ ngược: ${reverseMappingStep}`);
    
    const result = monoalphabeticDecrypt(input.ciphertext, input.key);
    steps.push(`Bản rõ: ${result}`);
    
    return { result, steps };
  }
  
  return { result: '', steps: ['Vui lòng nhập đủ thông tin'] };
}
