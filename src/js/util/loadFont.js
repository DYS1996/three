import { FontLoader } from 'three';

// loadFT: 加载外部字体(json格式) 作为 font 返回
// @param FT FontObject: 使用webpack jsonloader import 外部json文件得到的object，(https://threejs.org/docs/#api/en/geometries/TextGeometry)(https://gero3.github.io/facetype.js/)
// @return ft THREE.FONT: 处理后的 threejs font
export default function loadFT(FT) {
    return new FontLoader().parse(FT);
}
