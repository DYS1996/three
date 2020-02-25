// Rand: 生成min~max随机数
export function Rand(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return min + (max - min) * Math.random();
}

// RandomColor: 生成随机颜色
export function RandomColor() {
    return `hsl(${Rand(360) | 0}, ${Rand(50, 100) | 0}%, 50%)`;
}
