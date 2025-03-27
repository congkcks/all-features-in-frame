
// Helper function to create a rail structure
function createRailMatrix(depth: number, textLength: number): string[][] {
  const matrix: string[][] = [];
  for (let i = 0; i < depth; i++) {
    matrix.push(new Array(textLength).fill(''));
  }
  return matrix;
}

// Rail fence (zig-zag) transposition encryption
export function railFenceEncrypt(plaintext: string, depth: number): string {
  if (!plaintext || depth < 2) return "";
  
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  const rails = createRailMatrix(depth, plaintext.length);
  
  let row = 0;
  let direction = 1; // Down
  
  // Fill the rail matrix
  for (let i = 0; i < plaintext.length; i++) {
    rails[row][i] = plaintext[i];
    
    // Change direction when we hit the top or bottom rail
    if (row === 0) {
      direction = 1; // Going down
    } else if (row === depth - 1) {
      direction = -1; // Going up
    }
    
    row += direction;
  }
  
  // Read off the rail matrix
  let result = '';
  for (let i = 0; i < depth; i++) {
    for (let j = 0; j < plaintext.length; j++) {
      if (rails[i][j] !== '') {
        result += rails[i][j];
      }
    }
  }
  
  return result;
}

// Rail fence (zig-zag) transposition decryption
export function railFenceDecrypt(ciphertext: string, depth: number): string {
  if (!ciphertext || depth < 2) return "";
  
  ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const rails = createRailMatrix(depth, ciphertext.length);
  
  // Mark the rail pattern first with '*'
  let row = 0;
  let direction = 1;
  for (let i = 0; i < ciphertext.length; i++) {
    rails[row][i] = '*';
    
    if (row === 0) {
      direction = 1;
    } else if (row === depth - 1) {
      direction = -1;
    }
    
    row += direction;
  }
  
  // Fill the rail matrix with the ciphertext
  let index = 0;
  for (let i = 0; i < depth; i++) {
    for (let j = 0; j < ciphertext.length; j++) {
      if (rails[i][j] === '*' && index < ciphertext.length) {
        rails[i][j] = ciphertext[index++];
      }
    }
  }
  
  // Read off in zig-zag order
  let result = '';
  row = 0;
  direction = 1;
  for (let i = 0; i < ciphertext.length; i++) {
    result += rails[row][i];
    
    if (row === 0) {
      direction = 1;
    } else if (row === depth - 1) {
      direction = -1;
    }
    
    row += direction;
  }
  
  return result;
}

// Process rail fence transposition
export function processTransposition(input: { plaintext?: string; ciphertext?: string; key: string }, mode: 'encrypt' | 'decrypt'): { result: string; steps: string[] } {
  const steps: string[] = [];
  const depth = parseInt(input.key) || 0;
  
  if (depth < 2) {
    return { 
      result: '', 
      steps: ['Khóa không hợp lệ. Độ sâu phải là số nguyên lớn hơn hoặc bằng 2.']
    };
  }
  
  steps.push(`Độ sâu: ${depth}`);
  
  if (mode === 'encrypt' && input.plaintext) {
    const text = input.plaintext.toUpperCase().replace(/[^A-Z]/g, '');
    steps.push(`Bản rõ: ${text}`);
    
    // Show the rail pattern
    const rails = createRailMatrix(depth, text.length);
    let row = 0;
    let direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      rails[row][i] = text[i];
      
      if (row === 0) {
        direction = 1;
      } else if (row === depth - 1) {
        direction = -1;
      }
      
      row += direction;
    }
    
    steps.push(`Mô hình đường ray:`);
    for (let i = 0; i < depth; i++) {
      steps.push(rails[i].join(''));
    }
    
    const result = railFenceEncrypt(input.plaintext, depth);
    steps.push(`Bản mã: ${result}`);
    
    return { result, steps };
  } 
  else if (mode === 'decrypt' && input.ciphertext) {
    const text = input.ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    steps.push(`Bản mã: ${text}`);
    
    // Mark the rail pattern
    const rails = createRailMatrix(depth, text.length);
    let row = 0;
    let direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      rails[row][i] = '*';
      
      if (row === 0) {
        direction = 1;
      } else if (row === depth - 1) {
        direction = -1;
      }
      
      row += direction;
    }
    
    steps.push(`Mô hình đường ray (dấu * là vị trí điền ký tự):`);
    for (let i = 0; i < depth; i++) {
      steps.push(rails[i].join(''));
    }
    
    // Fill the rail matrix
    let index = 0;
    for (let i = 0; i < depth; i++) {
      for (let j = 0; j < text.length; j++) {
        if (rails[i][j] === '*' && index < text.length) {
          rails[i][j] = text[index++];
        }
      }
    }
    
    steps.push(`Mô hình đường ray sau khi điền ký tự:`);
    for (let i = 0; i < depth; i++) {
      steps.push(rails[i].join(''));
    }
    
    const result = railFenceDecrypt(input.ciphertext, depth);
    steps.push(`Bản rõ: ${result}`);
    
    return { result, steps };
  }
  
  return { result: '', steps: ['Vui lòng nhập đủ thông tin'] };
}
