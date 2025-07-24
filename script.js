document.addEventListener('DOMContentLoaded', function() {
    // 获取所有带子菜单的项
    const menuItems = document.querySelectorAll('.with-submenu span');
    menuItems.forEach(item => {
        item.setAttribute('title', '点击展开/收起');
        const container = item.closest('.with-submenu');
        // 找到对应的子菜单
        const submenu = container?.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
            item.addEventListener('click', function(e) {
                // 阻止链接跳转（如果需要）
                e.preventDefault();
                // 切换子菜单显示
                submenu.classList.toggle('expanded');
                container.classList.toggle('expanded');
            });
        };
    });
});
// document.addEventListener('DOMContentLoaded', function() {
//   // 绑定点击事件到 h2 和 span
//   document.querySelectorAll('.with-submenu h2, .with-submenu span').forEach(trigger => {
//     const container = trigger.parentElement;
//     const submenu = container.nextElementSibling;
//     trigger.addEventListener('click', function(e) {
//       e.preventDefault();
//       submenu.classList.toggle('expanded');
//       container.classList.toggle('expanded'); // 切换箭头方向
//     });
//   });
// });

try {
hljs.highlightAll();
} catch (error) {}

function copyCode(button) {
    const container = button.closest('.code-container');
    const codeElement = container.querySelector('code');
    
    // 创建一个临时的textarea元素来复制文本
    const textarea = document.createElement('textarea');
    textarea.value = codeElement.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // 临时更改按钮文本以提供反馈
    const originalText = button.textContent;
    button.textContent = '已复制!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}
