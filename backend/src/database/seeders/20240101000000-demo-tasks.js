'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Documentación completa del proyecto',
        description: 'Escribir documentación completa para la aplicación Todo, incluyendo documentación de API y guía del usuario',
        completed: false,
        tags: ['documentación', 'alta-prioridad'],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Implementar pruebas unitarias',
        description: 'Agregar pruebas unitarias para el frontend y el backend con al menos un 50% de cobertura',
        completed: false,
        tags: ['pruebas', 'desarrollo'],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Configurar pipeline de CI/CD',
        description: 'Configurar GitHub Actions para pruebas automatizadas y despliegue',
        completed: false,
        tags: ['devops', 'automatización'],
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Revisar arquitectura del código',
        description: 'Asegurarse de que el código siga las mejores prácticas y esté debidamente organizado',
        completed: true,
        tags: ['revisión', 'arquitectura'],
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
        updatedAt: new Date(),
      },
      {
        title: 'Agregar autenticación de usuario',
        description: 'Implementar autenticación basada en JWT para soporte de múltiples usuarios',
        completed: false,
        tags: ['funcionalidad', 'seguridad'],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};