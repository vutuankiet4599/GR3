<x-mail::message>
# Xin chào {{ $data['username'] }}

## Chúng tôi xin phép được chuyển lời từ công ty {{ $data['company_name'] }} đến bạn.
 
<x-mail::panel>{{ $data['body'] }}</x-mail::panel>
 
Cảm ơn bạn rất nhiều<br>
{{ config('app.name') }}
</x-mail::message>