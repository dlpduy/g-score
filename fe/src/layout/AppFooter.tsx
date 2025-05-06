const AppFooter = () => {
    return (
      <footer className="bg-white text-black py-8 mt-auto">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Grid container for the footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {/* Left Column */}
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-center">Giới thiệu</h4>
              <p className="mt-4 text-sm text-center">
                Đây là website quản lý điểm thi và thống kê thí sinh, phục vụ cho nhu cầu tra cứu điểm và thống kê dữ liệu thí sinh một cách nhanh chóng và chính xác.
              </p>
            </div>
  
            {/* Center Column */}
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-center">Liên hệ</h4>
              <ul className="mt-4 text-sm space-y-2 text-left">
                <li>Email: <a href="mailto:dinhlephucduy@gmail.com" className="text-blue-600">dinhlephucduy@gmail.com</a></li>
                <li>Số điện thoại: <a href="tel:+84796865609" className="text-blue-600">0796865609</a></li>
                <li>Địa chỉ: Thủ Đức - TP.Hồ Chí Minh</li>
              </ul>
            </div>
  
            {/* Right Column (Người thực hiện) */}
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-center">Thực hiện</h4>
              <p className="mt-4 text-sm text-left">
                Được phát triển dựa trên <strong className="text-blue-600"><a href="https://tailadmin.com/">TailAdmin</a></strong>
              </p>
                <a
                  href="https://www.linkedin.com/in/dinhlephucduy/"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                >
                  <i className="fab fa-linkedin-in text-lg"></i>
                  <span>LinkedIn: dinhlephucduy</span>
                </a>
                <a
                  href="https://github.com/dlpduy"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                >
                  <i className="fab fa-github text-lg"></i>
                  <span>GitHub: dlpduy</span>
                </a>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="border-t border-gray-300 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Website, All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default AppFooter;
  