// Google AI 提示詞產生器 - 主要 JavaScript 檔案

// 全域變數
let isFullscreen = false;
let isDarkTheme = false;

// DOM 元素
const elements = {
    // 表單元素
    promptForm: null,
    roleInput: null,
    taskInput: null,
    contextInput: null,
    formatSelect: null,
    formatCustom: null,
    clearBtn: null,
    copyBtn: null,
    roleSuggestions: null,
    taskSuggestions: null,
    contextSuggestions: null,
    
    // 顯示元素
    wordCount: null,
    wordIndicator: null,
    promptPreview: null,
    promptContent: null,
    previewWordCount: null,
    goldenRuleStatus: null,
    
    // 控制元素
    fullscreenBtn: null,
    themeToggle: null,
    homeBtn: null, // 新增返回首頁按鈕
    toast: null
};

// 角色與其相關建議的資料庫
const roleData = [
    {
        name: "行銷專家",
        role: "你是一位資深的數位行銷專家",
        taskPlaceholder: "例如：為新款智慧手錶撰寫產品介紹文案",
        taskSuggestions: ["撰寫社群媒體貼文", "規劃一季的行銷活動", "設計一封EDM電子報", "分析競品廣告策略", "撰寫一篇新聞稿"],
        contextPlaceholder: "例如：目標客群是25-40歲的科技愛好者，強調健康監測功能",
        contextSuggestions: ["預算有限，需著重免費渠道", "產品最大特色是超長續航力", "配合母親節檔期活動", "品牌形象主打專業與信賴", "發布對象是科技產業記者"]
    },
    {
        name: "資料分析師",
        role: "你是一位專業的資料分析師",
        taskPlaceholder: "例如：分析我們Q3季度的銷售數據趨勢",
        taskSuggestions: ["預測下個月份的用戶增長", "找出客戶流失的主要原因", "建立一個銷售儀表板", "評估A/B測試的成效", "進行用戶分群分析"],
        contextPlaceholder: "例如：包含三個產品線的月度銷售額，需要找出成長動因",
        contextSuggestions: ["數據來源是Google Analytics", "請專注於新用戶的行為模式", "目標是提升客單價", "高層需要簡潔易懂的結論", "目標是找出最有價值的客戶群體"]
    },
    {
        name: "創意寫手",
        role: "你是一位充滿想像力的創意寫手",
        taskPlaceholder: "例如：寫一個關於時間旅行的短篇故事大綱",
        taskSuggestions: ["為一個新品牌命名", "撰寫一個30秒的廣告腳本", "構思一系列部落格文章標題", "為產品寫一句響亮的標語", "為Podcast節目撰寫開場白"],
        contextPlaceholder: "例如：故事主角是一位來自未來的歷史學家",
        contextSuggestions: ["品牌風格是年輕、活潑", "目標讀者是青少年", "故事氛圍需要懸疑感", "廣告需要幽默風趣", "節目主題是都市傳說"]
    },
    {
        name: "技術顧問",
        role: "你是一位經驗豐富的企業技術顧問",
        taskPlaceholder: "例如：為一家傳統零售業規劃數位轉型藍圖",
        taskSuggestions: ["評估導入CRM系統的效益", "比較三種雲端服務供應商", "設計一個資訊安全政策", "規劃一個內部IT培訓計畫", "撰寫一份系統導入的RFP文件"],
        contextPlaceholder: "例如：公司目前完全沒有線上業務，員工平均年齡較高",
        contextSuggestions: ["重點在於提升營運效率", "預算規模大約在100萬台幣", "需要分階段實施", "必須符合GDPR規範", "需包含明確的技術規格與驗收標準"]
    },
    {
        name: "高中老師",
        role: "你是一位熱情的高中歷史老師",
        taskPlaceholder: "例如：設計一個關於第二次世界大戰的互動式課堂活動",
        taskSuggestions: ["出一份期末考卷", "準備一堂課的簡報大綱", "寫一封給家長的通知信", "規劃校外教學活動", "為學生撰寫一封推薦信"],
        contextPlaceholder: "例如：學生對此主題的先備知識有限，需引發學習興趣",
        contextSuggestions: ["課堂時間為50分鐘", "需要包含分組討論環節", "評量方式需多元", "希望能結合時事議題", "學生要申請大學的資訊工程科系"]
    },
    {
        name: "軟體工程師",
        role: "你是一位資深的後端工程師",
        taskPlaceholder: "例如：為一個新的電商網站規劃資料庫結構",
        taskSuggestions: ["撰寫一個API的技術文件", "進行程式碼審查 (Code Review)", "設計一個系統架構圖", "解釋一個複雜的演算法", "為現有系統進行效能優化"],
        contextPlaceholder: "例如：需要儲存用戶、商品、訂單和評論資訊",
        contextSuggestions: ["需要考慮到高併發情境", "技術棧是Node.js和PostgreSQL", "安全性是首要考量", "需要與前端工程師協作", "用戶反映頁面載入速度過慢"]
    },
    {
        name: "米其林主廚",
        role: "你是一位專精於義式料理的米其林星級主廚",
        taskPlaceholder: "例如：為一家新餐廳設計一份春季限定的創意菜單",
        taskSuggestions: ["研發一道新的義大利麵", "設計一份擺盤教學指南", "規劃廚房的標準作業流程(SOP)", "為紅酒與餐點做搭配建議", "設計一套員工的烹飪培訓課程"],
        contextPlaceholder: "例如：強調使用台灣當季食材，菜單需包含前菜、主菜和甜點",
        contextSuggestions: ["餐廳定位是高檔精緻餐飲", "需要考慮成本控制", "部分客人是素食者", "菜色需富有故事性", "目標是確保所有分店的品質一致"]
    },
    {
        name: "健身教練",
        role: "你是一位持有專業證照的健身教練",
        taskPlaceholder: "例如：為一位想減重的初學者設計為期一個月的訓練計畫",
        taskSuggestions: ["設計一個高強度間歇訓練(HIIT)菜單", "撰寫一篇關於健康飲食的文章", "拍攝一部深蹲的教學影片腳本", "回答學員的常見問題", "分析客戶的飲食日誌並提供建議"],
        contextPlaceholder: "例如：學員是30歲上班族，每週只能運動三天，有膝蓋舊傷",
        contextSuggestions: ["目標是降低體脂肪", "著重於核心肌群的訓練", "需要可以在家完成的動作", "飲食建議需方便外食族", "客戶有乳糖不耐症"]
    },
    {
        name: "旅遊規劃師",
        role: "你是一位資深的旅遊規劃師",
        taskPlaceholder: "例如：規劃一個為期七天的日本關西家庭旅遊行程",
        taskSuggestions: ["撰寫一篇冰島的旅遊攻略", "比較不同航空公司的CP值", "整理一份出國行李打包清單", "推薦三個適合蜜月的海島", "規劃一個壯遊歐洲一個月的背包客行程"],
        contextPlaceholder: "例如：成員包含兩位長輩和一位小孩，預算十萬元",
        contextSuggestions: ["行程不能太緊湊", "需要包含親子友善的景點", "住宿希望是交通方便的飯店", "長輩吃不慣生冷食物", "預算極為有限，以青年旅館為主"]
    },
    {
        name: "產品經理",
        role: "你是一位敏銳的網路產品經理",
        taskPlaceholder: "例如：撰寫一個新功能的產品需求規格文件(PRD)",
        taskSuggestions: ["規劃產品的Roadmap", "進行市場競爭者分析", "設計使用者訪談問卷", "撰寫用戶故事(User Story)", "主持一場產品待辦事項的梳理會議"],
        contextPlaceholder: "例如：這個功能是會員點數兌換系統",
        contextSuggestions: ["目標是提升用戶活躍度", "需要定義成功指標(Success Metrics)", "開發時程預計為兩個衝刺(Sprint)", "需考慮App和網頁版的一致性", "需要與工程師和設計師對齊下個季度的目標"]
    },
    {
        name: "UI/UX設計師",
        role: "你是一位注重使用者體驗的UI/UX設計師",
        taskPlaceholder: "例如：為一個冥想App設計註冊流程",
        taskSuggestions: ["規劃一個網站的資訊架構", "設計一個易於使用的操作介面", "進行易用性測試(Usability Testing)", "建立一個設計系統(Design System)", "製作一個高保真度的互動原型(Prototype)"],
        contextPlaceholder: "例如：目標用戶是第一次使用這類App的新手",
        contextSuggestions: ["設計風格需要簡潔、療癒", "需要減少用戶的點擊次數", "必須符合WCAG無障礙規範", "要同時考慮iOS和Android平台", "用於展示給投資人看的核心功能流程"]
    },
    {
        name: "財務顧問",
        role: "你是一位專業的理財規劃顧問",
        taskPlaceholder: "例如：為一位30歲的年輕人提供退休金規劃建議",
        taskSuggestions: ["分析一支股票的投資潛力", "解釋不同的保險產品", "比較基金與ETF的差異", "撰寫一篇關於節稅技巧的文章", "建立一個家庭收支預算表範本"],
        contextPlaceholder: "例如：他月收入五萬元，風險承受度為中等",
        contextSuggestions: ["投資目標是20年後累積500萬", "需要考慮通貨膨脹的影響", "建議配置應包含股債平衡", "需要簡單易懂的解釋金融術語", "目標是幫助客戶找出可節省的開銷"]
    },
    {
        name: "法律顧問",
        role: "你是一位專精於合約審閱的法律顧問",
        taskPlaceholder: "例如：審閱一份房屋租賃合約並指出潛在風險",
        taskSuggestions: ["草擬一份保密協議(NDA)", "解釋著作權法的合理使用範圍", "撰寫一封律師函", "分析一個商標註冊的可行性", "提供一份員工股權激勵計畫的法律建議"],
        contextPlaceholder: "例如：我是房客，第一次在外面租房子",
        contextSuggestions: ["需要確保條文的公平性", "找出是否有不合理的條款", "合約需要符合台灣的法律", "用白話文解釋法律條文", "公司是一家剛完成A輪融資的新創"]
    },
    {
        name: "人資專家",
        role: "你是一位資深的人力資源專家",
        taskPlaceholder: "例如：設計一個針對新進員工的培訓計畫(Onboarding)",
        taskSuggestions: ["撰寫一個職位的招募文案", "規劃一場面試的流程與問題", "建立公司的績效考核制度", "處理一件勞資糾紛", "規劃一場提升團隊凝聚力的Team Building活動"],
        contextPlaceholder: "例如：公司是一間快速成長的新創公司，文化活潑",
        contextSuggestions: ["目標是讓新人快速融入", "需要建立導師制度(Mentor Program)", "培訓內容需包含公司文化", "流程需要線上化、系統化", "團隊成員多為遠端工作者"]
    },
    {
        name: "社群小編",
        role: "你是一位懂得創造話題的社群小編",
        taskPlaceholder: "例如：規劃一系列提高IG粉絲互動的限時動態",
        taskSuggestions: ["發想一個臉書抽獎活動", "回覆粉絲的負面評論", "撰寫一篇KOL合作的邀約信", "分析社群後台的數據", "製作一個短影音(Reels/Shorts)的內容腳本"],
        contextPlaceholder: "例如：我們的品牌是賣手搖飲料，粉絲多為年輕學生",
        contextSuggestions: ["內容要有趣、跟上時事梗", "希望增加粉絲的分享與標記", "要使用年輕人的流行語", "舉辦一場投票或問答活動", "影片內容是產品的開箱與教學"]
    }
];

