<x-mail::message>
# Xác nhận thông tin tài khoản

Tài khoản của bạn đã được đăng ký trên hệ thống. Làm ơn nhấn vào nút bên dưới để xác thực tài khoản.
 
<x-mail::button :url="$data['url']">
Xác thực
</x-mail::button>
 
Cảm ơn bạn rất nhiều<br>
{{ config('app.name') }}
</x-mail::message>