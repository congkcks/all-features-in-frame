
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="py-6 backdrop-blur-sm bg-background/80 fixed top-0 left-0 right-0 z-50 border-b">
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="text-primary font-semibold">Mã hóa</span> học
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Trang chủ</Link>
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Mã hóa cổ điển</Link>
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Mã hóa hiện đại</Link>
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Lý thuyết số</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
