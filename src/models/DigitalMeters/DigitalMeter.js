import {
    Color,
    MeshBasicMaterial,
    Object3D,
    DoubleSide,
    TextGeometry,
    Mesh,
    PlaneGeometry,
} from 'three';
import loadBGI from '../../js/util/loadBGI';
import loadFT from '../../js/util/loadFont';
import FONT from '../../fonts/digit.json';
import BGI from '../../images/digitalmeterBG.png';
import FONT2 from '../../fonts/FZHei.json';

// DigitalMeter: 数字电表
// @param number number: 示数，必须为正数，且会被转化为3位有效数字的科学计数法表示
// @param uni string: 单位，长度须在9个字符之内
// @param title string: 表盘名称，显示在表盘上方，小于14个字符
// @method update: 更新电表示数，无法改变单位
//   @param num number: 新示数
export default class DigitalMeter extends Object3D {
    constructor(number, uni, title) {
        super();
        if (number < 0) throw 'number should be no less than 0';
        if (uni.length > 9) throw 'length of unit should be no large than 5';
        if (title.length > 14)
            throw 'length of title of meters cannot be larger than 14';

        this._wid = 4.7;
        this.name = 'digitalmeter';
        // offset用来调整数字示数的位置
        this._offset = [-0.44, -0.31, -0.25, -0.1, 0.05, 0.18, 0.3];
        // this._title = '数字气压表';
        this._title = title;

        this._displays = [];
        this._unit = uni;
        this._num = number;
        const img = loadBGI(BGI);
        const ft = loadFT(FONT);
        this._img = img;
        this._ft = ft;
        const ft2 = loadFT(FONT2);
        this._ft2 = ft2;
        this._render();
    }

    // 渲染电表
    _render() {
        const val = this._num.toExponential(2);

        const digits = val.toString().split('');

        const plane = new Mesh(
            new PlaneGeometry(this._wid, 1.5),
            new MeshBasicMaterial({ map: this._img })
        );
        for (let i = 0; i < digits.length; i++) {
            let ofs;
            if (digits[i] === '1') {
                ofs = (this._offset[i] + 0.08) * this._wid;
            } else {
                ofs = this._offset[i] * this._wid;
            }
            digits[i] = new Mesh(
                new TextGeometry(digits[i], {
                    font: this._ft,
                    size: 1,
                    height: 0.05,
                }),
                new MeshBasicMaterial({ color: new Color(0x0f1417) })
            );
            this._displays = [...this._displays, digits[i]];
            this._displays[i].position.set(ofs, -0.4, 0.01);

            plane.add(this._displays[i]);
        }
        const label = new Mesh(
            new PlaneGeometry(0.12, 0.12),
            new MeshBasicMaterial({ color: new Color(0x0f1417) })
        );
        plane.add(label);
        label.position.set(0.08 * this._wid, -0.55, 0.01);
        plane.material.side = DoubleSide;

        const title = new Mesh(
            new TextGeometry(this._title, {
                font: this._ft2,
                size: 0.3,
                height: 0.01,
            }),
            new MeshBasicMaterial({ color: new Color('black') })
        );
        plane.add(title);
        title.position.set(0, 1.1, 0.01);
        title.geometry.center();

        const unit = new Mesh(
            new TextGeometry(this._unit, {
                font: this._ft,
                size: 0.12,
                height: 0.01,
            }),
            new MeshBasicMaterial({ color: new Color(0x0f1417) })
        );
        plane.add(unit);
        unit.position.set(0.1 * this._wid, -0.6, 0.01);
        this.add(plane);
    }

    // 更新电表示数
    update(num) {
        if (num < 0) throw 'number should be no less than 0';
        this._num = num;
        const val = num.toExponential(2);

        const digits = val.toString().split('');

        for (let i = 0; i < this._displays.length; i++) {
            if (digits[i] === this._displays[i].geometry.parameters.text) {
                // console.log('triggered')
                continue;
            }
            this._displays[i].geometry = new TextGeometry(digits[i], {
                font: this._ft,
                size: 1,
                height: 0.05,
            });
            let ofs;
            if (digits[i] === '1') {
                ofs = (this._offset[i] + 0.08) * this._wid;
            } else {
                ofs = this._offset[i] * this._wid;
            }
            this._displays[i].position.set(ofs, -0.4, 0.01);
        }
    }
}
