import 'core-js/stable';
import 'regenerator-runtime/runtime';
import World from './World';
import Factory from './models/Factory/Factory';

const world = new World('#c');

const fcty = new Factory();
(async () => {
    await fcty.init();
    world.add(fcty);
    fcty.position.set(0, 0, 0);
})();

// export { World };
