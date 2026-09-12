<?php

namespace App\Exceptions\Service;

use Exception;

class ServerErrorException extends Exception
{
    public function __construct()
    {
        parent::__construct(
            'Something went wrong. Please try again later.'
        );
    }
}
