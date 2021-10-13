// LOGICA PARA LEER LOS PARAMETROS DE LA URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

///** UTILS ***////
// TRAE LOS DATOS DE LA URL O DA EL PRIMER MODULO Y LOS COMBIERTE EN UN ARRAY PARA USO GLOBAL
function getUrl() {
    var domain_m_url = window.location.host; // Trae www.dominio.com
    var pacht_m_url = window.location.pathname.split('/')[1]; //trae primer /pacht/
    var site_m_url = window.location.href; // Trae la url completa
    var domain_pacht = domain_m_url + '/' + pacht_m_url
    var m_id = getParameterByName('m'); //Trae el modulo id
    var m_t_id = getParameterByName('t'); //Trae el Tipo de modulo id
    var m_t_name = getParameterByName('type'); //Trae el nombre del tipo de modulo
    if (m_id == null) {
        var m_id = $('#n_bar_t_m').attr('m_id');
        if (m_id == null) {
            var m_id = '1';
        }
    }
    if (m_t_id == null) {
        var m_t_id = $('#n_bar_t_m').attr('m_t_id');
        if (m_t_id == null) {
            var m_t_id = '1';
        }
    }
    if (m_t_name == null) {
        var m_t_name = $('#n_bar_t_m').attr('m_t_name');
        if (m_t_name == null) {
            var m_t_name = null;
        }
    }
    var url_now = {
        domain_m_url: domain_m_url,
        domain_pacht: domain_pacht,
        pacht_m_url: pacht_m_url,
        site_m_url: site_m_url,
        m_id: m_id,
        m_t_id: m_t_id,
        m_t_name: m_t_name,
    };
    //   console.log(url_now);
    return url_now;
}

