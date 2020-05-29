"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'payment_status',
      [
        {
          status: 'Aguardando Pagamento',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: 'Pagamento Rejeitado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: 'Pagamento com Sucesso',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: 'Aguardando Retirada',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: 'Em Transito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: 'Entregue',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('payment_status', null, {});
  },
};
