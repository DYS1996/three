import { Group } from 'three';
import { Rand } from '../js/util/Rand';
import DigitalMeter from './DigitalMeters/DigitalMeter';
import PointerMeter from './PointerMeters/PointerMeter';

// Meters: 用来测试两个电表的性能
export default class Meters extends Group {
    constructor() {
        super();
        const digitalMeter = new DigitalMeter(0, 'A', '数字电压表');

        digitalMeter.position.set(0, 0, 2.89);
        this.add(digitalMeter);
        let i = 0;
        setInterval(() => {
            digitalMeter.update(i === 0 ? 21000 : 21100);
            i = 1 - i;
        }, 2000);

        this.name = 'Meters';

        const pm = new PointerMeter(52.6, 'kP', '指针气压表');
        pm.position.set(0, 5.6, 1.45);
        pm.scale.set(0.65, 0.65, 0.65);
        this.add(pm);
        setInterval(() => {
            pm.update(Rand(0, 100));
        }, 2000);
    }
}