// 範例數據 (用於頁面下方的展示區塊)
const examples = [
    {
        role: "你是一位資深的數位行銷專家",
        task: "為我們的新款智慧手錶撰寫產品介紹文案",
        context: "目標客群是25-40歲的科技愛好者，強調健康監測功能",
        format: "請以生動有趣的方式呈現，字數控制在200字以內"
    },
    {
        role: "你是一位專業的資料分析師",
        task: "分析我們Q3季度的銷售數據趨勢",
        context: "包含三個產品線的月度銷售額，需要找出成長動因",
        format: "請以重點摘要+圖表建議的方式呈現"
    },
    {
        role: "你是一位經驗豐富的高中歷史老師",
        task: "設計一個關於第二次世界大戰的互動式課堂活動",
        context: "學生對此主題的先備知識有限，需要引發他們的學習興趣，活動時間為45分鐘",
        format: "請提供活動流程、所需材料清單，以及評估學生學習成效的方法"
    },
    {
        role: "你是一位資深的後端工程師",
        task: "為一個新的電商網站規劃資料庫結構",
        context: "需要儲存用戶、商品、訂單和評論資訊，並考慮到未來擴展性與效能",
        format: "請以ERD（實體關聯圖）的描述和SQL schema的方式呈現"
    },
    {
        role: "你是一位專精於義式料理的米其林星級主廚",
        task: "為一家新餐廳設計一份春季限定的創意菜單",
        context: "強調使用台灣當季食材，菜單需包含前菜、主菜和甜點各三道",
        format: "請以菜色名稱、食材介紹和烹飪手法的格式呈現"
    }
];

