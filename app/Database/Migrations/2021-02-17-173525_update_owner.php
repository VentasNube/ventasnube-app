<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UpdateOwner extends Migration
{
	public function up()
	{
	
		$fields = [
			'owner_zona_h'				=> ['type' => 'varchar', 'constraint' => 191],
			'owner_email'					=> ['type' => 'varchar', 'constraint' => 191],
			'owner_web'				=> ['type' => 'varchar', 'constraint' => 191],
			'owner_phone'					=> ['type' => 'varchar', 'constraint' => 191],
			'owner_whatsapp'				=> ['type' => 'varchar', 'constraint' => 191],
			'owner_instagram'					=> ['type' => 'varchar', 'constraint' => 191],	
			'owner_facebook'					=> ['type' => 'varchar', 'constraint' => 191],
		];
		$this->forge->addColumn('owner', $fields);
	}

	//--------------------------------------------------------------------

	public function down()
	{
		$fields = [
			'owner_zona_h'				=> ['type' => 'varchar', 'constraint' => 191],
			'owner_email'					=> ['type' => 'varchar', 'constraint' => 191],
			'owner_web'				=> ['type' => 'varchar', 'constraint' => 191],
			'owner_phone'					=> ['type' => 'varchar', 'constraint' => 191],
			'owner_whatsapp'				=> ['type' => 'varchar', 'constraint' => 191],
			'owner_instagram'					=> ['type' => 'varchar', 'constraint' => 191],	
			'owner_facebook'					=> ['type' => 'varchar', 'constraint' => 191],
		];
		$this->forge->dropColumn('owner', $fields);
	}
}
