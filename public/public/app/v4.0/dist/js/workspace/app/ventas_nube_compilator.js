//**** VARIABLES GLOBALES ****/
// NEW 2023 CHATGPT

// Registro de los helpers de Handlebars
// CHATGTP 2023
function registerHandlebarsHelpers() {
    // Helper "with"
    Handlebars.registerHelper("with", function(context, options) {
      return options.fn(context);
    });
  

    Handlebars.registerHelper("userCtx", function(modulo, rol, options) {
        var rol_admin = modulo + "_admin_" + ws_id;
        var rol_edit = modulo + "_edit_" + ws_id;
        var rol_create = modulo + "_create_" + ws_id;
        var rol_reed = modulo + "_reed_" + ws_id;
      
        var userRoles = user_Ctx.userCtx.roles;

        console.log();
      
        if (userRoles.includes(rol_admin)) {
          // El usuario tiene el rol de administrador, se le permite todo
          return options.fn(this);
        } else if (userRoles.includes(rol_edit) && rol === 'edit') {
          // El usuario tiene el rol de edición, se le permite editar
          return options.fn(this);
        } else if (userRoles.includes(rol_create) && rol === 'create') {
          // El usuario tiene el rol de creación, se le permite crear
          return options.fn(this);
        } else if (userRoles.includes(rol_reed) && rol === 'reed') {
          // El usuario tiene el rol de lectura, se le permite leer
          return options.fn(this);
        } else {
          // El usuario no tiene los permisos necesarios, se muestra el bloque inverso
          return options.inverse(this);
        }
      });
      
      






    // Helper "userCtx"
    /*
    Handlebars.registerHelper("userCtx", function(modulo, rol, options) {
      var rol_admin = modulo + "_admin_" + ws_id;
      var rol_edit = modulo + "_edit_" + ws_id;
      var rol_create = modulo + "_create_" + ws_id;
      var rol_reed = modulo + "_redd_" + ws_id;
  
      for (var i = 0, j = user_Ctx.userCtx.roles.length; i < j; i++) {
        var role = user_Ctx.userCtx.roles[i];
  
        if (role === rol_admin || role === rol_edit || role === rol_create || role === rol_reed) {
          return options.fn(this);
        }
      }
  
      return options.inverse(this);
    });
  */




    Handlebars.registerHelper("stock", function(value) {
        var ret = 0;
        for (var i = 0, j = value.length; i < j; i++) {
            ret += parseInt(value[i].quantity);
        }
        // ret = 10;
        return ret;
    });
    //Logica de suma de stok new 2023
     // Suma el valor del objeto quantity en stock_inventari
    Handlebars.registerHelper("available_stock", function(value) {
        var tot_real_stock = 0;
       // var  tot_stock_in = 0;
        var  tot_stock_out = 0;
            for (var i = 0, j = value.length; i < j; i++) {
                if (value[i].type === "in") {
                    //Si tengo coincidenciass
                    tot_real_stock += parseInt(value[i].real_stock);
                }else if(value[i].type === "out"){
                    tot_stock_out += parseInt(value[i].out_stock);
                }
            
            }
       // var available_stock = tot_stock_in - tot_stock_out;
        return tot_real_stock;
    });

    // Trae el primer objeto de un array se usa
    Handlebars.registerHelper("first", function(context, options) {
        var ret = "";
        ret = ret + options.fn(context[0]);
        return ret;
    });
    // COMPARADOR SI TIENE ESO
    Handlebars.registerHelper("if", function(conditional, options) {
        if (conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // COMPARADOR SI ES IGUAL A
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    // COMPARADOR SI ES DIFERENTE A
    Handlebars.registerHelper('ifDiff', function(arg1, arg2, options) {
        return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
    });

    // COMPARADOR SI ES IGUAL A
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // COMPARADOR SI ES MENOR O IGUAL
    Handlebars.registerHelper('ifMe', function(v1, v2, options) {
        if (v1 <= v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    /// CONTADOR DE RESULTADOS DENTRO DE UN EACH  EJ:  {{counter @index}}
    Handlebars.registerHelper("counter", function(index) {
        return index + 1;
    });

    // BUSCADOR TRAE RESULTADOS POR ID DENTRO DE UN ARRAY
    Handlebars.registerHelper("search_id", function(array, id, options) {
        //Recorro el array para buscar coincidencias del valor de ID
        for (var i = 0, j = array.length; i < j; i++) {
            if (array[i].id === id) {
                //Si tengo coincidencias
                return options.fn(array[i]);
            }
            //Si no tengo resultados
            return options.inverse(array[i]);
        }
    });

    // Nuevo para relacionar los nombres de los modulos left nav
    Handlebars.registerHelper('relatedData', function(ws_lang_data, ws_left_nav_data, options) {
        let result = '';
      
        ws_left_nav_data.m_t.forEach(m_t_item => {
          const lang_data_values = Object.values(ws_lang_data);
          const relatedItem = lang_data_values.find(lang_data_item => m_t_item.m_t_name === lang_data_item.m_t_name);
      
          if (relatedItem) {
            result += options.fn({ m_t_name: m_t_item.m_t_name, related_data: relatedItem });
          }
        });
      
        return result;
      });
    // Otros helpers de Handlebars...
    // Puedes registrar aquí otros helpers adicionales
  }
// Llamada a la función de registro de helpers antes de realizar las solicitudes AJAX

// CHATGTP 2023
function getTemplateFetch(path, callback) {
    fetch(path)
      .then(response => response.text())
      .then(data => {
        var source = data;
        var template = Handlebars.compile(source);
        if (callback) {
          callback(template);
        }
      })
      .catch(error => {
        console.error("Error al obtener el template:", error);
      });
  }

// ARMA EL TEMPLATE PARA COMPILAR 
function renderHandlebarsTemplate(withTemplate, inElement, withData, callback) {
    getTemplateFetch(withTemplate, function(template) {
        var targetDiv = (typeof inElement == 'string') ? $(inElement) : inElement;
        targetDiv.html(template(withData));
        if (callback) {
            return callback()
        }
    })
};

// ARMA EL TEMPLATE PARA COMPILAR 
function renderHandlebarsTemplateFetch(withTemplate, inElement, withData, callback) {
    getTemplateFetch(withTemplate, function(template) {
        var targetDiv = (typeof inElement == 'string') ? $(inElement) : inElement;
        targetDiv.html(template(withData));
        if (callback) {
            return callback()
        }
    })
};

// CHATGTP 2023 DEVUELVO UNA PROMESA
function renderHandlebarsTemplatePromise(withTemplate, inElement, withData) {
    return new Promise((resolve, reject) => {
        getTemplateAjax(withTemplate, function(template) {
            var targetDiv = (typeof inElement == 'string') ? $(inElement) : inElement;
            if (!targetDiv.html) {
                reject('targetDiv.html is not a function');
            }
            targetDiv.html(template(withData));
            resolve();
        });
    });
};


////-----(MOTOR AJAX)-----////
// TRAE LOS DATOS DEL TEMPLATE CON AJAX Y COPILALAS VISTAS
function getTemplateAjax(path, callback) {
    var source, template;
    $.ajax({
        url: path,
        dataType: "html",
        success: function(data) {
            
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
}

////-----(MOTOR AJAX)-----////
// TRAE LOS DATOS DEL TEMPLATE CON AJAX Y COPILALAS VISTAS
function getTemplateAjaxOK(path, callback) {
    var source, template;
    $.ajax({
        url: path,
        dataType: "html",
        success: function(data) {
            //Helper with
            Handlebars.registerHelper("with", function(context, options) {
                return options.fn(context);
            });
            
            //Permissions 2023 update
            Handlebars.registerHelper("userCtx", function(modulo, rol, options) {
                //Recorro el array para buscar coincidencias del valor de ID
                var rol = modulo +'_'+ rol +'_'+ ws_id ;

                var roles = user_Ctx.userCtx.roles; //traigo los roles actualizados

                var rol_admin = modulo +'_admin_'+ ws_id ;
                var rol_edit = modulo +'_edit_'+ ws_id ;
                var rol_create = modulo +'_create_'+ ws_id ;
                var rol_reed = modulo +'_redd_'+ ws_id ;

                 console.log('roles roles', roles);
                 console.log('rol_admin rol_admin', rol_admin);
                 console.log('user_Ctx', user_Ctx);
                // console.log('COMO VIENE EL roles', roles ,'COMO TOMO EL roladmin', rol_admin);
                // console.log('COMO esta armado el rol', rol ,'COMO TOMO EL roledit', rol_edit);
                    for (var i = 0, j = roles.length; i < j; i++) {
                        if (roles[i] === rol_admin) {
                           return options.fn(roles[i]);
                        }
                        else if(roles[i] === rol_edit){
                            return options.fn(roles[i]);
                        }
                        else if(roles[i] === rol_create){
                            return options.fn(roles[i]);
                        }
                        else if(roles[i] === rol_reed){
                            return options.fn(roles[i]);
                        }
                    }
                   return options.inverse(roles);
            });
            
            Handlebars.registerHelper("if", function(conditional, options) {
                if (conditional) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });

             //CACLCULO PARA MOSTRAR EL STOCK 2023
            // Suma el valor del objeto quantity en stock_inventari
            Handlebars.registerHelper("stock", function(value) {
                var ret = 0;
                for (var i = 0, j = value.length; i < j; i++) {
                    ret += parseInt(value[i].quantity);
                }
                // ret = 10;
                return ret;
            });

            //Logica de suma de stok new 2023
             // Suma el valor del objeto quantity en stock_inventari
            Handlebars.registerHelper("available_stock", function(value) {
                var tot_real_stock = 0;
               // var  tot_stock_in = 0;
                var  tot_stock_out = 0;
                    for (var i = 0, j = value.length; i < j; i++) {
                        if (value[i].type === "in") {
                            //Si tengo coincidenciass
                            tot_real_stock += parseInt(value[i].real_stock);
                        }else if(value[i].type === "out"){
                            tot_stock_out += parseInt(value[i].out_stock);
                        }
                    
                    }
               // var available_stock = tot_stock_in - tot_stock_out;
                return tot_real_stock;
            });

            // Trae el primer objeto de un array se usa
            Handlebars.registerHelper("first", function(context, options) {
                var ret = "";
                ret = ret + options.fn(context[0]);
                return ret;
            });
            // COMPARADOR SI TIENE ESO
            Handlebars.registerHelper("if", function(conditional, options) {
                if (conditional) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            // COMPARADOR SI ES IGUAL A
            Handlebars.registerHelper('ifCond', function(v1, v2, options) {
                if (v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
            // COMPARADOR SI ES DIFERENTE A
            Handlebars.registerHelper('ifDiff', function(arg1, arg2, options) {
                return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
            });

            // COMPARADOR SI ES IGUAL A
            Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            });

            // COMPARADOR SI ES MENOR O IGUAL
            Handlebars.registerHelper('ifMe', function(v1, v2, options) {
                if (v1 <= v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });

          
            /// CONTADOR DE RESULTADOS DENTRO DE UN EACH  EJ:  {{counter @index}}
            Handlebars.registerHelper("counter", function(index) {
                return index + 1;
            });
           // BUSCADOR TRAE RESULTADOS POR ID DENTRO DE UN ARRAY
            Handlebars.registerHelper("search_id", function(array, id, options) {
                //Recorro el array para buscar coincidencias del valor de ID
                for (var i = 0, j = array.length; i < j; i++) {
                    if (array[i].id === id) {
                        //Si tengo coincidencias
                        return options.fn(array[i]);
                    }
                    //Si no tengo resultados
                    return options.inverse(array[i]);
                }
            });


            // Nuevo para relacionar los nombres de los modulos left nav
            Handlebars.registerHelper('relatedData', function(ws_lang_data, ws_left_nav_data, options) {
                let result = '';
              
                ws_left_nav_data.m_t.forEach(m_t_item => {
                  const lang_data_values = Object.values(ws_lang_data);
                  const relatedItem = lang_data_values.find(lang_data_item => m_t_item.m_t_name === lang_data_item.m_t_name);
              
                  if (relatedItem) {
                    result += options.fn({ m_t_name: m_t_item.m_t_name, related_data: relatedItem });
                  }
                });
              
                return result;
              });
              

            // NO SE USA EN REVISION PARA PROXIMA ACTUALIZACION 

              // Para tomar los 0 como null en el if
            /*
            Handlebars.registerHelper('isdefined', function(value) {
                return value !== undefined;
            });
            */
         
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
}

// DEVUELVO UNA EL OBJETO DEL DOM QUE CREO
/// ADAPTACION QUE DEVUELVE EL OBJETO DEO DOM Q RENDERIZA SE USA EN CARD
function renderHandlebarsTemplateReturn(withTemplate, withData, parentElement) {
    return new Promise((resolve, reject) => {
        if (!parentElement || typeof parentElement.appendChild !== 'function') {
            reject(new Error('parentElement must be a DOM node'));
            return;
        }
        getTemplateFetch(withTemplate, function(template) {
            // Crea un nuevo div para alojar el template.
            var newElement = document.createElement('div');
            newElement.innerHTML = template(withData);
            // Inserta el nuevo elemento en el DOM.
            parentElement.appendChild(newElement);
            // Puedes agregarlo a una instancia existente de Muuri así:
            // Resuelve la promesa con el nuevo elemento.
            resolve(newElement);
        })
    });
}

// LOGICA PARA LEER LOS PARAMETROS DE LA URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// GET URL by PARAMETRO
async function getUrlVal(nombreParametro) {
    return new Promise((resolve, reject) => {
      const urlParams = new URLSearchParams(window.location.search);
      const parametros = Array.from(urlParams.entries());
  
      for (const [nombre, valor] of parametros) {
        if (nombre === nombreParametro) {
          resolve(valor);
          return;
        }
      }
      reject(`El parámetro '${nombreParametro}' no se encuentra en la URL.`);
    });
  }

  // FUNCION QUE BUSCA EN LA URL EL PARAMETRO T y lo imprime en pantalla
async function get_url_now(url_parameter){
    try{
        let board_type_name = await getUrlVal(url_parameter);
        console.log(board_type_name);
        return board_type_name;
    }
    catch(err){
        console.log('Error get board type name', err);
        return false
    }
}

// FUNCION QUE BUSCA EN LA URL EL PARAMETRO T y lo imprime en pantalla
async function get_board_type(url_parameter){
    try{
        let board_type_name = await getUrlVal(url_parameter);
       
        console.log('board type name',board_type_name);
        return board_type_name;
    }
    catch(err){
        console.log('Error get board type name', err);
        let board_type = 'sell'
        return board_type_name = board_type

    }
}
