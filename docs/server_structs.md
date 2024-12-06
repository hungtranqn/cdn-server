## Cấu trúc server:

1. Live server: đây là server dùng để load ảnh cho website.
   * Server này chỉ lưu trừ từ 50gb - 250gb ảnh. chạy mongodb, redis cache, varnish ...
2. Local Server: đây là server dùng để lưu trữ ảnh, tạo nơi backup ảnh từ các link remote đề phòng link ảnh bị xóa bên phía supplier.