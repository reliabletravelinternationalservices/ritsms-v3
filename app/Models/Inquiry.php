<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $table = 'inquiries';

    protected $primaryKey = 'id';
    protected $fillable = [
        'fullname',
        'email',
        'phone',
        'message',
    ];
}