//**** VARIABLES GLOBALES */
var domain_m_url = window.location.host;
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
            // IMPRIME EL PRIMER CARACTER DE UN STRING
            Handlebars.registerHelper('trimString', function(passedString) {
                var theString = passedString.substring(0, 1);
                return new Handlebars.SafeString(theString)
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

            // Para tomar los 0 como null en el if
            Handlebars.registerHelper('isdefined', function(value) {
                return value !== undefined;
            });

            /// CONTADOR DE RESULTADOS DENTRO DE UN EACH  EJ:  {{counter @index}}
            Handlebars.registerHelper("counter", function(index) {
                return index + 1;
            });
            //Crear listas 
            Handlebars.registerHelper("list", function(context, options) {
                var out = "<ul>",
                    data;

                if (options.data) {
                    data = Handlebars.createFrame(options.data);
                }

                for (var i = 0; i < context.length; i++) {
                    if (data) {
                        data.index = i;
                    }

                    out += "<li>" + options.fn(context[i], { data: data }) + "</li>";
                }

                out += "</ul>";
                return out;
            });


            Handlebars.registerHelper("stock", function(value) {
                var ret = 0;

                for (var i = 0, j = value.length; i < j; i++) {
                    ret += parseInt(value[i].quantity);
                }
                // ret = 10;
                return ret;
            });

            Handlebars.registerHelper("first", function(context, options) {
                var ret = "";
                ret = ret + options.fn(context[0]);
                return ret;
            });

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
            //  Logica q suma el stock de el array productos
            Handlebars.registerHelper('stockNO', function(context, options) {
                var ret = "";
                for (var i = 0, j = context.length; i < j; i++) {
                    ret += options.fn(
                        $.extend(
                            context[i], { position: i + 1 }
                        )
                    );
                }
                return ret;
            });


            source = data;
            //   console.log('gettemplate');
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

// ARMA EL TEMPLATE PARA COMPILAR
async function get_module(pacht, controler_data, controler_template, id_copiled, data) { // Ejemplo : body, top_bar, top_bar_template, ##top_nav-bar-copiled
    // ID DE COMPILACION //      
    var id_copiled = $(id_copiled);
    //// VARIABLES de URLS /// 
    var url_now = getUrl();
    var domain = url_now.domain_m_url;
    var domain_pacht = url_now.domain_pacht;
    //// CONTRUCTOR de URLS /// 
    var url_data = '/' + pacht + '/' + controler_data; // Controlador que devuelve el array con la info
    var url_template = '/' + pacht + '/' + controler_template; // Controlador que devuelve el template de la vista
    // console.log('GET MODULO DOMAIN: ' + domain_pacht);
    try {
        await $.ajax({
            url: url_data, //Trae todos los modulos de usuario de la secion
            data: data,
            type: "POST",
            dataType: "json",
            success: function(response) {
                if (response.result == true) { ///// IMPRIME ////     
                    renderHandlebarsTemplate(url_template, id_copiled, response);
                    if (response.msj) {
                        return response, // Devulevo el array resultado                 
                            Snackbar.show({
                                text: response.msj,
                                actionText: 'ok',
                                actionTextColor: "#0575e6",
                            });
                    }
                } else if (response.result == false) {
                    //  renderHandlebarsTemplate(url_template, id_copiled, response);
                    return response, // Devulevo el array resultado    
                        Snackbar.show({
                            text: response.error,
                            actionText: 'ok',
                            actionTextColor: "#0575e6",
                        });
                };
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 0) {
                //alert('Not connect: Verify Network.');
                Snackbar.show({
                    text: 'No hay conexion verifica la conexion a internet!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
                // Si no hay internet tomo los datos del array response y les doy true para que imprima el modulo 
                var response = {
                    // m : $this->Body_model->get_m_id($user_id, $m_id),
                    //  m_t : {},
                    //  m_now : {},
                    Msj: 'Se entrego la data con exito',
                    result: true,
                }
                renderHandlebarsTemplate(url_template, id_copiled, response);

            } else if (jqXHR.status == 404) {

                Snackbar.show({
                    text: 'Error 404 La pagina no existe',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });

            } else if (jqXHR.status == 500) {

                Snackbar.show({
                    text: 'Hay un error 500 en el servidor',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });

            } else if (textStatus === 'parsererror') {

                Snackbar.show({
                    text: 'La respuesta JSON parse fallo!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });

            } else if (textStatus === 'timeout') {

                Snackbar.show({
                    text: 'El tiempo de espera para la conexion fallo!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            } else if (textStatus === 'abort') {

                Snackbar.show({
                    text: 'La conexion fue abortada!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });

            } else {
                Snackbar.show({
                    text: 'Hay un error desconocido!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
                //alert('Uncaught Error: ' + jqXHR.responseText);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

//**NO SE USA TODAVIA */
function get_module_data(controler_data, data) { // Ejemplo : body, top_bar, top_bar_template, ##top_nav-bar-copiled
    $.ajax({
        url: controler_data, //Trae todos los modulos de usuario de la secion
        data: data,
        type: "POST",
        dataType: "json",
        success: function(response) {
            if (response.result == true) { ///// IMPRIME ////     
                // renderHandlebarsTemplate(url_template, id_copiled, response);
                if (response.msj) {
                    return response, // Devulevo el array resultado                 
                        Snackbar.show({
                            text: response.msj,
                            actionText: 'ok',
                            actionTextColor: "#0575e6",
                        });
                }
            } else if (response.result == false) {
                //  renderHandlebarsTemplate(url_template, id_copiled, response);
                return response, // Devulevo el array resultado    
                    Snackbar.show({
                        text: response.error,
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
            };
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {
            //alert('Not connect: Verify Network.');
            Snackbar.show({
                text: 'No hay conexion verifica la conexion a internet!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            // Si no hay internet tomo los datos del array response y les doy true para que imprima el modulo 
            var response = {
                    // m : $this->Body_model->get_m_id($user_id, $m_id),
                    //  m_t : {},
                    //  m_now : {},
                    Msj: 'Se entrego la data con exito',
                    result: true,
                }
                // renderHandlebarsTemplate(url_template, id_copiled, response);

        } else if (jqXHR.status == 404) {

            Snackbar.show({
                text: 'Error 404 La pagina no existe',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });

        } else if (jqXHR.status == 500) {

            Snackbar.show({
                text: 'Hay un error 500 en el servidor',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });

        } else if (textStatus === 'parsererror') {

            Snackbar.show({
                text: 'La respuesta JSON parse fallo!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });

        } else if (textStatus === 'timeout') {

            Snackbar.show({
                text: 'El tiempo de espera para la conexion fallo!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
        } else if (textStatus === 'abort') {

            Snackbar.show({
                text: 'La conexion fue abortada!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });

        } else {
            Snackbar.show({
                text: 'Hay un error desconocido!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            //alert('Uncaught Error: ' + jqXHR.responseText);
        }
    });
};


/*
////-----(MOTOR AJAX) Async-----////
// Trae EL TEMPLATE con ajax PARA COMPILAR 2021 Async
async function getTemplateAjaxAsync(path, callback) {
    var source, template;
    //  await $.ajax({
    try {
        await $.ajax({
            url: path,
            dataType: "html",
            success: function(data) {
                //Helper with
                Handlebars.registerHelper("with", function(context, options) {
                    return options.fn(context);
                });
                // IMPRIME EL PRIMER CARACTER DE UN STRING
                Handlebars.registerHelper('trimString', function(passedString) {
                    var theString = passedString.substring(0, 1);
                    return new Handlebars.SafeString(theString)
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
                // COMPARADOR SI ES MENOR O IGUAL
                Handlebars.registerHelper('ifMe', function(v1, v2, options) {
                    if (v1 <= v2) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                });
                // Para tomar los 0 como null en el if
                Handlebars.registerHelper('isdefined', function(value) {
                    return value !== undefined;
                });
                // COMPARADOR SI ES IGUAL A
                Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                });
                /// CONTADOR DE RESULTADOS DENTRO DE UN EACH  EJ:  {{counter @index}}
                Handlebars.registerHelper("counter", function(index) {
                    return index + 1;
                });
                source = data;
                //   console.log('gettemplate');
                template = Handlebars.compile(source);
                if (callback) callback(template);
            }
        });
    } catch (e) {
        console.log(e);
        throw Error('SOME PROBLEM' + e);
    }
};

// ARMA EL TEMPLATE PARA COMPILAR 2021 Async
async function insert_template(withTemplate, inElement, withData, callback) {
    try {
        await getTemplateAjax(withTemplate, function(template) {
            var targetDiv = (typeof inElement == 'string') ? $(inElement) : inElement;
            // targetDiv.html(template(withData));
            targetDiv.after(template(withData));
        })
    } catch (e) {
        console.log(e);
        throw Error('SOME PROBLEM' + e);
    }
};

//app.insertAdjacentElement("beforebegin", div);
*/