// document.getElementById('trigger').addEventListener('click', function() {
//     var hiddenText = document.getElementById('hiddenText');
//     hiddenText.classList.toggle('hidden');
//     var triggerText = document.getElementById('trigger');
//     var text = triggerText.textContent;
//     if (text === '♦点击展开文本') {
//         triggerText.textContent = '♦点击收起文本'
//     } else {
//         triggerText.textContent = '♦点击展开文本'
//     }
// });

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