"# vnapp"

Instalacion:

INSTALAR DOCKER: Version 4.4.2.

Clonar el repo de vnapp
<pre>
'sudo git clone https://github.com/VentasNube/vnapp.git'
</pre>

Correr la instalacion de dependencias de las librerias
cambiar en composer.json 
<pre>
Cambiar el composer.json
"prefer-stable": true,
 "require": {
        "php": ">=7.2",
        "codeigniter4/framework": "^4",
        "myth/auth": "dev-develop"
    },
</pre>

Composer update dentro del directorio que clonamos ventasnube.composer

Va a instalar todas las dependencias necesarias para el proyecto desde el compose.json
Actualizar e instalar todas las dependencias de Ci4 que se necesitan con este commando (No es necesario hacer una instalacion nueva)
composer update codeigniter4/appstarter

Install myth-auth composer require myth/auth
<pre>
> composer require myth/auth
</pre>


CREAR BASE DE DATOS con migracion de codeigniter de esta manera se guardan los cambios que vamos haciendo en la Base de datos.

Instalar la base de datos una vez configurada la conexion en config/Database
Correr el comando para crear la estructura de la base de datos.

php spark migrate -all
