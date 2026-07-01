<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
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
                                alt="Travel Logo"
                                style="display: block; margin: 0 auto 16px auto; max-width: 140px;"
                            >
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                Password Reset Request
                            </h1>
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style="padding: 32px 24px;">

                            <p style="margin: 0 0 16px 0; font-size: 16px; color: #18181b; font-weight: bold;">
                                Hello {{ $user->name }},
                            </p>

                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #52525b; line-height: 22px;">
                                We received a request to change the security credentials associated with your account. Click the button below to establish a new password securely.
                            </p>

                            <!-- ACTION CALLOUT CARD -->
                            <div style="margin-bottom: 24px; padding: 24px; border: 1px solid #e4e4e7; border-radius: 10px; background-color: #fafafa; text-align: center;">
                                <a
                                    href="{{ $resetUrl }}"
                                    style="display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-weight: bold;"
                                >
                                    Reset Password
                                </a>
                                
                                <p style="margin: 16px 0 0 0; font-size: 12px; color: #71717a;">
                                    <strong>Security Notice:</strong> This secure authorization link will expire in 60 minutes.
                                </p>
                            </div>

                            <p style="margin: 24px 0 0 0; font-size: 13px; color: #71717a; line-height: 20px;">
                                If you did not execute this request, no further actions are necessary; your authentication details remain fully protected and you may safely discard this notification.
                            </p>

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