<?php
include('emailexport.class.php');
$emailExport = new emailExport();

$emails = array();
$emails[] = array('firstName' => 'Igor', 'middleName' => 'Herson', 'lastName' => 'Aquino', 'email1' => 'igorhaf@gmail.com', 'email2' => 'ihaf@ig.com.br', 'email3' => 'ihaf@hotmail.com');
$emails[] = array('firstName' => 'Jenner', 'middleName' => 'Portela', 'lastName' => 'Chagas', 'email1' => 'gtr_portela@hotmail.com', 'email2' => 'jenner.gtr@gmail.com');

$emailExport->getList($emails);
$emailExport->exportVcard();
$emailExport->exportCsv();
?>
<p align="right"><span><a href="export.vcf">Exportar para vCard</a></span> - <span><a href="export.csv">Exportar para CVS</a></span></p>