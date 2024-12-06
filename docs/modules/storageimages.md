## Mô tả:
Module dùng để lưu trữ media: images, video ...

Server run:
Chạy trên con local server media.

api:
    /xda/uploadmedia: Dùng để upload media file vào server
        - Upload từ file qua method file upload
        - Upload file từ url:
            - link format: https://www.amazon.com/images/I/81Mkja4gv8L._AC_SX679.jpg

        - Return: {
            - success: 1,
            - media :{
                - mediaurl: 'https://mediadata.suuforest.com/sg/20940923094243.png',
                - mimetype: 'image/png',
                - size: 110
            }
        }

- Backgrounds Tasks:
1. Sync to S3 Storage:
2. 