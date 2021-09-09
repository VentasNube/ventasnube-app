<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UsersWorksapaces extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'user_workspace_id'          => [
				'type'          => 'INT',
				'constraint'    => 11,
				'unsigned'      => true,
				'auto_increment' => true,
			],'user_id'      => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'user_group' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'user_workspace_status' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			],'user_workspace_create_time' => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]
			
		]);
		$this->forge->addKey('user_workspace_id', true);
		$this->forge->createTable('users_workspace');
	}

	public function down()
	{
		$this->forge->dropTable('users_workspace');
	}
}
