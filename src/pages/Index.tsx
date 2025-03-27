
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CryptoCategory from '../components/CryptoCategory';

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const classicCryptography = [
    { id: 1, title: 'Caesar' },
    { id: 2, title: 'Mã cặp playfair' },
    { id: 3, title: 'Mã đa bảng chữ - VIGENERE CIPHER' },
    { id: 4, title: 'Mã hoán vị' },
  ];

  const modernCryptography = [
    { id: 1, title: 'Thuật toán sinh khóa con cho mỗi vòng lặp' },
    { id: 2, title: 'Thuật toán mã hóa' },
  ];

  const numberTheory = [
    { id: 1, title: 'Tính lũy thừa modulo' },
    { id: 2, title: 'Giải hệ phương trình đồng dư' },
    { id: 3, title: 'Căn nguyên thủy và logarit rời rạc' },
  ];

  const publicKeyCryptography = [
    { id: 1, title: 'Trao đổi khóa Diffie-Hellman' },
    { id: 2, title: 'Thuật toán RSA' },
    { id: 3, title: 'Hệ mật mã ElGamma' },
    { id: 4, title: 'CHỮ KÝ ĐIỆN TỬ DSA' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Mật mã học
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold mb-4 tracking-tight"
          >
            NỘI DUNG ÔN TẬP MÔN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Tất cả các kiến thức cần thiết về mã hóa, giải mã và bảo mật thông tin
          </motion.p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <CryptoCategory title="MÃ HÓA CỔ ĐIỂN" items={classicCryptography} delay={0} />
          <CryptoCategory title="MÃ HÓA HIỆN ĐẠI DES, AES" items={modernCryptography} delay={1} />
          <CryptoCategory title="LÝ THUYẾT SỐ" items={numberTheory} delay={2} />
          <CryptoCategory title="MÃ HÓA KHÓA CÔNG KHAI – XÁC THỰC- CHỮ KÝ SỐ" items={publicKeyCryptography} delay={3} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
