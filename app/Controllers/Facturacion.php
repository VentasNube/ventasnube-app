<?php

namespace App\Controllers;

use Afip;
use Config\Afip as AfipConfig;
use CodeIgniter\Controller;

class Facturacion extends Controller
{
    protected $afip;

    public function __construct()
    {
        $config = new AfipConfig();
        $this->afip = new Afip([
            'CUIT' => $config->cuit,
            'production' => $config->production,
            'cert' => WRITEPATH . $config->cert,
            'key' => WRITEPATH . $config->key,
            'ta_folder' => WRITEPATH . $config->ta_folder,
        ]);
    }
    
// Genero la factura electronica
    public function generarFactura()
    {
        $data = [
            'CantReg' => 1,
            'PtoVta' => 1,
            'CbteTipo' => 6,
            'Concepto' => 1,
            'DocTipo' => 80,
            'DocNro' => 20111111112,
            'CbteDesde' => 1,
            'CbteHasta' => 1,
            'CbteFch' => intval(date('Ymd')),
            'ImpTotal' => 121,
            'ImpTotConc' => 0,
            'ImpNeto' => 100,
            'ImpOpEx' => 0,
            'ImpIVA' => 21,
            'ImpTrib' => 0,
            'MonId' => 'PES',
            'MonCotiz' => 1,
            'Iva' => [
                [
                    'Id' => 5, // 21% IVA
                    'BaseImp' => 100,
                    'Importe' => 21
                ]
            ]
        ];

        try {
            $res = $this->afip->ElectronicBilling->CreateNextVoucher($data);
            return $this->response->setJSON($res);
        } catch (\Exception $e) {
            return $this->response->setJSON(['error' => $e->getMessage()]);
        }
    }
//Consulto los tipo de comprobantes afip q existen
    public function getTaxTypes()
    {
        try {
            $taxTypes = $this->afip->ElectronicBilling->GetTaxTypes();
            return $this->response->setJSON($taxTypes);
        } catch (\Exception $e) {
            return $this->response->setJSON(['error' => $e->getMessage()]);
        }
    }
}