// 初始化應用程式
function initApp() {
    getDOMElements();
    populateRoleSuggestions();
    bindEventListeners();
    initTheme();
    loadFormData();
    initTooltips();
    updateSuggestionsForRole(elements.roleInput.value); // 根據載入的資料初始化建議
    console.log('Google AI 提示詞產生器初始化完成');
}

// 獲取 DOM 元素
function getDOMElements() {
    elements.promptForm = document.getElementById('promptForm');
    elements.roleInput = document.getElementById('role');
    elements.taskInput = document.getElementById('task');
    elements.contextInput = document.getElementById('context');
    elements.formatSelect = document.getElementById('formatSelect');
    elements.formatCustom = document.getElementById('formatCustom');
    elements.clearBtn = document.getElementById('clearBtn');
    elements.copyBtn = document.getElementById('copyBtn');
    
    elements.roleSuggestions = document.getElementById('roleSuggestions');
    elements.taskSuggestions = document.getElementById('taskSuggestions');
    elements.contextSuggestions = document.getElementById('contextSuggestions');
    
    elements.wordCount = document.getElementById('wordCount');
    elements.wordIndicator = document.getElementById('wordIndicator');
    elements.promptPreview = document.getElementById('promptPreview');
    elements.promptContent = document.getElementById('promptContent');
    elements.previewWordCount = document.getElementById('previewWordCount');
    elements.goldenRuleStatus = document.getElementById('goldenRuleStatus');
    
    elements.fullscreenBtn = document.getElementById('fullscreenBtn');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.homeBtn = document.getElementById('homeBtn'); // 獲取按鈕元素
    elements.toast = document.getElementById('toast');
}

