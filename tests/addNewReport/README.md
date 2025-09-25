### Mục tiêu:  
chứng minh tính năng thêm mới hoạt động đúng, dữ liệu lưu chính xác
### Check list:
Kiểm tra hiển thị đủ field
Calendar ngày thăm khám
Kiểm tra để trống -> Hiển thị thông báo lỗi "Field is required"
Kiểm tra chọn ngày quá khứ -> Pass
Kiểm tra chọn ngày tương lại  -> Pass
Kiểm tra chọn ngày hiện tại  -> Pass
Staff:
Kiểm tra để trống -> Hiển thị thông báo lỗi "Field is required"
Chọn 1 staff  -> Pass
Chọn nhiều staff  -> Pass
Người đảm nhiệm:
Kiểm tra để trống -> Pass
Chọn 1  -> Pass
Chọn nhiều  -> Pass
Activity:
Kiểm tra để trống -> Hiển thị thông báo lỗi "Field is required"
Chọn 1 option
Note:
Kiểm tra để trống -> Hiển thị thông báo lỗi "Field is required"
Nhập text <5000 kí tự  -> Pass
Nhập = 5000 kí tự -> Pass
Nhập >5000 kí tự -> Hiển thị thông báo lỗi "Maxleght 5000"
Nhập kí tự đặc biệt, tiếng việt, ... -> Pass
Kiểm tra button:
Cancel -> Đóng popup, không lưu thông tin
Lưu: Lưu thành công -> Hiển thị thông báo thành công, kiểm tra thông được thêm
Double click lưu -> không tạo ra 2 record
### Data test:
Valid
Invalid
### Locator:
Calendar ngày thăm khám
Dropdown list staff
Dropdown list người đảm nhiệm
Dropdown list activity
Text aria Notes
button cancel
Button save


