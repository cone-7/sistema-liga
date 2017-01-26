(function () {
  'use strict';

  angular
    .module('players')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Jugadores',
    //   state: 'players',
    //   resolve: {
    //     playersResolve: null
    //   },
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // menuService.addSubMenuItem('topbar', 'players', {
    //   title: 'Registrar',
    //   state: 'players.history',
    //   roles: ['*']
    // });

    // menuService.addSubMenuItem('topbar', 'players', {
    //   title: 'Generar Credencial',
    //   state: 'players.directiva',
    //   roles: ['*']
    // });

  }
}());
