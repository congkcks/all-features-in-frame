
export interface Algorithm {
  id: string;
  title: string;
  description: string;
  category: "classic" | "modern" | "number-theory" | "public-key";
}

export interface AlgorithmInput {
  key?: string;
  plaintext?: string;
  ciphertext?: string;
  modulus?: number;
  a?: number;
  b?: number;
}

export interface AlgorithmOutput {
  result: string;
  steps?: string[];
}
