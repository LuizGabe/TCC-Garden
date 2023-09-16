import fs from 'fs/promises';

const privatePath = {
  PrivateKey: './private.key',
};

class Private {
  constructor() {
    this.fileContents = {};
    return this.createProxy(); // Retorna o objeto proxy
  }

  async readFile(filePath) {
    if (!this.fileContents[filePath]) {
      this.fileContents[filePath] = await fs.readFile(filePath, 'utf8');
    }
    return this.fileContents[filePath];
  }

  createProxy() {
    const handler = {
      get: async (target, prop) => {
        if (privatePath[prop]) {
          return this.readFile(privatePath[prop]);
        } else {
          throw new Error(`A propriedade '${prop}' não existe em privatePath`);
        }
      },
    };

    return new Proxy(this, handler);
  }
}

export { Private };
