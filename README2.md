# Actividad

Completad las funciones siguiendo las instrucciones del comentario en el pichero `actividad.js`. No deberíais tener que
modificar el código en `ImageHandler.js` en ningun caso.

Por favor, no cambiéis las líneas que ya estan escritas: En cada función ya viene declarado el outputPath y
en la variable pixels tenéis la imagen ya cargada en formato matriz de valores RGB. Al mismo tiempo, al final de cada
función ya se encuentra el savePixels para guardar la imagen en el outputPath.

## Instalación

Primero de todo tenéis que seguir los pasos en:

https://www.npmjs.com/get-npm

Una vez tengáis `NPM` instalado, en la terminal de Webstorm tenéis que escribir las siguientes líneas una por una tal
como hicimos en la 3ª clase:

```
npm install fs
npm install save-pixels
npm install get-pixels
npm install deasync
npm install ndarray
```

Si tenéis cualquier duda o problema comentadlo cuanto antes en el foro. Sobretodo no lo dejéis para el último día ya que si esto
no os funciona no podréis ejecutar vuestro código.

## Uso

Simplemente se crea un objeto ImageHandler con el path a la imagen y, usando la función `getPixels()`, se consigue
la información de la imagen en formato RGB.

Para guardar una imagen simplemente llamamos a la función `savePixels(pixelsToSave, newPath)`. Esta función también
acepta un nuevo ancho/alto de imagen en caso de que la imagen que queremos guardar no tenga los mismos valores que
la original.

Si descomentáis al final del documento la función que queráis probar os debería aparecer en la carpeta `output` la imagen resultante de los cambios que hayáis programado.

```
No las descomentéis todas a la vez, tardará mucho
en procesar y además puede que JavaScript se quede
sin memoria y falle.
```

## RGB

La función `getPixels()` devuelve una matriz de pixeles RGB.

Una matriz no es más que un array con arrays en sus posiciones para representar los pixeles en la pantalla. A su vez
cada pixel es un array con 3 posiciones, una para cada valor RGB.

Por ejemplo si tenemos una imagen 2x2 con 4 píxeles tal que:

| Rojo | Verde  |
| ---- | ------ |
| Azul | Blanco |

Esto corresponderá a la siguiente matriz:

[<br>
&nbsp;&nbsp;&nbsp;&nbsp; [ [255, 0, 0], [0, 255, 0] ],<br>
&nbsp;&nbsp;&nbsp;&nbsp; [ [0, 0, 255], [255, 255, 255] ]<br>
]

Como podéis ver tenemos un array con 2 filas.

En cada una de las filas tenemos 2 columnas.

Finalmente, en cada fila y columna tenemos un array con los 3 valores RGB del pixel.
