<?php

namespace App\Models;

use CodeIgniter\Model;

class WorkspaceModel extends Model
{
    protected $table;
    protected $allowedFields = ['workspace_name', 'workspace_plan', 'workspace_plan_expiration', 'workspace_db_pacht', 'workspace_status', 'workspace_web', 'workspace_phone', 'workspace_zona_h', 'workspace_icon', 'workspace_img'];

    protected $validationRules = [
        // 'workspace_id'        => 'required',required|valid_email|is_unique[users.email,id,{id}]
        'workspace_name' => 'required|alpha_numeric_space|is_unique[workspace.workspace_name,workspace_id,{workspace_id}|min_length[3]',
        'workspace_plan' => 'required',
        'workspace_plan_expiration' => 'required',
        'workspace_db_pacht' => 'required',
        'workspace_status' => 'required',

    ];

    protected $validationMessages = [
        'workspace_name' => [
            'is_unique' => 'Lo siento. Este nombre ya esta en uso. Por favor elije otro.',
        ],
    ];

    public function __construct()
    {
        parent::__construct();
        $db = \Config\Database::connect();

        //   $this->load->database();
        // $this->table = $this->db->table('workspace');
    }

    // $db = \Config\Database::connect();
    //$builder = $db->table('users');
    /*
    protected $table      = 'users';
    protected $primaryKey = 'id';

    protected $useAutoIncrement = true;
    protected $returnType     = 'array';
    protected $useSoftDeletes = true;
    protected $allowedFields = ['name', 'email'];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
     */
    // protected $table = 'workspace'; //Trae los datos de la tabla users
    // protected $table = 'Students';
    // protected  $primaryKey = 'workspace_id';
    // Workspace filas
    // workspace_id    workspace_name    workspace_plan    workspace_plan_expiration    workspace_db_pacht    workspace_status    workspace_web    workspace_phone    workspace_zona_h    workspace_icon    workspace_img
    // Users_workspace
    /* public function new_ws($ws_data = false)
    {
        if ($ws_data === false) {
            return $this->asArray()->where(['*'])->first(); //->where(['owner_id' => $data]) //Busca con were clausula
        } else {
            $this->table = $this->db->table('workspace');
            $workspace_id = $this->table->insert($ws_data);
            return $ws_data;
        }
    }
    public function new_user_ws($ws_user_data = false)
    {
        if ($ws_user_data === false) {
            $response = ['msj' => 'Ocurrio un error y no se pudo crear el usuario', 'result' => true];
            return $response;
        } else {
            $this->table = $this->db->table('users_workspace');
            $workspace_id = $this->table->insert($ws_user_data);
            $response = ['data' => $ws_user_data, 'msj' => 'Se creo el usuario con exito', 'result' => true];
            return $response;
        }
    }*/
    //Paso los parametros para insertar un item de la DB
    public function insert($table = false, $data = null)
    {
        if ($table === false) {
            $response = ['data' => $data, 'msj' => 'Falta la tabla o los datos', 'result' => false];
            return $response;
        } else {
            $this->table = $this->db->table($table);
            $this->table->insert($data);
            $response = ['data' => $data, 'msj' => 'Se inserto el registro con exito', 'result' => true];
            return $response;
        }
    }

       //Paso los parametros para eliminar un item de la DB
    public function edit($table = false, $data = null, $where = false, $where_id = false)
       {
           if ($table === false) {
              return false;
           } else {
              $this->table = $this->db->table($table);
              $this->table->where($where, $where_id)->update($data);          
               return true;
           }
      }

    //Paso los parametros para eliminar un item de la DB
    public function dell($table = false, $where = false, $where_id = false)
    {
        if ($table === false) {
           return false;
        } else {
           $this->table = $this->db->table($table);
           $this->table->where($where, $where_id)->delete();          
            return true;
        }
    }

    //user_workspace_id    user_id    user_group    user_workspace_status    user_workspace_create_time
    public function get_ws_id($workspace_id = false)
    {
        //  $this->table = $this->db->table('workspace');
        $this->table = $this->db->table('workspace');
        $this->table->select('*');
        $this->table->where('workspace_id', $workspace_id);
        return $this->table->get()->getResultArray();
    }

    //Traigo todos los ws del usuario por la ID 
    public function get_all_ws_user($user_id = false)
    {
        $this->table = $this->db->table('users_workspace');
        $this->table->select('*');
        $this->table->join('workspace', 'workspace.workspace_id = users_workspace.workspace_id');
        // $this->table->orderBy('workspace_id', 'Asc');
        $this->table->where('user_id', $user_id);
        $query = $this->table->get()->getResultArray();
        if ($query) {
            foreach ($query as $row) {
                $row_m[] = array(
                    'ws_id' => $row['workspace_id'],
                    'ws_id_hex' => $row['workspace_id_hex'],
                    'ws_color' => $row['workspace_color'],
                    'ws_name' => $row['workspace_name'],
                    'ws_img' => $row['workspace_img'],
                    'ws_status' => $row['workspace_status'],
                    'ws_plan_expiration' => $row['workspace_plan_expiration'],                    
                    'ws_workspace_plan' => $row['workspace_plan'],
                    'result' => true,
                );
            }
            return $row_m;
        } else {
            return false;
        }
    }

