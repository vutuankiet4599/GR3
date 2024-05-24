<x-mail::message>
# Xin chào {{ $data['username'] }}

## Chúng tôi xin phép được chuyển lời từ công ty {{ $data['company_name'] }} đến bạn.
 
<x-mail::promotion>{{ $data['body'] }}</x-mail::promotion>
 
Cảm ơn bạn rất nhiều<br>
{{ config('app.name') }}
</x-mail::message>