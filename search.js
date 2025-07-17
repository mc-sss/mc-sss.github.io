// 预加载的搜索索引（示例数据，实际应通过JSON文件加载）
let searchIndex = null;

function extractCleanText(element) {
    let text = "";
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT, // 只处理文本节点
        null,
        false
    );
 
    let node;
    while ((node = walker.nextNode())) {
        text += node.textContent.trim() + " "; // 合并文本，用空格分隔
    }
 
    return text.replace(/\s+/g, " ").trim(); // 合并多个空格为单个
}

async function buildSearchIndex() {
    const index = [];
    
    try {
        const files = ['klpa.html', 'klpb.html', 'klpc.html', 'klpd.html', 'klpe.html'];
        
        for (const file of files) {
            const fileResponse = await fetch(`web/${file}`);
            const text = await fileResponse.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // 获取所有 h1 元素
            const h1s = doc.querySelectorAll('h1');
            if (h1s.length === 0) {
                // 如果没有 h1，使用整个文档内容
                index.push({
                    title: doc.title || "无标题",
                    content: doc.body.innerText,
                    url: `web/${file}`
                });
            } else {
                // 每个 h1 及其后续内容作为一个独立条目
                h1s.forEach(h1 => {
                    const title = h1.innerText.trim();
                    let content = "";
                    let nextNode = h1.nextElementSibling;
                    
                    // 遍历直到下一个 <h1> 或文档结束
                    while (nextNode && !(nextNode.nodeName === "H1")) {
                        content += extractCleanText(nextNode) + " "; // 递归提取文本
                        nextNode = nextNode.nextElementSibling;
                    }
                    
                    index.push({
                        title: title || "无标题",
                        content: content.trim(),
                        url: `web/${file}#${encodeURIComponent(title)}`
                    });
                });
            }
        }
    } catch (error) {
        return [
            { title: "更方便修改的射击模组雏形（作者：某只苦力怕）", content: "作品简介 新增3d物品：猫猫 新增玩家动作优化：走、跑 新增玩家独立手臂 纯python脚本操作，非常方便二次创作 使用方式 导入模型、贴图、动画后，按一样的写法复制粘贴，即可重复制作同样的内容 清单 (*核心)代表删除后模组就失效的部分 . ├── beh │ ├── CustomCatmaobbbScripts │ │ ├── client.py ———— 客户端python脚本文件(*核心) │ │ ├── modMain.py ———— python脚本文件(*核心) │ │ └── server.py ———— 服务端python脚本文件 │ └─ netease_items_beh │ └── catmaobbb.json ———— 猫猫的物品行为文件(*核心) └── res ├── animation_controllers │ └── catmaobbb.animation_controllers.json ———— 猫猫的动画控制器文件(*核心) ├── animations │ ├── better_steve.animation.json ———— 动作优化的动画文件(*核心) │ ├── catmaobbb.animation.json ———— 玩家第三人称手持猫猫时的动画文件(*核心) │ └── catmaobbb.animation_first.json ———— 玩家第一人称手持猫猫时的动画文件(*核心) ├── attachables │ └── catmaobbb.json ———— 猫猫的附着物文件(*核心) ├── models │ └── entity │ ├── catmaobbb.json ———— 猫猫的3d模型(*核心) │ ├── catmaobbb_arm.json ———— 独立手臂的模型(*核心) │ ├── player.armor.base.json ———— 适配玩家动作优化的装备模型(*核心) │ ├── player_armor.json ———— 适配玩家动作优化的装备模型引用模型(*核心) │ └── the_man_animation.json ———— 适配玩家动作优化的玩家模型(*核心) ├── netease_items_res │ └── catmaobbb.json ———— 猫猫的物品材质文件(*核心) ├── render_controllers │ └── catmaobbb_controller.json ———— 独立手臂的渲染控制器(*核心) ├── texts │ └── zh_CN.lang ———— 定义中文名称 └── textures ├── item_texture.json ———— 贴图引用文件 ├── entity │ └── catmaobbb.png ———— 猫猫的3d模型贴图 └── items └── catmaobbb.png ———— 猫猫的物品栏贴图 ...", url: "web/klpa.html" },
            { title: "function和python结合示例（作者：某只苦力怕）", content: "Python函数示例...", url: "web/klpb.html" }
        ];
    }
    
    return index;
}
 
// 导出索引
buildSearchIndex().then(index => {
    searchIndex = index;
});

function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    return searchIndex.filter(page => {
        const fullText = (page.title + ' ' + page.content).toLowerCase();
        return fullText.includes(lowerQuery);
    }).map(page => ({
        title: page.title,
        content: page.content,
        url: page.url
    }));
}

// 初始化搜索功能
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 2) return;

    const results = performSearch(query);
    displayResults(results);
});

document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault(); // 阻止表单提交
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) {
        alert("请输入搜索内容！");
        return;
    }
    const results = performSearch(query);
    displayResults(results);
});

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';
 
    if (results.length === 0) {
        container.innerHTML = '<div class="search-result"><p>没有找到匹配的结果</p></div>';
        return;
    }
 
    // 为每个结果创建一个容器
    results.forEach(result => {
        // 创建标题
        const titleTemplate = document.createElement('h3');
        titleTemplate.innerHTML = highlightText(result.title, document.getElementById('searchInput').value) || result.title;

        // 获取所有高亮片段
        const fragments = highlightText(result.content, document.getElementById('searchInput').value);
        
        // 为每个片段创建单独的div
        fragments.forEach(fragment => {
            const title = titleTemplate.cloneNode(true); // 深克隆
            const div = document.createElement('div');
            div.className = 'search-result';
            div.appendChild(title);
            const preview = document.createElement('p');
            preview.innerHTML = fragment;
            div.appendChild(preview);
            div.addEventListener('click', () => {
                window.location.href = result.url;
            });
            container.appendChild(div);
 
            const width = div.offsetWidth;
            div.style.maxHeight = `${width * 0.2}px`;
        });
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    const results = [];
    let match;
    let num = null;
    
    // 查找所有匹配位置
    while ((match = regex.exec(text)) !== null) {
        const matchIndex = match.index;
        if (num == null || num+50 < matchIndex) {
            num = matchIndex;
            const matchLength = match[0].length;
            
            // 提取上下文
            const start = Math.max(0, matchIndex - 50);
            const end = Math.min(text.length, matchIndex + matchLength + 50);
            let snippet = text.substring(start, end);

            // 尝试扩展到完整句子
            const sentenceStart = Math.max(
                0,
                snippet.lastIndexOf('。') + 1, // 从上一个句号后开始
                snippet.lastIndexOf('\n') + 1  // 或上一行后开始
            );
            snippet = snippet.substring(sentenceStart).trim(); // 去除前导空格
            
            // 截断到下一个句号或换行
            const sentenceEnd = Math.min(
                snippet.indexOf('。'),
                snippet.indexOf('\n'),
                snippet.length
            );
            if (sentenceEnd > 0) {
                snippet = snippet.substring(0, sentenceEnd + 1);
            }
            
            // 高亮处理
            const highlighted = snippet.replace(
                new RegExp(`(${query})`, 'gi'),
                '<span class="highlight">$1</span>'
            );
            
            results.push(highlighted);
        }
    }

    return results.length > 0 
    ? results 
    : [text.length > 50 ? text.substring(0, 50) + '......' : text];
}