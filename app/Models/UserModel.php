<?php namespace App\Models;

use Myth\Auth\Models\UserModel as MythModel;

class UserModel extends MythModel
{
    protected $allowedFields = [
        'email','password_hash', 'reset_hash', 'reset_at', 'reset_expires', 'activate_hash',
        'status', 'status_message', 'active', 'force_pass_reset', 'permissions', 'deleted_at',
        'lastname', 'phone',
    ];

    protected $validationRules = [
         'email'         => 'required|valid_email|is_unique[users.email,id,{id}]',       
         'username'      => 'required|alpha_numeric_punct|min_length[3]', 
          //'firstname'      => 'required|alpha_numeric_punct|min_length[3]', 
         'lastname'      => 'required|alpha_numeric_punct|min_length[3]',
          // 'phone'      => 'required|alpha_numeric|min_length[9]|is_unique[users.phone,id,{id}]', 
          'phone'      => 'required',    
         'password_hash' => 'required',
    ];

    protected $table = 'users'; //Trae los datos de la tabla users
    public function getUser($user_id = false)
    {
        if ($user_id === false) {           
            return $this->asArray()->where(['*'])->first(); //->where(['owner_id' => $data]) //Busca con were clausula
        }
        else{
            return $this->asArray()->select('username , email , lastname, phone')->where(['id' => $user_id])->first();
        }
    }

    public function getUserData($user_id = false, $user_data)
    {
        if ($user_id === false) {           
            return $this->asArray()->where(['*'])->first(); //->where(['owner_id' => $data]) //Busca con were clausula
        }
        else{
                    //$this->asArray()->select('*')->where(['id' => $user_id])->first();
            $query =  $this->getWhere(['id' => $user_id]);
            // $query =  $this->get();
                foreach ($query->getResult() as $row)
                {
                    return $row->$user_data;
                }
        }
    }



}