    //Traigo todos los ws del usuario por la ID 
    public function get_ws_id_user_id($ws_id = false,$user_id = false)
    {
        $this->table = $this->db->table('users_workspace');
        $this->table->select('*');
        $this->table->join('workspace', 'workspace.workspace_id = users_workspace.workspace_id');
        // $this->table->orderBy('workspace_id', 'Asc');
        $this->table->where('user_id', $user_id);
        $this->table->where('workspace_id', $ws_id);
        $query = $this->table->get()->getResultArray();
        if ($query) {
            foreach ($query as $row) {
                $workspace_id = $row['workspace_id'];
                $ws_user_id = $row['user_id'];
                if($workspace_id ===  $ws_id || $ws_user_id === $user_id){
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    //Modelo de insercion de datos a CouchDB
    public function curl_put($ws_db_name = false, $ws_db_data = false)
    {
        if ($ws_db_name === false) {
            $response = ['msj' => 'Ocurrio un error y no se pudo crear la db', 'result' => true];
            return $response;
        } else {
            $client = \Config\Services::curlrequest();
            $url = 'http://admin:Cou6942233Cou@ventasnube-couchdb:5984/' . $ws_db_name;
            $response = $client->request('PUT', $url, ['json' => $ws_db_data, 'http_errors' => false]);
            $response_code = $response->getStatusCode(); //Devuelvo un el codigo de status
            return $response_code;
        }
    }

     //Modelo de insercion de datos a CouchDB
     public function curl_get($ws_db_name = false, $ws_db_data = false)
     {
         if ($ws_db_name === false) {
             $response = ['msj' => 'Ocurrio un error y no se pudo crear la db', 'result' => true];
             return $response;
         } else {
             $client = \Config\Services::curlrequest();
             $url = 'http://admin:Cou6942233Cou@ventasnube-couchdb:5984/' . $ws_db_name;
             $response = $client->request('GET', $url);  //Devuelvo el contenido del documento
             $body = $response->getBody();   
             // $response_code = $response->getStatusCode(); //Devuelvo un el codigo de status
             return $body;
         }
     }

    //Modelo de elimiar Bases de datos en CouchDB
    public function curl_delete_db($ws_db_name = false)
    {
        if ($ws_db_name === false) {
            $response = ['msj' => 'Ocurrio un error y no se pudo crear la db', 'result' => true];
            return $response;
        } else {        
            $client = \Config\Services::curlrequest();
            $url = 'http://admin:Cou6942233Cou@ventasnube-couchdb:5984/' . $ws_db_name;
            $response = $client->request('DELETE', $url, ['http_errors' => false]);
            $response_code = $response->getStatusCode(); //Devuelvo un el codigo de status
            return $response_code;
        }
    }

     //Agregar rol a usuario y autorizar en la DB Cocuchdb
	public function add_rol($ws_id,$module,$new_rol,$user_email)
	{	
 
        $user_url = '/_users/org.couchdb.user:'.$user_email;
        $query = $this->curl_get($user_url);
        $json = json_decode($query);
        // $ws_id = '323130';
        $new_rol = $module.'_'. $new_rol .'_'. $ws_id;
        $edit_roles = $json->roles;
        // $array = array(5, "45", "78", "17", "5");
       /* var_export ($edit_roles);
        $filter_rol = array_search($new_rol,$edit_roles,false);
        if($filter_rol){
            // FIltro el array para q no alla duplicados
            $msj = "El rol ".$new_rol." esta en el indice: " .$filter_rol;
           return  json_encode($msj);
        }*/
         //   else{
            if($edit_roles){
             array_push($edit_roles,$new_rol);

             $ws_security_doc_edited = [
                        '_id' =>  $json->_id,
                        '_rev' => $json->_rev,
                        'name' =>  $json->name,
                        'firstname' => $json->firstname,			
                        'lastname' => $json->lastname,
                        // 'password' => 'Ven6942233', //Solo en la actualizacion del pasword se usa
                        'email' => $json->email, 
                        'phone' => $json->phone, 
                        'created_at' => $json->created_at, 
                        'update_at' => now(),
                        'type' => $json->type,
                        'active' => $json->active,
                        'roles' => $edit_roles,
                        'password_scheme'=> $json->password_scheme,
                        'iterations'=> $json->iterations,
                        'derived_key'=>$json->derived_key,
                        'salt'=> $json->salt
             ];
        
             $this->curl_put($user_url, $ws_security_doc_edited);
             return true;
        }
 

	}



}
