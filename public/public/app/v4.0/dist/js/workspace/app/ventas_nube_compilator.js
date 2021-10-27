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

// LOGICA PARA LEER LOS PARAMETROS DE LA URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
