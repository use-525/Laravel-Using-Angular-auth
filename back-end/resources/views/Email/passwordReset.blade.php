@component('mail::message')
# Change Password Request

click on the button

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='. $token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
