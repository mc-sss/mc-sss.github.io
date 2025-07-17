// 预加载的搜索索引（示例数据，实际应通过JSON文件加载）
let searchIndex = null;

function generateSearchIndex() {
            const pageContent = document.getElementById('pageContent');
            
            // 自动提取标题和内容
            const title = document.title || "无标题页面";
            const content = pageContent.innerText;
            
            return [{
                title: title,
                content: content,
                url: window.location.pathname
            }];
        }

const pages = [
    { url: 'web/klpa.html', title: '更方便修改的射击模组雏形' },
    { url: 'web/klpb.html', title: 'function和python结合示例' },
    { url: 'web/klpc.html', title: '套装零件' },
    { url: 'web/klpd.html', title: '纯ui小游戏2048' },
    { url: 'web/klpe.html', title: '万用飞行生物零件' }
];
const baseUrl = window.location.origin;
async function buildSearchIndex() {
    const index = [];
    
    for (const page of pages) {
        const response = await fetch(page.url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        const content = doc.body.innerText;
        index.push({
            title: page.title,
            content: content,
            url: page.url
        });
    }
    
    return index;
}
 
// 导出索引
buildSearchIndex().then(index => {
    searchIndex = index;
});

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

function performSearch(query) {
    return searchIndex.filter(page => {
        const fullText = (page.title + ' ' + page.content).toLowerCase();
        return fullText.includes(query);
    });
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'search-result';
        
        // 高亮处理
        const highlightedContent = highlightText(result.content, document.getElementById('searchInput').value);
        
        div.innerHTML = `
            <h3>${highlightText(result.title, document.getElementById('searchInput').value)}</h3>
            <p>${highlightedContent}...</p>
        `;
        
        div.addEventListener('click', () => {
            window.location.href = result.url;
        });
        
        container.appendChild(div);

        const width = div.offsetWidth;
        div.style.maxHeight = `${width * 0.2}px`;
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}
