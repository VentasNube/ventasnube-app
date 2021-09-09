<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Worksapaces extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'workspace_id'          => [
				'type'          => 'INT',
				'constraint'    => 11,
				'unsigned'      => true,
				'auto_increment' => true,
			],
			'workspace_name'      => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_plan' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_plan_expiration' => [
				'type'          => 'int',
				'constraint'    => '11',
				'null'          => true,
			],'workspace_db_pacht' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_status' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_web' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_phone' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_zona_h' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_icon' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'workspace_img' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]
			
		]);
		$this->forge->addKey('workspace_id', true);
		$this->forge->createTable('workspace');
	}

	public function down()
	{
		$this->forge->dropTable('workspace');
	}
}
