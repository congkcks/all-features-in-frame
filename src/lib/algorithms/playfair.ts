// Helper function to generate a Playfair matrix from a key
function generatePlayfairMatrix(key: string): string[][] {
  // Chuẩn hóa key (loại bỏ chữ J, chuyển thành chữ hoa, loại bỏ ký tự trùng lặp)
  key = key.toUpperCase().replace(/J/g, 'I');
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Không có chữ J
  
  // Tạo chuỗi không trùng lặp từ key
  let keyString = '';
  for (const char of key) {
    if (char.match(/[A-Z]/) && !keyString.includes(char)) {
      keyString += char;
    }
  }
  
  // Thêm các ký tự còn lại từ bảng chữ cái
  for (const char of alphabet) {
    if (!keyString.includes(char)) {
      keyString += char;
    }
  }
  
  // Tạo ma trận 5x5
  const matrix: string[][] = [];
  for (let i = 0; i < 5; i++) {
    matrix[i] = [];
    for (let j = 0; j < 5; j++) {
      matrix[i][j] = keyString[i * 5 + j];
    }
  }
  
  return matrix;
}

// Find position of a character in the matrix
function findPosition(matrix: string[][], char: string): [number, number] {
  char = char.toUpperCase();
  if (char === 'J') char = 'I'; // Treat J as I
  
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  
  return [-1, -1]; // Should never happen with valid input
}

// Function to prepare text by splitting into digraphs and handling special cases
function prepareText(text: string): string[] {
  // Chuẩn hóa text
  text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  
  const digraphs: string[] = [];
  let i = 0;
  
  while (i < text.length) {
    if (i + 1 === text.length) {
      // If the last character is alone, add 'X'
      digraphs.push(text[i] + 'X');
      i++;
    } else if (text[i] === text[i + 1]) {
      // If two consecutive characters are the same, separate them with 'X'
      digraphs.push(text[i] + 'X');
      i++;
    } else {
      // Otherwise, take the pair
      digraphs.push(text[i] + text[i + 1]);
      i += 2;
    }
  }
  
  return digraphs;
}

// Playfair encryption
export function playfairEncrypt(plaintext: string, key: string): string {
  if (!plaintext || !key) return "";
  
  const matrix = generatePlayfairMatrix(key);
  const digraphs = prepareText(plaintext);
  let ciphertext = '';
  
  for (const digraph of digraphs) {
    const [row1, col1] = findPosition(matrix, digraph[0]);
    const [row2, col2] = findPosition(matrix, digraph[1]);
    
    let char1, char2;
    
    if (row1 === row2) {
      // Same row - take character to the right (with wraparound)
      char1 = matrix[row1][(col1 + 1) % 5];
      char2 = matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      // Same column - take character below (with wraparound)
      char1 = matrix[(row1 + 1) % 5][col1];
      char2 = matrix[(row2 + 1) % 5][col2];
    } else {
      // Rectangle - take character at same row but column of the other character
      char1 = matrix[row1][col2];
      char2 = matrix[row2][col1];
    }
    
    ciphertext += char1 + char2;
  }
  
  return ciphertext;
}

// Playfair decryption
export function playfairDecrypt(ciphertext: string, key: string): string {
  if (!ciphertext || !key) return "";
  
  const matrix = generatePlayfairMatrix(key);
  const digraphs = prepareText(ciphertext);
  let plaintext = '';
  
  for (const digraph of digraphs) {
    const [row1, col1] = findPosition(matrix, digraph[0]);
    const [row2, col2] = findPosition(matrix, digraph[1]);
    
    let char1, char2;
    
    if (row1 === row2) {
      // Same row - take character to the left (with wraparound)
      char1 = matrix[row1][(col1 + 4) % 5]; // +4 is equivalent to -1 with modulo 5
      char2 = matrix[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      // Same column - take character above (with wraparound)
      char1 = matrix[(row1 + 4) % 5][col1];
      char2 = matrix[(row2 + 4) % 5][col2];
    } else {
      // Rectangle - take character at same row but column of the other character
      char1 = matrix[row1][col2];
      char2 = matrix[row2][col1];
    }
    
    plaintext += char1 + char2;
  }
  
  return plaintext;
}

export function processPlayfair(input: { plaintext?: string; ciphertext?: string; key: string }, mode: 'encrypt' | 'decrypt'): { result: string; steps: string[] } {
  const steps: string[] = [];
  
  if (!input.key) {
    return { result: '', steps: ['Vui lòng nhập khóa'] };
  }
  
  const matrix = generatePlayfairMatrix(input.key);
  steps.push('Ma trận khóa Playfair:');
  
  // Thêm ma trận vào các bước
  let matrixString = '';
  for (let i = 0; i < 5; i++) {
    matrixString += matrix[i].join(' ') + '\n';
  }
  steps.push(matrixString);
  
  if (mode === 'encrypt' && input.plaintext) {
    const digraphs = prepareText(input.plaintext);
    steps.push(`Bản rõ: ${input.plaintext}`);
    steps.push(`Cặp ký tự sau khi chuẩn hóa: ${digraphs.join(' ')}`);
    
    const result = playfairEncrypt(input.plaintext, input.key);
    steps.push(`Bản mã: ${result}`);
    
    return { result, steps };
  } 
  else if (mode === 'decrypt' && input.ciphertext) {
    const digraphs = prepareText(input.ciphertext);
    steps.push(`Bản mã: ${input.ciphertext}`);
    steps.push(`Cặp ký tự sau khi chuẩn hóa: ${digraphs.join(' ')}`);
    
    const result = playfairDecrypt(input.ciphertext, input.key);
    steps.push(`Bản rõ: ${result}`);
    
    return { result, steps };
  }
  
  return { result: '', steps: ['Vui lòng nhập đủ thông tin'] };
}
