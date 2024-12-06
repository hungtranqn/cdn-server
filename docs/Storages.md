## Cấu trúc lưu trữ:

1. Cached: sử dụng mongodb, model: mediacache để lưu trữ cache query media. cache sẽ tự động xóa sau 1 ngày.
2. Save in monogdb & ssd:
   * DB Mongodb: sử dụng model: mediacontents để lưu các meta gồm: uri, urihash, size, minetype
   * SSD: lưu trữ nội dung ảnh, media dưới dạng gzip file vào thư mục data/storage/media
   * Data sẽ được nén dưới dạng gzip trước khi được lưu vào ssd
   * File name: tạo mã hash md5 của uri, tạo path dạng: /path1/path2/path3/path4/urihash.gzx trong đó mỗi path là chuỗi 3 kí tự liên tiếp trong chuỗi hash theo vị trí: 0-3, 3-6, 6-9, 9-12
   * gzx là file extension của lưu trữ.
3. S3 Storage:
   * Các file ảnh dưới dạng nén, ngoài lưu trữ trong ssd, thì sẽ được uploads lên host cloud host của vultr.com dạng storage object, và tương thích với S3 Storage.