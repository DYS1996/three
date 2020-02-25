import { Color } from 'three';
import ChangeColor from './ChangeColor';

// Highlighter: 将鼠标指针选定的物体高亮（改变颜色）
// @method highlight: 将指定位置（鼠标悬停位置）的物体高亮
//   @param obj THREE.Object3D: threejs object, 如无，则直接返回
export default class Highlighter {
    constructor() {
        this._oldobj = null;
        this._oldcol = null;
    }

    highlight(obj) {
        if (this._oldobj) {
            ChangeColor(this._oldobj, this._oldcol);
            this._oldobj = null;
            this._oldcol = null;
        }
        if (obj) {
            this._oldobj = obj;
            this._oldcol = ChangeColor(obj, new Color(0xffff00));
        }
    }
}
