
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { getAlgorithmById } from '../data/algorithms';
import AlgorithmSimulator from '../components/AlgorithmSimulator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AlgorithmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const algorithm = id ? getAlgorithmById(id) : undefined;
  
  if (!algorithm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container pt-32 pb-16">
          <Link to="/" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
          
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Không tìm thấy thuật toán</h1>
            <p className="text-muted-foreground">Thuật toán bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container pt-32 pb-16">
        <Link to="/" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">{algorithm.title}</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="simulator">Mô phỏng</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Giới thiệu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-6">
                      {algorithm.description}
                    </p>
                    
                    {algorithm.id === 'caesar' && (
                      <>
                        <h3 className="text-xl font-semibold mb-3">Cách thức hoạt động</h3>
                        <p className="mb-4">
                          Mã Caesar hoạt động bằng cách thay thế mỗi chữ cái trong văn bản gốc bằng một chữ cái khác, 
                          được xác định bằng cách dịch chuyển một số vị trí cố định trong bảng chữ cái.
                        </p>
                        
                        <h4 className="text-lg font-semibold mb-2">Mã hóa</h4>
                        <div className="p-3 bg-muted rounded-md mb-4">
                          <code>E(x) = (x + k) mod 26</code>
                        </div>
                        
                        <h4 className="text-lg font-semibold mb-2">Giải mã</h4>
                        <div className="p-3 bg-muted rounded-md mb-4">
                          <code>D(x) = (x - k) mod 26</code>
                        </div>
                        
                        <p>
                          Trong đó <code>k</code> là khóa (độ dịch), <code>x</code> là giá trị số của chữ cái (A=0, B=1, ..., Z=25)
                        </p>
                      </>
                    )}
                    
                    {algorithm.id === 'playfair' && (
                      <>
                        <h3 className="text-xl font-semibold mb-3">Cách thức hoạt động</h3>
                        <p className="mb-4">
                          Mã Playfair sử dụng ma trận 5x5 của các chữ cái, được tạo ra từ một từ khóa.
                          Văn bản được chia thành các cặp chữ cái và mỗi cặp được mã hóa theo quy tắc:
                        </p>
                        
                        <ol className="list-decimal pl-5 mb-4 space-y-2">
                          <li>Nếu hai chữ cái nằm trên cùng một hàng, thay thế bằng chữ cái bên phải của mỗi chữ cái (quay vòng nếu cần).</li>
                          <li>Nếu hai chữ cái nằm trên cùng một cột, thay thế bằng chữ cái bên dưới của mỗi chữ cái (quay vòng nếu cần).</li>
                          <li>Nếu hai chữ cái tạo thành một hình chữ nhật, thay thế bằng chữ cái ở cùng hàng nhưng ở cột của chữ cái kia.</li>
                        </ol>
                        
                        <p>
                          Trong ma trận, thường chữ J được loại bỏ hoặc kết hợp với chữ I.
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Danh mục</h4>
                        <p>{algorithm.category === 'classic' ? 'Mã hóa cổ điển' : 
                           algorithm.category === 'modern' ? 'Mã hóa hiện đại' :
                           algorithm.category === 'number-theory' ? 'Lý thuyết số' :
                           'Mã hóa khóa công khai'}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Độ an toàn</h4>
                        <p>{algorithm.category === 'classic' ? 'Thấp - Phù hợp cho mục đích học tập' : 
                           algorithm.category === 'modern' ? 'Cao - Phù hợp cho các ứng dụng thực tế' :
                           algorithm.category === 'number-theory' ? 'N/A - Thuật toán hỗ trợ' :
                           'Rất cao - Tiêu chuẩn hiện đại'}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Ứng dụng</h4>
                        <p>{algorithm.category === 'classic' ? 'Lịch sử, giáo dục' : 
                           algorithm.category === 'modern' ? 'Bảo mật dữ liệu, truyền thông an toàn' :
                           algorithm.category === 'number-theory' ? 'Nền tảng cho các thuật toán mã hóa' :
                           'Xác thực, chữ ký số, mã hóa web'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simulator">
            <Card>
              <CardHeader>
                <CardTitle>Mô phỏng thuật toán {algorithm.title}</CardTitle>
                <CardDescription>
                  Nhập dữ liệu và thử nghiệm thuật toán {algorithm.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlgorithmSimulator algorithmId={algorithm.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AlgorithmDetail;
