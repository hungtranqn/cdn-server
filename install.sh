#!/bin/env bash

# Kiểm tra xem thư mục có tồn tại không và xóa nếu có
[ -d './src/libs/suu' ] && echo "Thư mục './src/libs/suu' tồn tại. Đang xóa..." && rm -rf './src/libs/suu'

# Clone repository vào thư mục mới
git clone https://gitlab.devsgd.com/sgd/suu-framework.git "./src/libs/suu" &&

# Chuyển vào thư mục mới clone
cd ./src/libs/suu || { echo "Không thể chuyển vào thư mục './src/libs/suu'"; exit 1; } &&

# Cài đặt các package cần thiết
npm i &&

# Quay trở lại thư mục gốc của dự án
cd ../../../ || { echo "Không thể quay lại thư mục gốc"; exit 1; } &&

# Cài đặt các package cần thiết cho dự án chính
npm i
