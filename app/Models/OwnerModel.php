<?php

namespace App\Models;

use CodeIgniter\Model;

class Ownermodel extends Model  //Crea el nombre de el modelo 
{
    protected $table = 'owner'; //Trae los datos de la tabla users
    public function getOwner($owner_id = false)
    {
        if ($owner_id === false) {           
            return $this->asArray()->where(['*'])->first(); //->where(['owner_id' => $data]) //Busca con were clausula
        }
        else{
            return $this->asArray()->where(['owner_id' => $owner_id])->first();
        }
    }
}
