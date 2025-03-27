
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { processCaesar } from '@/lib/algorithms/caesar';
import { processPlayfair } from '@/lib/algorithms/playfair';
import { processVigenere, processVigenereAutokey } from '@/lib/algorithms/vigenere';
import { processMonoalphabetic } from '@/lib/algorithms/monoalphabetic';
import { processTransposition } from '@/lib/algorithms/transposition';

interface AlgorithmSimulatorProps {
  algorithmId: string;
}

const AlgorithmSimulator: React.FC<AlgorithmSimulatorProps> = ({ algorithmId }) => {
  const [key, setKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [output, setOutput] = useState<{ result: string; steps: string[] }>({ result: '', steps: [] });
  const [currentTab, setCurrentTab] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleClear = () => {
    setKey('');
    setPlaintext('');
    setCiphertext('');
    setOutput({ result: '', steps: [] });
  };

  const handleProcess = () => {
    let result;

    switch (algorithmId) {
      case 'caesar':
        if (currentTab === 'encrypt') {
          result = processCaesar({ plaintext, key }, 'encrypt');
        } else {
          result = processCaesar({ ciphertext, key }, 'decrypt');
        }
        break;
      case 'playfair':
        if (currentTab === 'encrypt') {
          result = processPlayfair({ plaintext, key }, 'encrypt');
        } else {
          result = processPlayfair({ ciphertext, key }, 'decrypt');
        }
        break;
      case 'vigenere':
        if (currentTab === 'encrypt') {
          result = processVigenere({ plaintext, key }, 'encrypt');
        } else {
          result = processVigenere({ ciphertext, key }, 'decrypt');
        }
        break;
      case 'vigenere-autokey':
        if (currentTab === 'encrypt') {
          result = processVigenereAutokey({ plaintext, key }, 'encrypt');
        } else {
          result = processVigenereAutokey({ ciphertext, key }, 'decrypt');
        }
        break;
      case 'monoalphabetic':
        if (currentTab === 'encrypt') {
          result = processMonoalphabetic({ plaintext, key }, 'encrypt');
        } else {
          result = processMonoalphabetic({ ciphertext, key }, 'decrypt');
        }
        break;
      case 'transposition':
        if (currentTab === 'encrypt') {
          result = processTransposition({ plaintext, key }, 'encrypt');
        } else {
          result = processTransposition({ ciphertext, key }, 'decrypt');
        }
        break;
      default:
        result = { result: 'Thuật toán chưa được triển khai', steps: [] };
    }

    setOutput(result);
  };

  const getKeyPlaceholder = () => {
    switch (algorithmId) {
      case 'caesar':
        return 'Nhập độ dịch (số)';
      case 'vigenere':
      case 'vigenere-autokey':
        return 'Nhập từ khóa (chuỗi chữ cái)';
      case 'playfair':
        return 'Nhập từ khóa (chuỗi chữ cái)';
      case 'monoalphabetic':
        return 'Nhập bảng thay thế (26 chữ cái)';
      case 'transposition':
        return 'Nhập độ sâu (số)';
      default:
        return 'Nhập khóa';
    }
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="encrypt" onValueChange={(value) => setCurrentTab(value as 'encrypt' | 'decrypt')}>
        <TabsList className="mb-4">
          <TabsTrigger value="encrypt">Mã hóa</TabsTrigger>
          <TabsTrigger value="decrypt">Giải mã</TabsTrigger>
        </TabsList>

        <TabsContent value="encrypt" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Khóa</label>
            <Input 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={getKeyPlaceholder()}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bản rõ</label>
            <Input 
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Nhập văn bản cần mã hóa"
              className="w-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="decrypt" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Khóa</label>
            <Input 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={getKeyPlaceholder()}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bản mã</label>
            <Input 
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              placeholder="Nhập văn bản cần giải mã"
              className="w-full"
            />
          </div>
        </TabsContent>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleProcess} className="flex-1">Thực hiện</Button>
          <Button variant="outline" onClick={handleClear} className="flex-1">Xóa</Button>
        </div>

        {output.result && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Kết quả:</h3>
            <div className="p-3 bg-muted rounded-md mb-4">
              {output.result}
            </div>
            
            <h3 className="font-semibold mb-2">Các bước thực hiện:</h3>
            <div className="p-3 bg-muted rounded-md whitespace-pre-line">
              {output.steps.map((step, index) => (
                <div key={index} className="mb-1">{step}</div>
              ))}
            </div>
          </div>
        )}
      </Tabs>
    </Card>
  );
};

export default AlgorithmSimulator;
