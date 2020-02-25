import { Raycaster } from 'three';

// Picker: 鼠标元素拾取器
// @param scene THREE.Scene
// @param camera THREE.Camera
// @method pick: 选择当前鼠标处的物体
//   @param normalizedPosi Posi: 当前鼠标的标准位置
//   @return obj: 当前鼠标下的物体，如无选中，返回null
export default class Picker {
    constructor(scene, camera) {
        this._raycaster = new Raycaster();
        this._scene = scene;
        this._camera = camera;
    }
    pick(normalizedPosi) {
        this._raycaster.setFromCamera(normalizedPosi, this._camera);

        const intersectedObjects = this._raycaster.intersectObject(
            this._scene,
            true
        );
        if (intersectedObjects.length > 0) {
            return intersectedObjects[0].object;
        }
        return null;
    }
}
