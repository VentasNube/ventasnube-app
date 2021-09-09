<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class WorksapacesId extends Migration
{
	public function up()
	{
		$fields = [
			'workspace_id'      => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]
		];
		$this->forge->addColumn('users_workspace', $fields);
	}

	public function down()
	{
		$fields = [
			'workspace_id'      => [
				'type'          => 'VARCHAR',
				'constraint'    => '100',
				'null'          => true,
			]
		];
		$this->forge->dropColumn('users_workspace', $fields);
	}
}
