# DESAFIO ENTREGABLE N° 1

#### CONSIGNA
Realizar una clase ProductManager" que gestione un conjunto de productos.

#### ASPECTOS A INCLUIR
**CLASES**
- La clase **ProductManager** debera generarse su constructor con el elemento **Products**, el cual será un arreglo vacío.

| Key | Value |
| ------ | ------ |
| _products_ | array de los productos agregados |
| _idAutoIncremental_ | ultimo id generado |

- La clase **Product** debera contar con las siguientes keys:

| Key | Value |
| ------ | ------ |
| _title_ | nombre del producto |
| _description_ | descripcion dle producto |
| _price_ | precio del producto |
| _thumbnail_ | ruta de imagen |
| _id_ | codigo identificador |
| _stock_ | numero de piezas disponibles |

**METODOS**
- El metodo **addProduct** se encargara de agregar productos al array de productos del "ProductManager".
Este debera validar que no se repita la key _id_ y las demas key deberan ser obligatorias
Se agregara el producto con un id autoincrementable.
- El metodo **getProducts** se encargara de devolver el arreglo con todos los productos creados hasta el momento guardados en el **ProductManager**.
- El metodo **getProductById** se encargara de buscar el id proporcionado y devolvera el producto con el mismo id buscado, en caso contrario devolvera _"Not Found"_ por consola.

#### FUNCIONAMIENTO
Ejecutar por consola el comando. El cual se mostrara por la misma cada uno de los funcionamientos mencionados.
```sh
node DesafioEntregableUno\Pruebas.js
```
La distribucion de los archivos son la siguiente:

| Nombre | Descripcion |
| ------ | ------ |
| _Product.js_ | clase product |
| _ProductManager.js_ | clase productManager con sus metodos |
| _ProductList.js_ | array generado de prueba para agregar al productManager |
| _Pruebas.js_ | aqui se encuentran las pruebas al ejecutar por consola con el comando anterior |

Se trato de realizar una vista amigable al ojo cuando los datos de cada prueba se muestran por consola.

# DESAFIO ENTREGABLE N° 2

#### CONSIGNA
Continuando con el desafio anterior. Se ampliaron las funciones del Product Manager con funciones modificadas y nuevas.

**METODOS MODIFICADOS**
- El metodo **addProduct** ahora genera y lee un archivo JSON en el cual guardara los productos que se agreguen al array de productos del "ProductManager".
- El metodo **getProducts** ahora lee el archivo JSON generado por el **addProduct** y los devuelve .
- El metodo **getProductById** ahora lee el archivo JSON haciendo uso de **getProducts**, en caso contrario devolvera _"Not Found"_ por consola.

**METODOS NUEVOS**
- El metodo **updateProduct** se encarga de modificar el valor de la key buscada en el producto segun la ID. Este metodo hace uso de **getProducts** y **getProductById**.
- El metodo **deleteProduct** se encarga de borrar el producto indicado por ID. Este metodo hace uso de **getProducts**.

#### LECTURA DE ARCHIVOS
Se generaron dos funciones nuevas:

- La funcion **escribirEnArchivo** se encargara de generar un archivo al path indicado con los productos agregados. Y de leer el archivo si exte existe en el path indicado.
- La funcion **leerDeArchivo** se encargara de leer el archivo en el path indicado.

#### FUNCIONAMIENTO
Idem al desafio anterior.

Se agregaron nuevos archivos y son la siguiente:

| Nombre | Descripcion |
| ------ | ------ |
| _FileSystem.js_ | Contiene funciones de lectura de archivos |
| _Main.js_ | Se encuentran todos los test de las funciones a ejecutar |

# DESAFIO ENTREGABLE N° 3

#### CONSIGNA
Continuando con el desafio anterior. Ahora se despliega un servidor con Express. Por donde se van a estar usando las distintas funciones anteriormente elavoradas.

**CARPETAS**
Se reestructuro la carpeta de **DesafioEntregableTres**. Esta posee 2 subcarpetas principales con el siguiente contenido:

| Carpeta | Descripcion |
| ------ | ------ |
| _src_ | Contiene otra subcarpeta llamada _Clases_. Y tambien otros archivos JS para el funcionamiento del programa. |
| _Test_ | Contiene archivos para testear el programa. |
| _src/Clases_ | Contiene archivos de las clases _Product_ y _ProductManager_. |

**ARCHIVOS NUEVOS**
Dentro de la carpeta **src** se encuentran los siguientes archivos:

| Archivo | Descripcion |
| ------ | ------ |
| src/_App.js_ | Archivo principal por donde se ejecuta el programa. |
| src/_ListaDeProductosEnServidor.json_ | Contiene el array de productos a utilizar en el servidor. |
| src/_ServerConfig.js_ | Contiene la configuracion base para el servidor en Express. |
| Test/_Test.js_ | Contiene funciones armadas en los desafios anteriores para probarlas. |

#### FUNCIONAMIENTO
Instalar las dependencias necesarias para su correcto funcionamiento ejecutando el comando.
```sh
npm install
```
Ejecutar por consola el comando. 
```sh
npm run dev
```
Hara que se ejecute el archivo _App.js_ como esta configurado en el _package.json_ en los **sripts** - **dev**
Esperar unos instantes hasta que **nodemon** comience a funcionar. Cuando finalice aparecera por consola el siguiente mensaje:
```sh
[SERVIDOR EN PUERTO 4000]
[INGRESE A http://localhost:4000/ PARA CONTINUAR]
```
Luego dirigirse al localhost, configurado en el puerto 4000. Como figurara mostrado por la consola.
```sh
http://localhost:4000/
```
Alli se mostraran mas instrucciones de uso del programa. En el cual podra acceder a cada una de ellas con el instructivo que figura alli.

Para terminar con el programa dirigirse a la consola. Apretar Ctrl+C, donde se consultara para terminar el trabajo por lotes. Ingresar [S] para finalizar o [N] para continuar con el funcionamiento.