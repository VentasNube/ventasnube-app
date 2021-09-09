<?php namespace App\Models;

use Myth\Auth\Models\UserModel as MythModel;

class UserModel extends MythModel
{
    protected $returnType = 'App\Entities\User';
    protected $allowedFields = [
        'email', 'password_hash', 'reset_hash', 'reset_at', 'reset_expires', 'activate_hash',
        'status', 'status_message', 'active', 'force_pass_reset', 'permissions', 'deleted_at',
        'firstname', 'lastname', 'phone',
    ];
/*
     protected $allowedFields = [
        'email', 'username', 'password_hash', 'reset_hash', 'reset_at', 'reset_expires', 'activate_hash',
        'status', 'status_message', 'active', 'force_pass_reset', 'permissions', 'deleted_at',
        'firstname', 'last_name', 'phone',
    ];
*/
    protected $useTimestamps = true;
  // 'username'      => 'required|alpha_numeric_punct|min_length[3]|is_unique[users.username,id,{id}]',
    protected $validationRules = [
        'email'         => 'required|valid_email|is_unique[users.email,id,{id}]',       
        'firstname'      => 'required|alpha_numeric_punct|min_length[3]',        
        'lastname'      => 'required|alpha_numeric_punct|min_length[3]',
        'phone'      => 'required|alpha_numeric|min_length[9]',    
        'password_hash' => 'required',
    ];


}
