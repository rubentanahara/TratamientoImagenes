const ImageHandler = require('./ImageHandler.js');
const ndarray = require('ndarray');

let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);

/**
 * Ejemplo de construcción de una imagen.
 */
function ejemplo() {
  let outputPath = 'output/ejemplo.jpg';
  let pixels = [];
  let filas = 400;
  let columnas = 400;
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    for (let j = 0; j < columnas; j++) {
      let pixel = [0, 0, 0];
      if ((i + j) % 2 === 0) {
        pixel = [255, 0, 0];
      }
      nuevaFila.push(pixel);
    }
    pixels.push(nuevaFila);
  }

  handler.savePixels2(pixels, outputPath, columnas, filas);
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
  let outputPath = 'output/tucan_red.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 1, 0);
      pixels.set(i, j, 2, 0);
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
function convertToGreenPixels() {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 0, 0);
      pixels.set(i, j, 2, 0);
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
function convertToBluePixels() {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 0, 0);
      pixels.set(i, j, 1, 0);
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
function convertToGreyPixels() {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      const red = pixels.get(i, j, 0);
      const green = pixels.get(i, j, 1);
      const blue = pixels.get(i, j, 2);

      const average = Math.floor((red + green + blue) / 3);
      pixels.set(i, j, 0, average);
      pixels.set(i, j, 1, average);
      pixels.set(i, j, 2, average);
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transformar el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
function convertToBlackAndWhitePixels(threshold = 50) {
  let outputPath = 'output/tucan_black_white.jpg';
  let pixels = handler.getPixels();
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      const average =
        (pixels.get(i, j, 0) + pixels.get(i, j, 1) + pixels.get(i, j, 2)) / 3;

      const newValue = average < threshold ? 0 : 255;
      pixels.set(i, j, 2, newValue);
      pixels.set(i, j, 1, newValue);
      pixels.set(i, j, 0, newValue);
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 */
function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();
  const scaledWidth = Math.floor(pixels.shape[0] / 2);
  const scaledHeight = Math.floor(pixels.shape[1] / 2);
  const scaledPixels = ndarray([], [scaledWidth, scaledHeight, 3]);

  for (let i = 0; i < scaledWidth; i++) {
    for (let j = 0; j < scaledHeight; j++) {
      for (let k = 0; k < 3; k++) {
        const p1 = pixels.get(i * 2, j * 2, k);
        const p2 = pixels.get(i * 2 + 1, j * 2, k);
        const p3 = pixels.get(i * 2, j * 2 + 1, k);
        const p4 = pixels.get(i * 2 + 1, j * 2 + 1, k);
        const average = Math.floor((p1 + p2 + p3 + p4) / 4);
        scaledPixels.set(i, j, k, average);
      }
    }
  }

  handler.savePixels(scaledPixels, outputPath);
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro que recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimfactor) {
  let outputPath = 'output/tucan_dimmed.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      for (let k = 0; k < 3; k++) {
        pixels.set(i, j, k, Math.floor(pixels.get(i, j, k) * dimfactor));
      }
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50], su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
function invertColors() {
  let outputPath = 'output/tucan_invert.jpg';
  let pixels = handler.getPixels();
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      for (let k = 0; k < 3; k++) {
        pixels.set(i, j, k, 255 - pixels.get(i, j, k));
      }
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 *
 * Una forma de conseguirlo es recorrer los pixeles de ambas imagenes y construir una nueva imagen donde
 * cada pixel sera el resultado de multiplicar los canales rgb de la primera imagen por el factor 1 y los
 * canales rgb de la segunda imagen por el factor 2.
 * @param alphaFirst Parametro a aplicar sobre la primera imagen
 * @param alphaSecond Parametro a aplicar sobre la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  let pixels = ndarray([], [catPixels.shape[0], catPixels.shape[1], 3]);

  for (let i = 0; i < catPixels.shape[0]; i++) {
    for (let j = 0; j < catPixels.shape[1]; j++) {
      for (let k = 0; k < 3; k++) {
        const catValue = catPixels.get(i, j, k);
        const dogValue = dogPixels.get(i, j, k);
        const blendedValue = alphaFirst * catValue + alphaSecond * dogValue;
        const finalValue = Math.min(255, Math.max(0, Math.floor(blendedValue)));
        pixels.set(i, j, k, finalValue);
      }
    }
  }
  handler.savePixels(pixels, outputPath);
}

/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ aparecerán los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
const option = process.argv[2];
//let option = 1;
switch (option.toString()) {
  case '1':
    redConverter();
    break;
  case '2':
    convertToGreenPixels();
    break;
  case '3':
    convertToBluePixels();
    break;
  case '4':
    convertToGreyPixels();
    break;
  case '5':
    convertToBlackAndWhitePixels();
    break;
  case '6':
    scaleDown();
    break;
  case '7':
    dimBrightness(0.5);
    break;
  case '8':
    invertColors();
    break;
  case '9':
    merge(0.5, 0.5);
    break;
  default:
    ejemplo();
}
