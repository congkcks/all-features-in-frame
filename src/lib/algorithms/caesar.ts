
export function caesarEncrypt(plaintext: string, shift: number): string {
  if (!plaintext) return "";
  let result = "";
  
  // Chuẩn hóa shift để nằm trong khoảng [0, 25]
  shift = ((shift % 26) + 26) % 26;
  
  for (let i = 0; i < plaintext.length; i++) {
    let char = plaintext[i];
    
    if (char.match(/[a-z]/i)) {
      const code = plaintext.charCodeAt(i);
      
      // Chữ hoa (A-Z)
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Chữ thường (a-z)
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    
    result += char;
  }
  
  return result;
}

export function caesarDecrypt(ciphertext: string, shift: number): string {
  // Giải mã Caesar chỉ đơn giản là mã hóa với độ dịch ngược lại
  return caesarEncrypt(ciphertext, 26 - (shift % 26));
}

export function processCaesar(input: { plaintext?: string; ciphertext?: string; key: string }, mode: 'encrypt' | 'decrypt'): { result: string; steps: string[] } {
  const shift = parseInt(input.key) || 0;
  const steps: string[] = [];
  
  if (mode === 'encrypt' && input.plaintext) {
    steps.push(`Bản rõ: ${input.plaintext}`);
    steps.push(`Khóa (độ dịch): ${shift}`);
    steps.push(`Áp dụng công thức: E(x) = (x + ${shift}) mod 26 cho mỗi ký tự`);
    
    const result = caesarEncrypt(input.plaintext, shift);
    steps.push(`Bản mã: ${result}`);
    
    return { result, steps };
  } 
  else if (mode === 'decrypt' && input.ciphertext) {
    steps.push(`Bản mã: ${input.ciphertext}`);
    steps.push(`Khóa (độ dịch): ${shift}`);
    steps.push(`Áp dụng công thức: D(x) = (x - ${shift}) mod 26 cho mỗi ký tự`);
    
    const result = caesarDecrypt(input.ciphertext, shift);
    steps.push(`Bản rõ: ${result}`);
    
    return { result, steps };
  }
  
  return { result: '', steps: ['Vui lòng nhập đủ thông tin'] };
}
