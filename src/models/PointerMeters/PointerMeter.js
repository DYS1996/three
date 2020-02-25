import {
    TextGeometry,
    Mesh,
    MeshBasicMaterial,
    CircleGeometry,
    PlaneGeometry,
    Object3D,
    Color,
    DoubleSide,
} from 'three';
import loadBGI from '../../js/util/loadBGI';
import loadFT from '../../js/util/loadFont';
import FONT2 from '../../fonts/FZHei.json';
import FONT from '../../fonts/djvussmn.json';
import BGI from '../../images/pointermeterBG.png';

// PointerMeter: 指针电表
// @param val number: 示数，范围在0~100以内
// @param uni string: 单位，长度须在9个字符之内
// @param title string: 表盘名称，显示在表盘上方，小于6个字符
// @method update: 更新电表示数，无法改变单位
//   @param val number: 新示数
export default class PointerMeter extends Object3D {
    constructor(val, uni, title) {
        super();
        val = Math.round(val);
        if (val < 0 || val > 100) throw 'val should range 0 to 100';
        if (uni.length > 9)
            throw "length of 'unit' should be no greater than 4";
        if (title.length > 6)
            throw 'length of title of meters cannot be larger than 6';
        this.name = 'pointermeter';

        this._val = val;
        this._unit = uni;
        this._title = title;
        // this._title = '指针气压表';
        const ft = loadFT(FONT);
        this._ft = ft;
        const ft2 = loadFT(FONT2);
        this._ft2 = ft2;
        const bgi = loadBGI(BGI);
        this._img = bgi;
        this._render();
    }
    //渲染电表
    _render() {
        const frac = this._val / 100;
        const panel = new Mesh(
            new CircleGeometry(3, 128),
            new MeshBasicMaterial({
                side: DoubleSide,
                map: this._img,
                transparent: true,
            })
        );

        let color;
        if (this._val < 20) {
            color = new Color(0x91c7ae);
        } else if (this._val < 80) {
            color = new Color(0x63869e);
        } else {
            color = new Color(0xc23531);
        }
        const pointer = new Mesh(
            new PlaneGeometry(0.1, 2.6),
            new MeshBasicMaterial({ color })
        );
        this._pointer = pointer;
        pointer.position.set(0, 0, 0.01);
        setPosition(
            pointer,
            1.3,
            (5 * Math.PI) / 4 - ((3 * Math.PI) / 2) * frac
        );
        panel.add(pointer);
        this.add(panel);

        const title = new Mesh(
            new TextGeometry(this._title, {
                font: this._ft2,
                size: 0.5,
                height: 0.01,
            }),
            new MeshBasicMaterial({ color: new Color('black') })
        );
        panel.add(title);
        title.position.set(0, 3.65, 0.01);
        title.geometry.center();

        const unit = new Mesh(
            new TextGeometry(this._unit, {
                font: this._ft,
                size: 0.3,
                height: 0.01,
            }),
            new MeshBasicMaterial({ color: new Color('white') })
        );
        panel.add(unit);
        unit.position.set(0, 0.75, 0.01);
        unit.geometry.center();
        const dig = new Mesh(
            new TextGeometry(this._val.toString(), {
                font: this._ft,
                size: 0.5,
                height: 0.01,
            }),
            new MeshBasicMaterial({ color: new Color('white') })
        );
        this._dig = dig;

        panel.add(dig);
        dig.position.set(0, -1.35, 0.01);
        dig.geometry.center();
    }

    // 更新电表指针示数
    update(val) {
        val = Math.round(val);
        if (val < 0 || val > 100) throw 'val should range 0 to 100';
        this._val = val;
        const frac = this._val / 100;
        let color;
        if (this._val < 20) {
            color = new Color(0x91c7ae);
        } else if (this._val < 80) {
            color = new Color(0x63869e);
        } else {
            color = new Color(0xc23531);
        }
        setPosition(
            this._pointer,
            1.3,
            (5 * Math.PI) / 4 - ((3 * Math.PI) / 2) * frac
        );
        this._pointer.material.color = color;
        this._dig.geometry = new TextGeometry(this._val.toString(), {
            font: this._ft,
            size: 0.5,
            height: 0.01,
        });
        this._dig.position.set(0, -1.35, 0.01);
        this._dig.geometry.center();
    }
}

// changeCorrd: 从极座标系改变到平面直角座标系
function changeCorrd(r, theta) {
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

// setPosition: 将物体移动到极座标系中的r, theta处
function setPosition(object, r, theta) {
    const [x, y] = changeCorrd(r, theta);
    object.position.set(x, y, 0.01);
    object.rotation.z = theta - Math.PI / 2;
}
