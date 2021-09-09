<?php
namespace Config;
use CodeIgniter\Config\BaseConfig;

class Email extends BaseConfig
{
	public $fromEmail  = 'ventasnube.com@gmail.com';
	public $fromName  = 'Ventas Nube' ;
	public $recipients;
	public $userAgent = 'CodeIgniter';
    public $protocol = 'smtp';
	public $mailPath = '/usr/sbin/sendmail';
	public $SMTPHost = 'smtp.googlemail.com';
	// Enter your email id from where you send email
	public $SMTPUser = 'ventasnube.com@gmail.com';
	// Enter your email's password
	//public $SMTPPass = 'djtqpaxoxqxmmbix'; //la cambie el 29-03-21
	public $SMTPPass = 'gxigcmoswzqaabkw';// La cree	 el 29-03-21
	public $SMTPPort = 465;
	public $SMTPTimeout = 60;
	public $SMTPKeepAlive = false;
	public $SMTPCrypto = 'ssl';
	public $wordWrap = true;
	public $wrapChars = 76;
	public $mailType = 'html';
	public $charset = 'UTF-8';
	public $validate = false;
	public $priority = 3;
	public $CRLF = "\r\n";
	public $newline = "\r\n";
	public $BCCBatchMode = false;
	public $BCCBatchSize = 200;
	public $DSN = false;
}