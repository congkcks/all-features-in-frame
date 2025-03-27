
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CryptoCategory from '../components/CryptoCategory';
import { getAlgorithmsByCategory } from '../data/algorithms';

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const classicCryptography = getAlgorithmsByCategory('classic').map((algo, index) => ({
    id: index + 1,
    title: <Link to={`/algorithm/${algo.id}`} className="hover:underline">{algo.title}</Link> as unknown as string,
    linkId: algo.id
  }));

  const modernCryptography = getAlgorithmsByCategory('modern').map((algo, index) => ({
    id: index + 1,
    title: <Link to={`/algorithm/${algo.id}`} className="hover:underline">{algo.title}</Link> as unknown as string,
    linkId: algo.id
  }));

  const numberTheory = getAlgorithmsByCategory('number-theory').map((algo, index) => ({
    id: index + 1,
    title: <Link to={`/algorithm/${algo.id}`} className="hover:underline">{algo.title}</Link> as unknown as string,
    linkId: algo.id
  }));

  const publicKeyCryptography = getAlgorithmsByCategory('public-key').map((algo, index) => ({
    id: index + 1,
    title: <Link to={`/algorithm/${algo.id}`} className="hover:underline">{algo.title}</Link> as unknown as string,
    linkId: algo.id
  }));

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 bg-card rounded-xl p-6 shadow-sm border"
          >
            <h2 className="text-xl font-semibold mb-4">Chào mừng đến với ứng dụng ôn tập Mật mã học</h2>
            <p className="text-muted-foreground mb-4">
              Ứng dụng này cung cấp các công cụ và kiến thức để học tập và thực hành các thuật toán mã hóa. 
              Bạn có thể xem chi tiết về từng thuật toán và thử nghiệm chúng trực tiếp.
            </p>
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="font-medium text-primary">
                Chọn một thuật toán từ danh sách bên dưới để bắt đầu thử nghiệm.
              </p>
            </div>
          </motion.div>
          
          <CryptoCategory 
            title="MÃ HÓA CỔ ĐIỂN" 
            items={classicCryptography}
            delay={0} 
          />
          
          <CryptoCategory 
            title="MÃ HÓA HIỆN ĐẠI DES, AES" 
            items={modernCryptography}
            delay={1} 
          />
          
          <CryptoCategory 
            title="LÝ THUYẾT SỐ" 
            items={numberTheory}
            delay={2} 
          />
          
          <CryptoCategory 
            title="MÃ HÓA KHÓA CÔNG KHAI – XÁC THỰC- CHỮ KÝ SỐ" 
            items={publicKeyCryptography}
            delay={3} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
