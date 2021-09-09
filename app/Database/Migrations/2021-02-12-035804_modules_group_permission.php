<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ModulesGroupPermission extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'm_g_p_id'          => [
				'type'          => 'INT',
				'constraint'    => 11,
				'unsigned'      => true,
				'auto_increment' => true,
			],'m_id' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'m_t_id' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'a_p_g' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]			
		]);
		$this->forge->addKey('m_g_p_id', true);
		$this->forge->createTable('modules_group_permission');
	}

	//--------------------------------------------------------------------

	public function down()
	{
		//
	}
}
