const fs = require('fs');
const savePixels = require('save-pixels');
const getPixels = require('get-pixels');
const deasync = require('deasync');
const ndarray = require('ndarray');

class ImageHandler {
  /**
   * ImageHandler tiene 3 atributos internos.
   *
   * path: Path de la imagen cuyos pixeles se quieren leer.
   * pixels: Array de arrays (Matriz) que representa cada uno de los pixeles de la imagen. Inicialmente vacío.
   * shape: Array con las dimensiones de la imagen (ancho, alto, profundidad (0)). Inicialmente [0,0,0]
   * @param {*} path Path de la imagen a leer.
   * EDITADO
   */
  constructor(path) {
    this.path = path;
    this.pixels = [];
    this.shape = [0, 0, 0];
    this._readImage();
  }

  /**
   * getPixels
   * @returns Array de pixeles de la imagen
   */
  getPixels() {
    return this.pixels;
  }

  /**
   * getShape
   * @returns Array de dimensiones de la imagen
   */
  getShape() {
    return this.shape;
  }

  /**
   * Dado un array de pixels, guarda dichos pixeles en la imagen gestionada por el handler.
   * @param {*} pixels - Array de pixeles a guardar en la imagen.
   * @param {*} path - Path de la imagen destino.
   * @param {*} width - Opcional: Ancho de la imagen. Si no se usa, se usara el ancho actual.
   * @param {*} height - Opcional: Altura de la imagen. Si no se usa, se usara la altura actual.
   *
   * Se recomienda hacer uso de las siguientes librerias:
   *  - fs
   *  - save-pixels
   *
   */

  savePixels(pixels, path) {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(path);
      savePixels(pixels, 'jpg', { quality: 100 })
        .pipe(writeStream)
        .on('finish', () => {
          console.log(`Image processed and saved in ${path} successfully.`);
          resolve();
        })
        .on('error', (error) => {
          console.error(`Error while writing the image: ${error.message}`);
          reject(error);
        });
    });
  }
  savePixels2(
    pixels,
    outputPath,
    width = this.shape[0],
    height = this.shape[1]
  ) {
    const pixelData = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const [r, g, b] = pixels[i][j];
        const index = (i * width + j) * 4;
        pixelData[index] = r;
        pixelData[index + 1] = g;
        pixelData[index + 2] = b;
        pixelData[index + 3] = 255; // Alpha channel
      }
    }

    const pixelArray = ndarray(pixelData, [width, height, 4]);
    const writeStream = fs.createWriteStream(outputPath);
    savePixels(pixelArray, 'jpg').pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log(`Image processed and saved in ${outputPath} successfully.`);
        resolve();
      });

      writeStream.on('error', (error) => {
        console.error(`Error while writing the image: ${error.message}`);
        reject(error);
      });
    });
  }
  /**
   * _readImage
   * Lee la imagen gestionada por el handler.
   * Se encarga de dar valor al array de pixeles 'pixels' asociado a la imagen.
   * Se encarga de dar valor al array de dimensiones 'shape' asociado a la imagen.
   *
   * Se recomienda hacer uso de funciones auxiliares.
   * Se recomienda hacer uso de las siguientes librerias:
   *  - get-pixels
   *  - deasync
   *  - ndarray
   *
   */
  _readImage() {
    let imageData = null;
    getPixels(this.path, (err, pixels) => {
      if (err) {
        console.error('Error while loading the image:', err.message);
        return;
      }
      imageData = pixels;
      this.pixels = imageData;
      this.shape = imageData.shape;
    });
    deasync.loopWhile(() => imageData === null);
  }
}

module.exports = ImageHandler;
