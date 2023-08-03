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