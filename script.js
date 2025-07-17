document.getElementById('trigger').addEventListener('click', function() {
    var hiddenText = document.getElementById('hiddenText');
    hiddenText.classList.toggle('hidden');
    var triggerText = document.getElementById('trigger');
    var text = triggerText.textContent;
    if (text === '♦点击展开文本') {
        triggerText.textContent = '♦点击收起文本'
    } else {
        triggerText.textContent = '♦点击展开文本'
    }
});

