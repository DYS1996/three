// ChangeColor: 改变 object颜色至 color 并 返回原有颜色

// @params object (THREE.Object3D | []THREE.Object3D): 待改变的物体，可以是一个，也可以是数组
// @params color (THREE.Color | []THREE.Color): 目标颜色，可以是一个，也可以是数组
// @return oldColor (THREE.color | []THREE.Color): 原有颜色，可以是一个，也可以是数组

// object是数组，color是数组： 将color一一赋给object，然后返回原有颜色数组
// object 是数组，color是单个颜色： 将color赋给所有object，然后返回原有颜色数组
// object 是单个,color 是单个： 将color 赋给object，然后返回原有颜色

export default function ChangeColor(object, color) {
    const material = object.material;
    let oldColor = null;
    if (Array.isArray(material)) {
        oldColor = [];
        if (!Array.isArray(color)) {
            material.forEach(mat => {
                if (mat.emissive) {
                    oldColor = [...oldColor, mat.emissive];
                    mat.emissive = color;
                }
            });
            return oldColor;
        }
        // oldColor = [];
        material.forEach(mat => {
            if (mat.emissive) {
                let i = 0;
                oldColor = [...oldColor, mat.emissive];
                mat.emissive = color[i];
                i++;
            }
        });
        return oldColor;
    }
    if (typeof material === 'object' && material !== null) {
        if (Array.isArray(color)) {
            throw 'cannot use array colors for single material';
        }
        // let oldColor = null;
        if (material.emissive) {
            oldColor = material.emissive;
            material.emissive = color;
        }
        return oldColor;
    }
    throw 'material type not supported';
}
