<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */
   
    'supportsCredentials' => false,
    'allowedOrigins' => array('*'),
    'allowedOriginsPatterns' => array(),
    'allowedHeaders' => array('*'),
    'allowedMethods' => array('*'),
    'exposedHeaders' => array(),
    'maxAge' => 0,

];
