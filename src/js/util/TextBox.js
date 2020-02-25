// TextBox： 对话框类，用于显示文本信息
// @method render: 将对话框渲染在指定位置
//   @param x, y int: 浏览器坐标，将对话框的左上角显示在对应坐标处
//   @param data {title: , ...}: 文本信息，其中title的文本会显示为textbox的标题， 其余作为内容显示在标题下方
export default class TextBox {
    constructor() {}
    render(x, y, data) {
        const textBox = document.createElement('div');
        textBox.style.position = 'absolute';
        const { title: titleText, ...contentBody } = data;

        const title = document.createElement('div');
        title.textContent = titleText;
        title.style.border = '#85abe4 1px solid';
        title.style.background = '#5b8bd9';
        title.style.color = '#ffffff';
        title.style.fontSize = '14px';
        textBox.append(title);

        const content = document.createElement('div');
        content.style.border = '#85abe4 1px solid';
        // content.style.display = 'flex';
        for (let [label, text] of Object.entries(contentBody)) {
            const cntr = document.createElement('div');
            // cntr.style.float = 'center';
            cntr.style.display = 'flex';

            const key = document.createElement('div');
            key.textContent = label + ': ';
            key.style.textAlign = 'right';
            key.style.fontSize = '14px';
            // key.style.float = 'left';
            key.style.width = '80px';
            key.style.color = '#00ff7f';

            cntr.append(key);

            const val = document.createElement('input');
            val.type = 'text';
            val.value = text;
            val.disabled = true;

            cntr.append(val);

            content.append(cntr);
        }
        textBox.append(content);

        document.body.append(textBox);
        textBox.style.left = `${x}px`;
        if (y + textBox.offsetHeight > document.documentElement.clientHeight) {
            textBox.style.top = `${y - textBox.offsetHeight}px`;
        } else {
            textBox.style.top = `${y}px`;
        }
        setTimeout(() => document.body.removeChild(textBox), 3000);
    }
}
