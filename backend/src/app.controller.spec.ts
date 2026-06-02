import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('saludo', () => {
    it('should return the saludo message', () => {
      expect(appController.getSaludo()).toContain('Hola desde Nest');
    });
  });
});
