# Aplicación de Procesamiento de Imágenes

Esta es una aplicación de Node.js para el procesamiento de imágenes utilizando la clase `ImageHandler`. La aplicación ofrece varias funciones de transformación de imágenes y permite a los usuarios elegir una transformación específica proporcionando una opción como argumento en la línea de comandos.

## Requisitos

Para ejecutar esta aplicación, debes tener instaladas las siguientes dependencias:

- Node.js (versión 12 o superior)
- npm (Node Package Manager)

## Instalación

1. Clona o descarga el repositorio en tu máquina local.
2. Navega al directorio del proyecto utilizando la terminal o el símbolo del sistema.
3. Instala las dependencias requeridas con npm:

```bash
npm install
```

## Uso

Para usar la aplicación de procesamiento de imágenes, ejecuta el script con la opción de transformación deseada como argumento en la línea de comandos. Las opciones disponibles son las siguientes:

1. Convertir a Rojo: `node actividad.js 1`
   Convierte la imagen a tonos rojos, estableciendo los canales verde y azul en 0.

2. Convertir a Píxeles Verdes: `node actividad.js 2`
   Convierte la imagen a tonos verdes, estableciendo los canales rojo y azul en 0.
3. Convertir a Píxeles Azules: `node actividad.js 3`
   Convierte la imagen a tonos azules, estableciendo los canales rojo y verde en 0.

4. Convertir a Píxeles Grises: `node actividad.js 4`
   Convierte la imagen a escala de grises.

5. Convertir a Píxeles en Blanco y Negro: `node actividad.js 5`
   Convierte la imagen a blanco y negro en función de un valor umbral (umbral predeterminado es 50).

6. Escalar hacia Abajo: `node actividad.js 6`
   Escala la imagen a la mitad de su tamaño original utilizando interpolación bilineal.

7. Disminuir Brillo: `node actividad.js 7`
   Reduce el brillo de la imagen en un factor de 0.5.

8. Invertir Colores: `node actividad.js 8`
   Invierte los colores de la imagen.

9. Combinar: `node actividad.js 9`
   Combina dos imágenes (`input/cat.jpg` e `input/dog.jpg`) con mezcla alfa ajustable.

## Notas Adicionales

- La clase `ImageHandler` se utiliza para manejar la carga y guardado de imágenes. La clase proporciona métodos para obtener los píxeles de la imagen y su forma, así como para guardar los píxeles en un archivo.
- Las imágenes se guardan en formato JPG con una calidad de 100 para mantener la máxima calidad posible. Puedes ajustar el parámetro de calidad en el método `savePixels` para diferentes niveles de compresión (valores de calidad más bajos para mayor compresión y tamaños de archivo más pequeños).
- Las imágenes utilizadas para la combinación (gato y perro) deben estar ubicadas en el directorio `input`.
- En actividad.js es posible correr el programa sin argumentos pero se debe descomentar la linea 256 que dice `let option = 1;` y comentar la linea anterior (255)
