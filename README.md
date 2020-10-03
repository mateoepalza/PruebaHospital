# pruebaHospital

La carpeta server contiene todo lo relacionado con backend en NODEjs 

* En esta carpeta verán una carpeta src que obtiene todo el código usado para la realización de los servicios
* Me tomé la libertad de unar Typescript tanto para el backend como el frontend por lo que verán todos los 
  archivos en la carpeta src con extensión .ts 
* usé dos scripts principalmente para el desarrollo del proyecto:
    * "build": "tsc -w" => Que me "traduce" los archivos .ts a .js los cuales los podrán observar en la carpeta build
    * "dev": "nodemon build/index.js" => me permite guardar los cambios y reiniciar els ervidor automaticamente
* Usé bcryptjs para encriptar las contraseñas
* Usé class-validator para validar las entradas
* Usé cors para permitir peticiones de otros servidores a donde se ejecute el proyecto
* Usé dotenv para establecer y usar como modulo unas variables globales, establecí las siguientes variables
    * PORT => puerto
    * ORIGIN => la url de donde se pueden recibir peticiones
    * SECRET => Es la clave que uso para el jsonwebtoken
* Usé jsonwebtoken para realizar el logueo en la aplicación
* Usé express para realizar un manejo de rutas y controladores de una manera más sencilla
* Use morgan para tener un poco de información acerca de las peticiones que se realizan por consola

La carpeta client tiene todo lo relacioando con el frontend en Angular

* En esta carpeta verán una carpeta src que contiene todo el codigo fuente
* Me tome la libertad de usar angular material para el desarrollo de las vistas y demás
* La aplicación la intenté dividir en diferentes modulos y componentes que se encuentran principalmente en la carpeta app