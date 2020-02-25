// MouseTracker: 鼠标位置记录器
// @param cvs DOMElement.CANVAS: Threejs 渲染的目标canvas
// @method clearPos: 清空鼠标位置，使其无法选中任何元素
// @method getCanvasRelaPos: 得到鼠标在canvas上的相对位置
//   @param event HTMLDomEvent: html鼠标事件
// @method setPos: 更新MouseTracker的Posi变量
//   @param event HTMLDomEvent: html鼠标事件
export default class MouseTracker {
    constructor(cvs) {
        this.canvas = cvs;
        this.Posi = { x: 0, y: 0 };
        this.clearPos();
    }
    clearPos() {
        this.Posi.x = -100000;
        this.Posi.y = -100000;
    }
    getCanvasRelaPos(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    setPos(event) {
        const pos = this.getCanvasRelaPos(event);
        this.Posi.x = (pos.x / this.canvas.clientWidth) * 2 - 1;
        this.Posi.y = (pos.y / this.canvas.clientHeight) * -2 + 1;
    }
}
