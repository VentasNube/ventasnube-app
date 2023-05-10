//**** VARIABLES GLOBALES */
////-----(MOTOR AJAX)-----////
// TRAE LOS DATOS DEL TEMPLATE CON AJAX Y COPILALAS VISTAS
function getTemplateAjax(path, callback) {
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

// ARMA EL TEMPLATE PARA COMPILAR 
function renderHandlebarsTemplate(withTemplate, inElement, withData, callback) {
    getTemplateAjax(withTemplate, function(template) {
        var targetDiv = (typeof inElement == 'string') ? $(inElement) : inElement;
        targetDiv.html(template(withData));
        if (callback) {
            callback()
        }
    })
};

// LOGICA PARA LEER LOS PARAMETROS DE LA URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
