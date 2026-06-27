<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 16px; background-color: #f4f4f5;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7;">

                    <!-- HEADER -->
                    <tr>
                        <td style="background-color: #18181b; padding: 32px 24px; text-align: center;">
                            <img
                                src="{{ asset('storage/upload/agency/logo.png') }}"
                                alt="Reliable International Travel Services Logo"
                                style="display: block; margin: 0 auto 16px auto; max-width: 140px;"
                            >
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                Verify Your Account
                            </h1>
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style="padding: 32px 24px;">

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #3f3f46; line-height: 24px;">
                                Hi {{ $name }},
                            </p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #3f3f46; line-height: 24px;">
                                Thank you for creating an account with <strong>Reliable International Travel Services</strong>. Please click the button below to verify your email address and activate your account.
                            </p>

                            <!-- CTA -->
                            <div style="text-align: center; margin: 32px 0;">
                                <a
                                    href="{{ $verificationUrl }}"
                                    style="display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;"
                                >
                                    Verify Email Address
                                </a>
                            </div>

                            <!-- PRE-CAUTIONARY NOTE -->
                            <div style="margin-top: 32px; padding: 16px; border-left: 4px solid #ef4444; background-color: #fef2f2; border-radius: 4px;">
                                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #991b1b;">
                                    Security Notice:
                                </p>
                                <p style="margin: 0; font-size: 13px; color: #7f1d1d; line-height: 20px;">
                                    This link will expire in <strong>1 hour</strong>. Please do not share this email or the verification link with anyone. If you did not request this verification, please ignore this email; your account will not be created or activated.
                                </p>
                            </div>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="padding: 20px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #71717a;">
                                © {{ now()->year }} Reliable International Travel Services. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>