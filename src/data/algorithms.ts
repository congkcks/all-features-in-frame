
import { Algorithm } from '../types/algorithm';

export const algorithms: Algorithm[] = [
  {
    id: 'caesar',
    title: 'Caesar',
    description: 'Mã hóa Caesar là phương pháp mã hóa thay thế đơn giản, trong đó mỗi chữ cái trong văn bản gốc được thay thế bằng một chữ cái cách nó một khoảng cố định trong bảng chữ cái.',
    category: 'classic'
  },
  {
    id: 'playfair',
    title: 'Mã cặp playfair',
    description: 'Mã hóa Playfair sử dụng ma trận 5x5 của các chữ cái được sắp xếp dựa trên một từ khóa. Đây là một trong những mã hóa thay thế đầu tiên hoạt động trên các cặp chữ cái.',
    category: 'classic'
  },
  {
    id: 'vigenere',
    title: 'Mã đa bảng chữ - VIGENERE CIPHER',
    description: 'Mã Vigenere là một phương pháp mã hóa văn bản bằng cách sử dụng một loạt các phép mã hóa Caesar khác nhau dựa trên các chữ cái của một từ khóa.',
    category: 'classic'
  },
  {
    id: 'transposition',
    title: 'Mã hoán vị',
    description: 'Mã hoán vị hoạt động bằng cách thay đổi vị trí các ký tự trong thông điệp mà không làm thay đổi chính các ký tự.',
    category: 'classic'
  },
  {
    id: 'des-key-generation',
    title: 'Thuật toán sinh khóa con cho mỗi vòng lặp',
    description: 'Quy trình sinh khóa con từ khóa chính cho các vòng mã hóa trong thuật toán DES (Data Encryption Standard).',
    category: 'modern'
  },
  {
    id: 'des-encryption',
    title: 'Thuật toán mã hóa',
    description: 'Thuật toán mã hóa DES (Data Encryption Standard) hoặc AES (Advanced Encryption Standard) cho mã hóa dữ liệu.',
    category: 'modern'
  },
  {
    id: 'modular-exponentiation',
    title: 'Tính lũy thừa modulo',
    description: 'Kỹ thuật để tính lũy thừa modulo hiệu quả, rất quan trọng trong mật mã học và lý thuyết số.',
    category: 'number-theory'
  },
  {
    id: 'congruence-equations',
    title: 'Giải hệ phương trình đồng dư',
    description: 'Phương pháp giải các phương trình đồng dư và hệ phương trình đồng dư trong lý thuyết số.',
    category: 'number-theory'
  },
  {
    id: 'primitive-root',
    title: 'Căn nguyên thủy và logarit rời rạc',
    description: 'Khái niệm về căn nguyên thủy và logarit rời rạc, quan trọng trong các thuật toán mã hóa như Diffie-Hellman.',
    category: 'number-theory'
  },
  {
    id: 'diffie-hellman',
    title: 'Trao đổi khóa Diffie-Hellman',
    description: 'Phương pháp trao đổi khóa an toàn trên kênh không an toàn, không cần chia sẻ khóa bí mật trước.',
    category: 'public-key'
  },
  {
    id: 'rsa',
    title: 'Thuật toán RSA',
    description: 'Thuật toán mã hóa khóa công khai RSA, cho phép mã hóa và chữ ký số dựa trên vấn đề phân tích số nguyên thành tích các số nguyên tố.',
    category: 'public-key'
  },
  {
    id: 'elgamal',
    title: 'Hệ mật mã ElGamma',
    description: 'Hệ mật mã ElGamal dựa trên vấn đề logarit rời rạc và có thể được sử dụng cho cả mã hóa và chữ ký số.',
    category: 'public-key'
  },
  {
    id: 'dsa',
    title: 'CHỮ KÝ ĐIỆN TỬ DSA',
    description: 'Thuật toán chữ ký số DSA (Digital Signature Algorithm) dựa trên vấn đề logarit rời rạc, được sử dụng rộng rãi trong xác thực.',
    category: 'public-key'
  }
];

export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find(algo => algo.id === id);
}

export function getAlgorithmsByCategory(category: 'classic' | 'modern' | 'number-theory' | 'public-key'): Algorithm[] {
  return algorithms.filter(algo => algo.category === category);
}
