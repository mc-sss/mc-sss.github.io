document.addEventListener('DOMContentLoaded', function() {
    // 获取所有带子菜单的项
    const menuItems = document.querySelectorAll('.with-submenu');
    menuItems.forEach(item => {
        const submenu = item.nextElementSibling; // 获取下一个 <ul class="submenu">
        item.addEventListener('click', function(e) {
            // 阻止链接跳转（如果需要）
            e.preventDefault();
            // 切换子菜单显示
            submenu.classList.toggle('expanded');
            item.classList.toggle('expanded');
        });
    });
});

hljs.highlightAll();

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
