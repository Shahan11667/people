<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Our System!</title>
</head>
<body>
    <h1>Hello {{ $person->name }}!</h1>
    <p>We are excited to have you in our system.</p>
    <p>Your details:</p>
    <ul>
        <li>Name: {{ $person->name }} {{ $person->surname }}</li>
        <li>Email: {{ $person->email }}</li>
        <li>Mobile: {{ $person->mobile_number }}</li>
        <li>Language: {{ $person->language }}</li>
    </ul>
    <p>Thank you for joining us!</p>
</body>
</html>
