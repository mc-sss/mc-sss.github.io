document.getElementById('trigger').addEventListener('click', function() {
    var hiddenText = document.getElementById('hiddenText');
    hiddenText.classList.toggle('hidden');
    var triggerText = document.getElementById('trigger');
    var text = triggerText.textContent;
    if (text === '♦点击展开文本，查看详情') {
        triggerText.textContent = '♦点击收起文本，查看详情'
    } else {
        triggerText.textContent = '♦点击展开文本，查看详情'
    }
});

if(document.getElementById("fdh")){
    let fds = document.getElementsByClassName("fds");
    for (let i = 0; i < fds.length; i++) {
        fds[i].onclick = function() {
            if(this.style.width=="100%"){
                this.style.border="none"
                this.style.margin="0 auto"
                this.style.BackgroundSize="contain"
                this.style.width="20%"
                this.style.height="auto"
                this.style.position="relative"
                this.style["z-index"]="50"
                this.scrollIntoView({block:"center"})
                fdh.style.display="none"
            }else{
                this.style.position="absolute"
                this.style.width="100%"
                this.style.margin="0 0"
                this.style["z-index"]="1001"
                this.style.left="0"
                fdh.style.display="block"
            }
        };
    };
};

function text_toggle(c, c2) {
    var hiddenText = document.getElementById(c);
    var buttontext = document.getElementById(c2);
    hiddenText.classList.toggle('hidden');
    buttontext.parentNode.removeChild(buttontext);
}
