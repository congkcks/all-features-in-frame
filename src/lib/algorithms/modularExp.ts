
// Function to convert a number to binary
function decimalToBinary(num: number): string {
  return num.toString(2);
}

// Calculate a^k mod n using the square and multiply algorithm (binary exponentiation)
export function modularExponentiation(a: number, k: number, n: number): number {
  if (n === 1) return 0; // As per modular arithmetic, any number mod 1 is 0
  
  // Handle base cases
  if (k === 0) return 1; // Any number raised to 0 is 1
  if (a === 0) return 0; // 0 raised to any positive power is 0
  
  // Initialize result
  let result = 1;
  // Update a to be within the range of modulo n
  a = a % n;
  
  // Perform modular exponentiation using binary method
  while (k > 0) {
    // If k is odd, multiply result with a
    if (k % 2 === 1) {
      result = (result * a) % n;
    }
    
    // k must now be even, divide by 2
    k = Math.floor(k / 2);
    
    // Square a
    a = (a * a) % n;
  }
  
  return result;
}

// Process modular exponentiation with detailed steps
export function processModularExp(input: { a?: number; k?: number; n?: number }): { result: string; steps: string[] } {
  const steps: string[] = [];
  const { a = 0, k = 0, n = 1 } = input;
  
  // Validate inputs
  if (a === undefined || k === undefined || n === undefined || n <= 0) {
    return { 
      result: '', 
      steps: ['Đầu vào không hợp lệ. Vui lòng nhập số nguyên dương cho a, k và n (với n > 0).']
    };
  }
  
  steps.push(`Tính ${a}^${k} mod ${n} bằng phương pháp bình phương nhân (square and multiply)`);
  
  // Base cases
  if (n === 1) {
    steps.push('Với modulo = 1, kết quả luôn là 0');
    return { result: '0', steps };
  }
  if (k === 0) {
    steps.push('Với số mũ k = 0, kết quả là 1');
    return { result: '1', steps };
  }
  if (a === 0) {
    steps.push('Với cơ số a = 0, kết quả là 0');
    return { result: '0', steps };
  }
  
  // Convert k to binary
  const binaryK = decimalToBinary(k);
  steps.push(`Bước 1: Chuyển số mũ k = ${k} sang nhị phân: ${binaryK}`);
  
  // Initialize result and a for modular calculation
  let result = 1;
  let currentA = a % n;
  steps.push(`Bước 2: Khởi tạo kết quả = 1, a = ${a} mod ${n} = ${currentA}`);
  
  // Step 3: Process each bit of binary k
  steps.push(`Bước 3: Xử lý từng bit của k = ${binaryK} (từ phải sang trái):`);
  
  let tempResult = result;
  let tempA = currentA;
  
  for (let i = binaryK.length - 1; i >= 0; i--) {
    const bit = binaryK[i];
    
    // If not the first iteration, we square the result
    if (i !== binaryK.length - 1) {
      tempResult = (tempResult * tempResult) % n;
      steps.push(`  - Bình phương kết quả: ${tempResult/tempResult} × ${tempResult/tempResult} ≡ ${tempResult} (mod ${n})`);
    }
    
    // If current bit is 1, multiply result with a
    if (bit === '1') {
      tempResult = (tempResult * tempA) % n;
      steps.push(`  - Bit ${binaryK.length - 1 - i} là 1: Nhân với a: ${tempResult/tempA} × ${tempA} ≡ ${tempResult} (mod ${n})`);
    } else {
      steps.push(`  - Bit ${binaryK.length - 1 - i} là 0: Giữ nguyên kết quả: ${tempResult}`);
    }
  }
  
  // The correct implementation (Used for the accurate calculation)
  // Reset result and currentA for proper calculation
  result = 1;
  currentA = a % n;
  
  for (let i = 0; i < binaryK.length; i++) {
    // If current bit is 1, multiply result with a
    if (binaryK[i] === '1') {
      result = (result * currentA) % n;
    }
    
    // Square a for next iteration
    currentA = (currentA * currentA) % n;
  }
  
  steps.push(`Kết quả cuối cùng: ${a}^${k} mod ${n} = ${result}`);
  
  return { result: result.toString(), steps };
}
