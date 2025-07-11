# Email Templates for testecommerce

Copy these templates to your Supabase dashboard under Authentication > Email Templates

## Confirm Signup

Subject: Bevestig je account voor testecommerce

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #34D186; color: white; padding: 20px; text-align: center; }
    .button { display: inline-block; padding: 12px 24px; background-color: #34D186; color: white; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welkom bij testecommerce!</h1>
    </div>
    <p>Bedankt voor je registratie. Klik op de onderstaande knop om je account te bevestigen:</p>
    <p style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" class="button">Bevestig Account</a>
    </p>
    <p>Of kopieer deze link: {{ .ConfirmationURL }}</p>
  </div>
</body>
</html>
```

## Reset Password

Subject: Reset je wachtwoord voor testecommerce

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #34D186; color: white; padding: 20px; text-align: center; }
    .button { display: inline-block; padding: 12px 24px; background-color: #34D186; color: white; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Wachtwoord Reset</h1>
    </div>
    <p>Je hebt een wachtwoord reset aangevraagd. Klik op de onderstaande knop om een nieuw wachtwoord in te stellen:</p>
    <p style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" class="button">Reset Wachtwoord</a>
    </p>
    <p>Of kopieer deze link: {{ .ConfirmationURL }}</p>
    <p>Als je geen reset hebt aangevraagd, kun je deze email negeren.</p>
  </div>
</body>
</html>
```
