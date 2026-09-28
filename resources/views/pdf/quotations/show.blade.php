@php
    use Carbon\Carbon;

    // ---------- Company (edit once, used everywhere) ----------
    $company = [
        'name'      => 'Reliable International Travel Services',
        'tagline'   => 'Inbound / Outbound',
        'since'     => '2009',
        'dot'       => 'DOT-R4A-TTA-02455-2025',
        'address'   => 'JJSS Commercial Bldg., 2nd Floor C-11, Manalo Road, Brgy. Navarro, General Trias, Cavite, Philippines',
        'landline'  => '(046) 8529-184',
        'mobiles'   => '0908 572 1338 · 0916 766 1959 · 0927 927 5207',
        'emails'    => 'inquiry@reliabletravelph.com · reliabletravelinfo@gmail.com',
        'website'   => 'reliabletravelph.com',
        'facebook'  => 'Reliable International Travel Agency',
        'instagram' => '@reliabletravel',
        'services'  => 'International & domestic tours · Visa & passport assistance · Hotel reservations · Cruise packages · Group travel',
        'signatory' => 'Claire Baria',   // shown under "Authorized signature"; set to null to hide the name
    ];

    // Logo:
    $logoPath = public_path('images/upload/logo.png');
    $hasLogo  = file_exists($logoPath);

    // ---------- Helpers ----------
    $fmt = function ($value, $format = 'M d, Y') {
        if (empty($value)) return '—';
        try { return Carbon::parse($value)->format($format); } catch (\Throwable $e) { return $value; }
    };
    $money = fn ($n) => '₱' . number_format((float) $n, 2);

    $pax       = max(1, (int) $quotation->total_pax);
    $unitPrice = (float) $quotation->tour_date_price;
    $lineTotal = $unitPrice * $pax;
    $status    = strtolower($quotation->status ?? 'draft');
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Quotation {{ $quotation->code }}</title>
<style>
    /* 
      Minimalist Brand Styling:
      Primary text: #1a1a1a · Muted text: #6b7280 · Accent Gold: #D4AF37 · Light Neutral: #f9fafb
      DomPDF-safe: tables + floats only. DejaVu Sans supports ₱.
    */
    @page { margin: 0; }
    * { box-sizing: border-box; }
    body {
        margin: 0;
        font-family: 'DejaVu Sans', Helvetica, Arial, sans-serif;
        font-size: 10px;
        line-height: 1.5;
        color: #1a1a1a;
        background: #ffffff;
    }
    table { border-collapse: collapse; }

    /* ---------- Top Accent Bar ---------- */
    .top-accent { height: 4px; background: #D4AF37; width: 100%; }

    /* ---------- Header ---------- */
    .header { padding: 32px 48px 24px 48px; border-bottom: 1px solid #e5e7eb; }
    .header table { width: 100%; }
    .header td { vertical-align: top; }
    .logo { height: 54px; }
    .company { padding-left: 14px; }
    .company-name { color: #111827; font-size: 13px; font-weight: bold; letter-spacing: .5px; }
    .company-sub { color: #6b7280; font-size: 9px; margin-top: 3px; }
    .doc { text-align: right; }
    .doc-label { color: #9ca3af; font-size: 8.5px; letter-spacing: 1.2px; text-transform: uppercase; }
    .doc-code { color: #111827; font-size: 14px; font-weight: bold; margin-top: 2px; }
    .doc-date { color: #6b7280; font-size: 9px; margin-top: 2px; }

    .content { padding: 30px 48px 120px 48px; }

    /* ---------- Title & Subtitle ---------- */
    .title-section { margin-bottom: 22px; }
    .title { font-size: 20px; font-weight: bold; color: #111827; line-height: 1.2; }
    .subtitle { color: #4b5563; font-size: 10px; margin-top: 4px; }

    /* ---------- Key Facts Panel ---------- */
    .info-box {
        width: 100%;
        background: #fdfdfd;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        margin-bottom: 24px;
    }
    .info-box td { width: 25%; padding: 12px 16px; vertical-align: top; border-right: 1px solid #e5e7eb; }
    .info-box td:last-child { border-right: none; }
    .k { font-size: 8px; color: #6b7280; letter-spacing: .8px; text-transform: uppercase; }
    .v { font-size: 11px; font-weight: bold; color: #111827; margin-top: 3px; }

    /* ---------- Headings ---------- */
    h2 {
        font-size: 9px; 
        font-weight: bold; 
        letter-spacing: 1.2px; 
        text-transform: uppercase;
        color: #374151;
        margin: 24px 0 10px 0; 
        padding-bottom: 4px; 
        border-bottom: 1px solid #e5e7eb;
    }

    .two-col { width: 100%; }
    .two-col td { vertical-align: top; width: 50%; padding-right: 16px; }
    .muted { color: #6b7280; font-size: 9.5px; }

    .badge {
        display: inline-block; padding: 2px 8px; font-size: 8px; font-weight: bold;
        letter-spacing: .8px; text-transform: uppercase; border: 1px solid #d1d5db; color: #374151; border-radius: 12px;
    }
    .badge-accepted { background: #ecfdf5; border-color: #a7f3d0; color: #065f46; }

    /* ---------- Tables / Grids ---------- */
    table.grid { width: 100%; margin-top: 4px; }
    table.grid th {
        text-align: left; font-size: 8.5px; letter-spacing: .8px; text-transform: uppercase;
        color: #6b7280; font-weight: bold; padding: 6px 8px; border-bottom: 1px solid #111827;
    }
    table.grid td { padding: 10px 8px; border-bottom: 1px solid #f3f4f6; vertical-align: top; color: #374151; }
    .leg { font-weight: bold; color: #111827; }
    .r { text-align: right; }
    .c { text-align: center; }

    /* ---------- Totals ---------- */
    table.total { width: 42%; margin-left: 58%; margin-top: 14px; }
    table.total td { padding: 5px 8px; color: #4b5563; font-size: 9.5px; }
    table.total .grand td {
        background: #f9fafb; border-top: 1px solid #111827; border-bottom: 1px solid #111827;
        color: #111827; font-size: 11px; font-weight: bold; padding: 8px;
    }
    .per-pax { text-align: right; font-size: 9px; color: #6b7280; margin-top: 4px; padding-right: 8px; }

    .validity { 
        background: #fdfbf7;
        border-left: 2.5px solid #D4AF37; 
        padding: 8px 12px; 
        margin-top: 18px; 
        font-size: 9.5px; 
        color: #555555;
    }

    .note { background: #f9fafb; border: 1px solid #f3f4f6; padding: 10px 12px; font-size: 9.5px; color: #4b5563; border-radius: 4px; }

    ul.terms { margin: 0; padding-left: 14px; font-size: 9px; color: #6b7280; line-height: 1.4; }
    ul.terms li { margin-bottom: 2px; }

    .sign { width: 100%; margin-top: 32px; }
    .sign td { width: 50%; vertical-align: bottom; }
    .sign-line { width: 200px; border-top: 1px solid #9ca3af; padding-top: 4px; font-size: 9.5px; color: #111827; }
    .sign-line small { color: #6b7280; font-size: 8.5px; }

    /* ---------- Footer ---------- */
    .footer {
        position: fixed; bottom: 0; left: 0; right: 0;
        background: #ffffff; border-top: 1px solid #e5e7eb;
        padding: 14px 48px; color: #6b7280; font-size: 7.5px; line-height: 1.5;
    }
    .footer b { color: #374151; }
    .footer table { width: 100%; }
    .footer td { vertical-align: top; }
    .footer .right { text-align: right; }
</style>
</head>
<body>

    <div class="top-accent"></div>

    {{-- Header --}}
    <div class="header">
        <table>
            <tr>
                @if ($hasLogo)
                    <td style="width:58px;"><img class="logo" src="{{ $logoPath }}" alt="Logo"></td>
                @endif
                <td class="company">
                    <div class="company-name">{{ strtoupper($company['name']) }}</div>
                    <div class="company-sub">{{ $company['tagline'] }} &nbsp;·&nbsp; Est. {{ $company['since'] }}</div>
                </td>
                <td class="doc">
                    <div class="doc-label">Quotation</div>
                    <div class="doc-code">{{ $quotation->code }}</div>
                    <div class="doc-date">Issued {{ $fmt($quotation->created_at) }}</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="content">

        {{-- Title --}}
        <div class="title-section">
            <div class="title">{{ $quotation->tour_name }}</div>
            <div class="subtitle">Tour Code: {{ $quotation->tour_code }} &nbsp;&bull;&nbsp; Duration: {{ $quotation->tour_duration }}</div>
        </div>

        {{-- Key facts Grid --}}
        <table class="info-box">
            <tr>
                <td><div class="k">Departure</div><div class="v">{{ $fmt($quotation->departure_date) }}</div></td>
                <td><div class="k">Return</div><div class="v">{{ $fmt($quotation->return_date) }}</div></td>
                <td><div class="k">Travelers</div><div class="v">{{ $pax }} Pax</div></td>
                <td><div class="k">Valid Until</div><div class="v">{{ $fmt($quotation->valid_until) }}</div></td>
            </tr>
        </table>

        {{-- Client --}}
        <h2>Prepared For</h2>
        <table class="two-col">
            <tr>
                <td>
                    <b style="font-size:11px; color:#111827;">{{ $quotation->primary_client_name }}</b><br>
                    <span class="muted">Client Code: {{ $quotation->primary_client_code }}</span><br>
                    {{ $quotation->primary_client_email }} &nbsp;&bull;&nbsp; {{ $quotation->primary_client_phone }}
                </td>
                <td>
                    <div class="k">Status</div>
                    <span class="badge {{ $status === 'accepted' ? 'badge-accepted' : '' }}">{{ $status }}</span>
                    @if ($quotation->accepted_at)
                        <div class="muted" style="margin-top:4px;">Accepted on {{ $fmt($quotation->accepted_at) }}</div>
                    @endif
                </td>
            </tr>
        </table>

        {{-- Flights --}}
        <h2>Flight Details</h2>
        <table class="grid">
            <thead>
                <tr>
                    <th style="width:18%;">Leg</th>
                    <th style="width:28%;">Date</th>
                    <th style="width:18%;">Time</th>
                    <th style="width:18%;">Flight No.</th>
                    <th style="width:18%;">Airline</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="leg">Departure</td>
                    <td>{{ $fmt($quotation->departure_date, 'D, M d, Y') }}</td>
                    <td>{{ $fmt($quotation->departure_time, 'h:i A') }}</td>
                    <td>{{ $quotation->departure_flight_no ?: '—' }}</td>
                    <td rowspan="2" style="vertical-align: middle;">{{ $quotation->airline_name ?: '—' }}</td>
                </tr>
                <tr>
                    <td class="leg">Return</td>
                    <td>{{ $fmt($quotation->return_date, 'D, M d, Y') }}</td>
                    <td>{{ $fmt($quotation->return_time, 'h:i A') }}</td>
                    <td>{{ $quotation->return_flight_no ?: '—' }}</td>
                </tr>
            </tbody>
        </table>

        {{-- Pricing --}}
        <h2>Price Breakdown</h2>
        <table class="grid">
            <thead>
                <tr>
                    <th style="width:52%;">Package Description</th>
                    <th class="c" style="width:10%;">Pax</th>
                    <th class="r" style="width:19%;">Price / Pax</th>
                    <th class="r" style="width:19%;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <b style="color:#111827;">{{ $quotation->tour_name }}</b><br>
                        <span class="muted">{{ $quotation->tour_duration }} &bull; {{ $fmt($quotation->departure_date) }} – {{ $fmt($quotation->return_date) }}</span>
                    </td>
                    <td class="c">{{ $pax }}</td>
                    <td class="r">{{ $money($unitPrice) }}</td>
                    <td class="r" style="font-weight: bold;">{{ $money($lineTotal) }}</td>
                </tr>
            </tbody>
        </table>

        <table class="total">
            <tr><td>Subtotal</td><td class="r">{{ $money($quotation->subtotal) }}</td></tr>
            @if ((float) $quotation->discount_total > 0)
                <tr><td>Discount</td><td class="r">– {{ $money($quotation->discount_total) }}</td></tr>
            @endif
            @if ((float) $quotation->tax_total > 0)
                <tr><td>Tax</td><td class="r">{{ $money($quotation->tax_total) }}</td></tr>
            @endif
            <tr class="grand"><td>Total Amount</td><td class="r">{{ $money($quotation->grand_total) }}</td></tr>
        </table>
        <div class="per-pax">Approx. {{ $money($quotation->grand_total / $pax) }} per person</div>

        <div class="validity">
            <b>Valid until {{ $fmt($quotation->valid_until, 'F d, Y') }}.</b> Rates and seat availability are subject to change until booking is officially confirmed.
        </div>

        {{-- Notes / remarks --}}
        @if ($quotation->notes)
            <h2>Notes</h2>
            <div class="note">{!! nl2br(e($quotation->notes)) !!}</div>
        @endif

        @if ($quotation->remarks)
            <h2>Remarks</h2>
            <div class="note">{!! nl2br(e($quotation->remarks)) !!}</div>
        @endif

        {{-- Terms --}}
        {{-- <h2>Terms &amp; Conditions</h2>
        <ul class="terms">
            <li>Rates are subject to change without prior notice until booking is confirmed with a deposit.</li>
            <li>Cancellations close to the departure date may incur airline, hotel, and service cancellation fees.</li>
            <li>Travelers are solely responsible for ensuring a valid passport, required visas, and adequate travel insurance.</li>
            <li>Flight schedules may change due to airline adjustments or operational requirements.</li>
        </ul> --}}

        {{-- Signature --}}
        <table class="sign">
            <tr>
                <td>
                    <div class="sign-line">
                        {{ $company['signatory'] ?? '' }}<br>
                        <small>Authorized Signature &amp; Date</small>
                    </div>
                </td>
                <td>
                    <div class="sign-line" style="margin-left:auto;">
                        {{ $quotation->primary_client_name }}<br>
                        <small>Client Conforme &amp; Date</small>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    {{-- Footer --}}
    <div class="footer">
        <table>
            <tr>
                <td style="width:55%;">
                    <b>{{ $company['name'] }}</b> &nbsp;&bull;&nbsp; DOT Accr: {{ $company['dot'] }}<br>
                    {{ $company['address'] }}<br>
                    {{ $company['services'] }}
                </td>
                <td class="right">
                    Tel: {{ $company['landline'] }} &nbsp;&bull;&nbsp; Mobile: {{ $company['mobiles'] }}<br>
                    {{ $company['emails'] }}<br>
                    <b>{{ $company['website'] }}</b> &nbsp;&bull;&nbsp; FB: {{ $company['facebook'] }}
                </td>
            </tr>
        </table>
    </div>

</body>
</html>