<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry Received</title>
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
                                New Website Inquiry
                            </h1>

                            <p style="margin: 12px 0 0 0; color: #d4d4d8; font-size: 14px; line-height: 22px;">
                                A customer has submitted a new inquiry from your official travel website.
                            </p>
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style="padding: 32px 24px;">

                            <div style="margin-bottom: 24px; padding: 20px; border: 1px solid #e4e4e7; border-radius: 10px; background-color: #fafafa;">
                                <p style="margin: 0 0 12px 0; font-size: 14px; color: #52525b;">
                                    <strong>Full Name:</strong>
                                    {{ $data['fullname'] }}
                                </p>

                                <p style="margin: 0 0 12px 0; font-size: 14px; color: #52525b;">
                                    <strong>Email Address:</strong>
                                    {{ $data['email'] }}
                                </p>

                                <p style="margin: 0 0 12px 0; font-size: 14px; color: #52525b;">
                                    <strong>Phone Number:</strong>
                                    {{ $data['phone'] ?? 'N/A' }}
                                </p>

                                <p style="margin: 0 0 8px 0; font-size: 14px; color: #52525b;">
                                    <strong>Message:</strong>
                                </p>

                                <div style="padding: 16px; border-radius: 8px; background-color: #ffffff; border: 1px solid #e4e4e7; color: #3f3f46; font-size: 14px; line-height: 24px; white-space: pre-line;">{{ $data['message'] }}</div>
                            </div>

                            <!-- CTA -->
                            <div style="text-align: center; margin-top: 32px;">
                                <a
                                    href="{{ route('admin.inquiries.details', ['id' => $data['inquiry_id']]) }}"
                                    style="display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-weight: bold;"
                                >
                                    View Inquiry Now
                                </a>
                            </div>

                            <p style="margin: 32px 0 0 0; text-align: center; font-size: 12px; color: #a1a1aa; line-height: 20px;">
                                You are receiving this email because a customer submitted an inquiry through your official website.
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