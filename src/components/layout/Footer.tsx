
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t mt-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mã hóa học. Tất cả quyền được bảo lưu.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