// 動態填入角色建議按鈕
function populateRoleSuggestions() {
    elements.roleSuggestions.innerHTML = ''; // 清空現有按鈕
    roleData.forEach(data => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'suggestion-btn';
        btn.dataset.target = 'role';
        btn.dataset.value = data.role;
        btn.textContent = data.name;
        elements.roleSuggestions.appendChild(btn);
    });
}

// 根據選擇的角色更新任務與背景的建議
function updateSuggestionsForRole(roleValue) {
    const selectedRole = roleData.find(data => data.role === roleValue);

    if (selectedRole) {
        // 更新 Placeholder
        elements.taskInput.placeholder = selectedRole.taskPlaceholder;
        elements.contextInput.placeholder = selectedRole.contextPlaceholder;
        
        // 更新建議按鈕
        updateSuggestionButtons(elements.taskSuggestions, 'task', selectedRole.taskSuggestions);
        updateSuggestionButtons(elements.contextSuggestions, 'context', selectedRole.contextSuggestions);
    } else {
        // 如果是自訂角色，恢復通用 Placeholder 並清空建議
        elements.taskInput.placeholder = '例如：為新產品撰寫一份行銷企劃';
        elements.contextInput.placeholder = '例如：這是一個針對25-35歲上班族的健康飲品產品';
        updateSuggestionButtons(elements.taskSuggestions, 'task', []);
        updateSuggestionButtons(elements.contextSuggestions, 'context', []);
    }
}

