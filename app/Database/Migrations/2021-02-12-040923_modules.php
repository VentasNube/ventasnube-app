<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Modules extends Migration
{
	public function up()
	{
		$this->forge->addField([

			'm_t_id'          => [
				'type'          => 'INT',
				'constraint'    => 11,
				'unsigned'      => true,
				'auto_increment' => true,
			],'m_t_type_action'      => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_id' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_name' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_icon' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_color' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_url' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_position' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_position' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]
			
		]);
		$this->forge->addKey('m_t_id', true);
		$this->forge->createTable('modules');
	}

	//--------------------------------------------------------------------

	public function down()
	{
		//
	}
}
