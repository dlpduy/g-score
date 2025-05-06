```markdown
# 🚀 Dự án G-Score Tra cứu điểm thi THPTQG 2024 - React Vite + Spring Boot + Aiven

Đây là một ứng dụng web gồm 2 phần:
- `fe/` - Frontend sử dụng **React + Vite**
- `be/` - Backend sử dụng **Spring Boot (Java)**
- **Database**: Được lưu trữ trên **Aiven** (MySQL)

---

## 🌐 Link đã deploy

- 🔗 **Frontend (FE):** [https://tracuu-gscore.vercel.app/](https://tracuu-gscore.vercel.app/)
- 🔗 **Backend (BE):** [https://gscore-rlsi.onrender.com/api](https://gscore-rlsi.onrender.com/api)
- 🔗 **Backend (BE) AWS:** [http://3.24.218.139:8080/api](http://3.24.218.139:8080/api) - Dùng để chạy với HTTP

<pre>
## 📁 Cấu trúc dự án

```

project-root/
│
├── be/             # Spring Boot backend
│   ├── src/
│   └── pom.xml
│
├── fe/             # React frontend (Vite)
│   ├── src/
│   └── vite.config.js
│
└── README.md       # Hướng dẫn này

```
</pre>
---

## 🧰 Yêu cầu hệ thống

Đảm bảo bạn đã cài:

- Java 21 hoặc mới hơn
- Maven (hoặc dùng `./mvnw`)
- Node.js (>= 16)
- npm hoặc yarn
- Git

---

## 🗄️ Cấu hình cơ sở dữ liệu (Aiven)

1. Truy cập Aiven và lấy thông tin kết nối:
   - Host
   - Port
   - Database name
   - Username
   - Password
   - (Tuỳ chọn) File SSL CA nếu bắt buộc

2. Ghi lại thông tin để dùng trong cấu hình Spring Boot backend.

---

## ⚙️ Hướng dẫn chạy Backend (Spring Boot)

### Bước 1: Di chuyển vào thư mục backend
```bash
cd be
````

### Bước 2: Cấu hình `application.properties` hoặc `application.yml`

Tạo file `src/main/resources/application.properties` (nếu chưa có):

```properties
server.port=9090

spring.datasource.url=jdbc:postgresql://<HOST>:<PORT>/<DATABASE>?sslmode=require
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> Ghi chú: Nếu bạn dùng MySQL, hãy đổi `jdbc:postgresql` thành `jdbc:mysql` và thay đổi driver phù hợp.

### Bước 3: Build & chạy ứng dụng

```bash
./mvnw spring-boot:run
# hoặc nếu có Maven sẵn:
mvn spring-boot:run
```

> Backend sẽ chạy tại `http://localhost:9090`

---

## 💻 Hướng dẫn chạy Frontend (React + Vite)

### Bước 1: Di chuyển vào thư mục frontend

```bash
cd fe
```

### Bước 2: Tạo file `.env`

Tạo file `.env` trong thư mục `fe/`:

```env
VITE_BACKEND_URL=http://localhost:9090
```

> Đảm bảo backend đang chạy đúng port.

### Bước 3: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 4: Khởi chạy ứng dụng frontend

```bash
npm run dev
# hoặc
yarn dev
```

> Mặc định Vite sẽ chạy tại `http://localhost:5173`

---

## 🧪 Kiểm tra hoạt động

1. Mở trình duyệt và truy cập: `http://localhost:5173`
2. Thực hiện các chức năng trong ứng dụng (đăng nhập, truy xuất dữ liệu,...)
3. Kiểm tra log terminal của backend khi có lỗi

---

## ❓ Một số lỗi thường gặp

| Vấn đề                        | Nguyên nhân & Cách xử lý                                        |
| ----------------------------- | --------------------------------------------------------------- |
| ❌ Không kết nối được DB Aiven | Kiểm tra SSL, host, port, username/password đúng chưa           |
| ❌ Không load được dữ liệu     | Kiểm tra `VITE_BACKEND_URL` đúng chưa, backend có đang chạy không   |

---

## 📌 Mẹo dành cho phát triển

* Dùng plugin **Spring Boot DevTools** để hot reload khi code backend
* Dùng **Postman** hoặc **cURL** để test API nhanh
* Gắn cấu hình Vite để tự động proxy đến backend (nếu cần)

---

## 👨‍💻 Tác giả

* 💼 Tên dự án: *G-Score*
* 👨‍💻 Phát triển bởi: *Dinh Le Phuc Duy*
* 📬 Liên hệ: *[dinhlephucduy@gmail.com](mailto:dinhlephucduy@gmail.com)*

---

## 📄 Giấy phép

Dự án này được phát hành theo [MIT License](LICENSE)

```
