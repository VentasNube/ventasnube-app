<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Afip extends BaseConfig
{
    public $cuit = 'YOUR_CUIT';
    public $production = false; // Cambia a true en producción
    public $cert = 'certs/certificate.crt';
    public $key = 'certs/private.key';
    public $ta_folder = 'certs'; // Carpeta donde se guardarán los archivos TA (token de autenticación)
}