// 更新建議按鈕的輔助函式
function updateSuggestionButtons(container, target, suggestions) {
    container.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'suggestion-btn';
            btn.dataset.target = target;
            btn.dataset.value = suggestion;
            btn.textContent = suggestion;
            container.appendChild(btn);
        });
    }
}


// 綁定事件監聽器
function bindEventListeners() {
    elements.promptForm.addEventListener('submit', handleFormSubmit);
    
    // 對整個表單進行事件委派，以處理動態新增的按鈕
    elements.promptForm.addEventListener('click', (e) => {
        if (e.target.matches('.suggestion-btn')) {
            applySuggestion(e);
        }
    });
    
    // 監聽角色輸入變化，動態更新建議
    elements.roleInput.addEventListener('input', () => {
        updateSuggestionsForRole(elements.roleInput.value);
    });

    [elements.roleInput, elements.taskInput, elements.contextInput, elements.formatCustom].forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', saveFormData);
    });
    
    elements.formatSelect.addEventListener('change', handleFormatChange);
    
    elements.clearBtn.addEventListener('click', clearForm);
    elements.copyBtn.addEventListener('click', copyPrompt);
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // 綁定返回首頁按鈕事件
    elements.homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });

    document.querySelectorAll('.apply-example').forEach(btn => {
        btn.addEventListener('click', applyExample);
    });
    
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', toggleAccordion);
    });
    
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
}

// 處理表單提交
function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    const prompt = generatePrompt();
    displayPromptPreview(prompt);
    saveFormData();
    showToast('提示詞已成功產生！', 'success');
}

// 驗證表單
function validateForm() {
    const role = elements.roleInput.value.trim();
    const task = elements.taskInput.value.trim();
    if (!role) {
        showToast('請填寫角色設定', 'error');
        elements.roleInput.focus();
        return false;
    }
    if (!task) {
        showToast('請填寫任務描述', 'error');
        elements.taskInput.focus();
        return false;
    }
    return true;
}

// 產生提示詞
function generatePrompt() {
    const role = elements.roleInput.value.trim();
    const task = elements.taskInput.value.trim();
    const context = elements.contextInput.value.trim();
    const formatValue = getFormatValue();
    let prompt = '';
    if (role) prompt += role + (/[，。,.]$/.test(role) ? ' ' : '，');
    if (task) prompt += task + (/[，。,.]$/.test(task) ? ' ' : '。');
    if (context) prompt += context + (/[，。,.]$/.test(context) ? ' ' : '。');
    if (formatValue) prompt += formatValue + (/[。,.]$/.test(formatValue) ? '' : '。');
    return prompt.trim().replace(/\s+/g, ' ');
}

// 獲取格式值
function getFormatValue() {
    const selectValue = elements.formatSelect.value;
    if (selectValue === 'custom') {
        return elements.formatCustom.value.trim();
    } else if (selectValue) {
        return `請以${selectValue}`;
    }
    return '';
}

