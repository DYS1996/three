import { TextureLoader } from 'three';

// loadBGI: 图片(dataURL格式)作为texture 返回
// @param BGI dataURL: 使用webpack urlloader import 外部图片得到的dataURL
// @return bgi THREE.Texture: 处理后的 threejs texture
export default function loadBGI(BGI) {
    return new TextureLoader().load(BGI);
}
