module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          title: 'Game God of War Hits - PS4',
          description:
            'God of War é uma série de jogos eletrônicos de ação-aventura vagamente baseado nas mitologias grega e nórdica sendo criado originalmente por David Jaffe da Santa Monica Studio. Iniciada em 2005, a série tornou-se carro-chefe para a marca PlayStation, que consiste em oito jogos em várias plataformas. A história centra-se em torno de seu personagem, Kratos, um guerreiro espartano enganado para matar sua esposa e filha por seu antigo mestre, o deus da guerra Ares.',
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 360.95,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Game Mortal Kombat 11 Br - PS4',
          description:
            'Mortal Kombat 11 é um jogo eletrônico de luta desenvolvido pela NetherRealm Studios e publicado pela Warner Bros. Interactive Entertainment. É a décima primeira edição principal da série de jogos eletrônicos de luta, Mortal Kombat, e uma continuação direta de Mortal Kombat X (2015). Um trailer de anúncio do jogo foi lançado durante o The Game Awards 2018. O jogo foi lançado em 23 de abril de 2019, para Microsoft Windows, Nintendo Switch, PlayStation 4 e Xbox One.',
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 240.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Jogo PS4 - Crash Bandicoot - N'Sane Trilogy - Activision",
          description:
            'Crash Bandicoot é uma série de jogos criada por Andy Gavin e Jason Rubin que são inclusive os fundadores da Naughty Dog. A série consiste basicamente nas aventuras do bandicoot geneticamente alterado Crash, que luta para impedir o planos do cientista do mal Neo Córtex e seus lacaios. A história do jogo se passa nas fictícias Ilhas Wumpa, um arquipélago situado na costa noroeste da Austrália, mas outros lugares são revelados. A série começou em 1996 e no momento, a franquia contém um total de 18 jogos diferentes e já vendeu cerca de 56 milhões e meio de cópias no mundo, se tornando uma das séries de jogos eletrônicos mais vendidas de sempre.',
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 154.4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Game Uncharted 4 A Thief's End Hits - PS4",
          description:
            "Uncharted 4: A Thief's End é um jogo eletrônico de ação-aventura desenvolvido pela Naughty Dog e publicado pela Sony Computer Entertainment. É o quarto título principal da série Uncharted e foi lançado exclusivamente para PlayStation 4 em 10 de maio de 2016. Na história, os jogadores controlam Nathan Drake, um ex-caçador de tesouros que é persuadido a sair da aposentadoria pelo aparecimento de seu irmão mais velho Samuel. Junto com seu antigo parceiro Victor Sullivan, eles procuram por pistas para a localização do tesouro perdido do pirata Henry Avery. ",
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 110.95,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Game Forza Horizon 4',
          description:
            'Forza Horizon 4 é um jogo de corrida em mundo aberto desenvolvido pela Playground Games em colaboração com a Turn 10 e publicado pela Xbox Game Studios[1], que na época do lançamento ainda era conhecida como Microsoft Studios. É o quarto da franquia Forza Horizon e o décimo primeiro da edição Forza.',
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 260.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Game - Halo 5: Guardians',
          description:
            'Halo 5: Guardians é um videojogo de tiro na primeira pessoa (first-person shooter), parte da franquia Halo e sequência de Halo 4 (2012). Revelado oficialmente a 16 de Maio de 2014, Halo 5: Guardians foi produzido pela 343 Industries e publicado pela Xbox Game Studios a 27 de Outubro de 2015 Exclusivamente para Xbox One.',
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 99.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Game Call Of Duty: Black Ops 4 - XBOX ONE',
          description:
            'Black Ops 4 conta com um modo de jogo battle royale chamado Blackout, que servirá como um substituto para o modo campanha. Enquanto utiliza o tradicional estilo de combate da série Black Ops, o modo inclui o maior mapa apresentado em um título de Call of Duty. Os jogadores competem uns contra os outros através de locais que apareceram em jogos anteriores do Black Ops.',
          labels: 'Jogo,Acão,Corrida,Exclusivo',
          plataform: 'PS4',
          available: true,
          price: 85.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
