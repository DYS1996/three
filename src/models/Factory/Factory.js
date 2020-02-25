import { Object3D } from 'three';
import FACTORY from './Small.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Factory: 工厂模型
export default class Factory extends Object3D {
    constructor() {
        super();
    }
    async init() {
        const fact = await new Promise(resolve => {
            new GLTFLoader().load(FACTORY, resolve);
        });
        fact.scene.position.set(0, 0, 0);
        fact.scene.scale.set(80, 80, 80);
        this.add(fact.scene);
    }
}
