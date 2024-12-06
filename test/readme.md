# Suu Framework

### Cách cài thư viện cho project:

- Chạy git clone https://gitlab.devsgd.com/sgd/suu-framework.git vào thư mực src/libs/suu

  ```
     git clone https://gitlab.devsgd.com/sgd/suu-framework.git ./suu/libs/suu
  ```
- Chạy npm install để cài đặt các nodejs packages từ file package.json

  ```
  npm i
  ```

## Cấu trúc thư mục của project sử dụng framework: **suu-framework**

Project chạy các modules dưới dạng các instances process nhỏ hơn. mỗi process chạy 1 hoặc nhiều nhiệm vụ lớn.

- bin: thư mục chứa các file thực thi để chạy project
- etc: thư mục chứa cấu hình
- public
- src: thưc mục chứa mã nguồn project
    - libs: Thư mục chứa các thư viện của SGD Teams hoặc các thư viện tự viết
    - modules: thư mục chứa các modules
        - commons: module chung cho toàn project
            - controllers
            - middleware: Các middleware được khai báo trong thư mục này sẽ được load tự động khi webserver load.
                - xda
                - api
                - admin
            - models
            - routes:  Các routers được khai báo trong thư mục này sẽ được load tự động khi webserver load.
                - xda: thư mục chứa các router của module xda
                - api: thư mục chứa các router của module api
                - admin
            - utils
            - taskprocess: thư mục chứa các tiến trình chạy các nhiệm vụ của module
            - views
            - bootstrap.js: bootstrap của module. dùng để khởi động các projects, task ...
        - module_name: đây là thư mục chứa module ứng dụng. có cấu trúc như module commons

## Cấu trúc các tiến trình trong project:

A. Ứng dụng process được thiết kế chạy nhiều process, mỗi process sẽ chạy 1 hoặc nhiều nhiệm vụ, tùy từng trường hợp sử dụng. trong đó có 2 process được khởi động mặc định là:
webserver và commons process. Các process khác sẽ được khởi tạo khi cần thiết.

1. Webserver: tiến trình chạy service web.
2. commons process: đây là tiến trình xử lí các tác vụ chung chung cho toàn ứng dụng. các nhiệm vụ con có thể chạy trong process này.

**B. Các nhiệm bên trong process con sẽ sử dụng cluster hoặc wroker threads để chạy song song các nhiệm vụ.**