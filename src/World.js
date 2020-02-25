import {
    Clock,
    AmbientLight,
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Color,
} from 'three';
import Highlighter from './js/util/Highligher';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import MouseTracker from './js/util/MouseTracker';
import Picker from './js/util/Picker';
import DataFetcher from './js/util/DataFetcher';
import TextBox from './js/util/TextBox';
import Fire from './models/Fire/Fire';

// World: 基本类，
// @param qrySeltr querySelector: css选择器，选择目标container，将threejs场景渲染入其中
// @method add: 将 object3D 添加至world中
//   @param obj THREE.Object3D: 待添加的 obejct3d元素
//   @param posi object{x, y, z}: 可选的元素位置，如有，将元素移动到指定位置处，如无，移动到(0,0,0)
//   @param scale obejct{x, y, z}: 可选的比例尺度，如有，将元素按指定尺度放大/缩小，如无，默认为(1,1,1)等比例
export default class World {
    constructor(qrySeltr) {
        // 初始化 canvas， renderer， camera
        const div = document.querySelector(qrySeltr);
        const cvs = document.createElement('canvas');
        div.appendChild(cvs);
        const renderer = new WebGLRenderer({
            alpha: true,
            canvas: cvs,
            antialias: true,
        });
        const domE = renderer.domElement;
        const camera = new PerspectiveCamera(
            75,
            domE.clientWidth / domE.clientHeight,
            0.1,
            500
        );
        camera.position.set(0, 0, 50);

        const scene = new Scene();
        this._scene = scene;
        scene.background = new Color(0x008082);
        scene.add(camera);

        const ambilight = new AmbientLight(0xffffff, 1);
        scene.add(ambilight);

        // mouseTracker 负责记录鼠标位置
        const mouseTracker = new MouseTracker(domE);
        domE.addEventListener('mousemove', e => mouseTracker.setPos(e));
        domE.addEventListener('mouseout', () => mouseTracker.clearPos());
        domE.addEventListener('mouseleave', () => mouseTracker.clearPos());

        const picker = new Picker(scene, camera);
        const dataFetcher = new DataFetcher();

        const fire = new Fire(6, 7, 7, 2, camera);
        domE.addEventListener('keydown', async e => {
            // 火灾报警demo: 按b会在对应位置创造火灾
            if (e.key === 'b') {
                const { data } = await dataFetcher.fetch(
                    'http://mengxuegu.com:7300/mock/5db2506f2aa750460d4fcd7a/objName'
                );
                // console.log(data);
                if (data && data.name) {
                    const tarObj = scene.getObjectByName(data.name);
                    if (tarObj) {
                        scene.remove(fire.mesh);
                        scene.add(fire.mesh);
                        fire.mesh.position.set(-2, 0, 23);
                    }
                }
            }
            // 按c移除存在的火灾
            if (e.key === 'c') {
                scene.remove(fire.mesh);
            }
            // 按a会使鼠标下的元素的详细信息输出在console中
            if (e.key === 'a') {
                const obj = picker.pick(mouseTracker.Posi);
                if (obj) {
                    console.log(obj);
                }
            }
        });

        // 点击元素，向服务端请求其详细信息并显示在textbox中
        const textBox = new TextBox();
        domE.addEventListener('click', async e => {
            const x = e.pageX;
            const y = e.pageY;
            const obj = picker.pick(mouseTracker.Posi);
            if (obj) {
                const dat = await dataFetcher.fetch(
                    `http://mengxuegu.com:7300/mock/5db2506f2aa750460d4fcd7a/member/${obj.id}`
                );
                if (dat) {
                    textBox.render(x, y, {
                        title: '仓库信息',
                        ...dat.data,
                    });
                }
            }
        });

        // 使用 MapControls
        const ctrls = new MapControls(camera, domE);

        ctrls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        ctrls.dampingFactor = 0.05;
        ctrls.minDistance = 1;
        ctrls.maxDistance = 500;
        ctrls.maxPolarAngle = Math.PI / 2;

        // hlr 物体高亮： 当鼠标放置在物体上时，将其颜色高亮为（黄色）
        const hlr = new Highlighter(scene, camera);

        const clock = new Clock();
        // 死循环刷新页面
        renderer.setAnimationLoop(() => {
            // 根据 canvas 宽、高 响应式调整 camera 长宽比等参数
            const canvas = domE;
            const obj = picker.pick(mouseTracker.Posi);

            if (
                canvas.clientHeight !== canvas.height ||
                canvas.clientWidth !== canvas.width
            ) {
                renderer.setSize(
                    canvas.clientWidth,
                    canvas.clientHeight,
                    false
                );
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            ctrls.update();
            renderer.render(scene, camera);

            fire.update(clock.getElapsedTime());

            hlr.highlight(obj);
        });
    }
    add(obj, posi, scale) {
        this._scene.add(obj);
        if (posi) {
            obj.position.set(posi.x, posi.y, posi.z);
        }
        obj.position.set(0, 0, 0);
        if (scale) {
            obj.scale.set(scale.x, scale.y, scale.z);
        }

        obj.scale.set(1, 1, 1);
    }
}
