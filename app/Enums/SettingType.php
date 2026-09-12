<?php

namespace App\Enums;

enum SettingType: string
{
    case STRING = 'string';
    case NUMBER = 'number';
    case INT = 'int';
    case BOOLEAN = 'boolean';
    case JSON = 'json';
}
