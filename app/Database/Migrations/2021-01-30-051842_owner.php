<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Owner extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'owner_id'          => [
				'type'          => 'INT',
				'constraint'    => 11,
				'unsigned'      => true,
				'auto_increment' => true,
			],
			'owner_name'      => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],
			'owner_icon' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],
			'owner_img' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]
		]);
		$this->forge->addKey('owner_id', true);
		$this->forge->createTable('owner');
	}

	public function down()
	{
		$this->forge->dropTable('owner');
	}
}