// 顯示提示詞預覽
function displayPromptPreview(prompt) {
    elements.promptContent.textContent = prompt;
    elements.promptPreview.classList.remove('hidden');
    const wordCount = countWords(prompt);
    elements.previewWordCount.textContent = wordCount;
    updateGoldenRuleStatus(wordCount);
    elements.promptPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 處理輸入變化
function handleInputChange() {
    updateWordCount();
    clearTimeout(handleInputChange.timeoutId);
    handleInputChange.timeoutId = setTimeout(saveFormData, 1000);
}

// 更新字數統計
function updateWordCount() {
    const totalText = [
        elements.roleInput.value.trim(),
        elements.taskInput.value.trim(),
        elements.contextInput.value.trim(),
        getFormatValue()
    ].filter(text => text).join('');
    const wordCount = countWords(totalText);
    elements.wordCount.textContent = wordCount;
    updateWordIndicator(wordCount);
}

// 計算字數（中英文混合）
function countWords(text) {
    if (!text) return 0;
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const chineseChars = (cleanText.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = (cleanText.replace(/[\u4e00-\u9fff]/g, ' ').match(/[a-zA-Z0-9'-]+/g) || []).length;
    return chineseChars + englishWords;
}

// 更新字數指示器
function updateWordIndicator(wordCount) {
    elements.wordIndicator.className = 'word-indicator';
    if (wordCount >= 21) elements.wordIndicator.classList.add('excellent');
    else if (wordCount >= 15) elements.wordIndicator.classList.add('good');
}

// 更新黃金法則狀態
function updateGoldenRuleStatus(wordCount) {
    const status = elements.goldenRuleStatus;
    status.className = 'stat';
    if (wordCount >= 21) {
        status.classList.add('excellent');
        status.innerHTML = '<i class="fas fa-crown"></i>已達21字黃金標準！';
    } else if (wordCount >= 15) {
        status.classList.add('good');
        status.innerHTML = '<i class="fas fa-medal"></i>接近21字標準';
    } else {
        status.innerHTML = '<i class="fas fa-target"></i>建議達到21字';
    }
}

// 處理格式選擇變化
function handleFormatChange() {
    if (elements.formatSelect.value === 'custom') {
        elements.formatCustom.classList.remove('hidden');
        elements.formatCustom.focus();
    } else {
        elements.formatCustom.classList.add('hidden');
        elements.formatCustom.value = '';
    }
    updateWordCount();
    saveFormData();
}

// 套用建議
function applySuggestion(e) {
    const targetId = e.target.getAttribute('data-target');
    const value = e.target.getAttribute('data-value');
    if (targetId && value) {
        const input = document.getElementById(targetId);
        input.value = value;
        input.focus();
        
        if (targetId === 'role') {
            updateSuggestionsForRole(value);
        }

        updateWordCount();
        saveFormData();
        showToast('已套用建議內容', 'success');
    }
}

// 套用範例
function applyExample(e) {
    const exampleIndex = parseInt(e.target.getAttribute('data-example'));
    const example = examples[exampleIndex];
    if (example) {
        elements.roleInput.value = example.role;
        elements.taskInput.value = example.task;
        elements.contextInput.value = example.context;
        elements.formatSelect.value = 'custom';
        elements.formatCustom.classList.remove('hidden');
        elements.formatCustom.value = example.format;
        
        updateSuggestionsForRole(example.role);
        updateWordCount();
        saveFormData();
        showToast('已套用範例內容', 'success');
        elements.promptForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// 清除表單
function clearForm() {
    elements.promptForm.reset();
    elements.formatCustom.classList.add('hidden');
    elements.promptPreview.classList.add('hidden');
    updateSuggestionsForRole('');
    updateWordCount();
    clearFormData();
    showToast('已清除所有內容', 'success');
    elements.roleInput.focus();
}

// 複製提示詞
async function copyPrompt() {
    const promptText = elements.promptContent.textContent;
    if (!promptText) {
        showToast('沒有可複製的內容', 'error');
        return;
    }
    try {
        await navigator.clipboard.writeText(promptText);
        showToast('提示詞已複製到剪貼板', 'success');
        elements.copyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => { elements.copyBtn.style.transform = 'scale(1)'; }, 150);
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = promptText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('提示詞已複製到剪貼板', 'success');
    }
}

// 切換手風琴
function toggleAccordion(e) {
    const accordionItem = e.currentTarget.closest('.accordion-item');
    const isActive = accordionItem.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
    if (!isActive) accordionItem.classList.add('active');
}

// 切換全螢幕
function toggleFullscreen() {
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
        
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}

// 處理全螢幕變化
function handleFullscreenChange() {
    isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    const icon = elements.fullscreenBtn.querySelector('i');
    icon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
    elements.fullscreenBtn.title = isFullscreen ? '退出全螢幕' : '切換全螢幕';
}

// 切換主題
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-color-scheme', isDarkTheme ? 'dark' : 'light');
    const icon = elements.themeToggle.querySelector('i');
    icon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
    elements.themeToggle.title = isDarkTheme ? '切換到淺色主題' : '切換到深色主題';
    try {
        document.themeData = { isDarkTheme };
    } catch (error) {
        console.log('無法儲存主題設定:', error.message);
    }
}

// 初始化主題
function initTheme() {
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    try {
        const savedTheme = document.themeData;
        isDarkTheme = (savedTheme && savedTheme.isDarkTheme !== undefined) ? savedTheme.isDarkTheme : systemDarkMode;
    } catch (error) {
        isDarkTheme = systemDarkMode;
    }
    document.documentElement.setAttribute('data-color-scheme', isDarkTheme ? 'dark' : 'light');
    const icon = elements.themeToggle.querySelector('i');
    icon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
    elements.themeToggle.title = isDarkTheme ? '切換到淺色主題' : '切換到深色主題';
}

// 處理鍵盤快捷鍵
function handleKeyboardShortcuts(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        elements.promptForm.dispatchEvent(new Event('submit'));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearForm();
    }
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
}

// 顯示 Toast 通知
function showToast(message, type = 'success') {
    const toast = elements.toast;
    const icon = toast.querySelector('.toast-icon');
    const messageEl = toast.querySelector('.toast-message');
    messageEl.textContent = message;
    toast.className = `toast ${type}`;
    if (type === 'success') icon.className = 'toast-icon fas fa-check-circle';
    else if (type === 'error') icon.className = 'toast-icon fas fa-exclamation-circle';
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// 儲存表單數據
function saveFormData() {
    try {
        const formData = {
            role: elements.roleInput.value,
            task: elements.taskInput.value,
            context: elements.contextInput.value,
            format: elements.formatSelect.value,
            formatCustom: elements.formatCustom.value
        };
        document.formData = formData;
    } catch (error) {
        console.log('無法儲存表單數據:', error.message);
    }
}

// 載入表單數據
function loadFormData() {
    try {
        const savedData = document.formData;
        if (savedData) {
            elements.roleInput.value = savedData.role || '';
            elements.taskInput.value = savedData.task || '';
            elements.contextInput.value = savedData.context || '';
            elements.formatSelect.value = savedData.format || '';
            elements.formatCustom.value = savedData.formatCustom || '';
            if (savedData.format === 'custom') {
                elements.formatCustom.classList.remove('hidden');
            }
            updateWordCount();
        }
    } catch (error) {
        console.log('無法載入表單數據:', error.message);
    }
}

// 清除表單數據
function clearFormData() {
    try {
        delete document.formData;
    } catch (error) {
        console.log('無法清除表單數據:', error.message);
    }
}

// 初始化 Tooltips
function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {}
function hideTooltip(e) {}

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        try {
            const savedTheme = document.themeData;
            if (!savedTheme || savedTheme.isDarkTheme === undefined) {
                isDarkTheme = e.matches;
                document.documentElement.setAttribute('data-color-scheme', isDarkTheme ? 'dark' : 'light');
                const icon = elements.themeToggle.querySelector('i');
                icon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
                elements.themeToggle.title = isDarkTheme ? '切換到淺色主題' : '切換到深色主題';
            }
        } catch (error) {
            console.log('主題變化處理錯誤:', error.message);
        }
    });
}

document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('beforeunload', saveFormData);

window.addEventListener('error', e => {
    console.error('應用程式錯誤:', e.error);
    showToast('應用程式發生錯誤，請重新整理頁面', 'error');
});
window.addEventListener('unhandledrejection', e => {
    console.error('未處理的 Promise 錯誤:', e.reason);
    showToast('操作失敗，請稍後再試', 'error');
});

window.promptGenerator = {
    clearForm,
    saveFormData,
    loadFormData,
    generatePrompt,
    showToast,
    toggleTheme,
    toggleFullscreen,
    examples,
    roleData
};

console.log('Google AI 提示詞產生器已載入');