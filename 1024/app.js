// 應用程式資料
const appData = {
  version: '1.0.0',
  
  chapters: [
    {
      id: 1,
      title: '投資決策的起點',
      subtitle: '為什麼要重視財務報表',
      sections: [
        {
          title: '先看財報',
          content: '投資前必審財報，掌握企業真實資產、負債與獲利狀況。財報不僅反映過去績效，更是預測未來價值創造能力的關鍵依據。',
          highlight: '財報是投資決策的基礎'
        },
        {
          title: '財报非絕對真實',
          content: '財務報表可能經會計調整美化，甚至隱藏造假風險，需保持警覺。Beneish M-Score可量化評估財報造假可能性，輔助投資判斷。',
          highlight: '需提升防弊意識'
        },
        {
          title: '三大財務報表',
          content: '資產負債表（看財務健康）、損益表（看獲利能力）、現金流量表（看現金管理）構成企業財務全景。',
          highlight: '了解三大報表是基礎'
        }
      ]
    },
    {
      id: 2,
      title: '三大財務報表解析',
      subtitle: '與實務應用',
      tables: [
        {
          name: '資產負債表',
          color: '#52B788',
          icon: '💼',
          items: [
            { label: '資產', desc: '公司擁有的東西（流動資產、非流動資產）' },
            { label: '負債', desc: '公司欠人的錢（流動負債、非流動負債）' },
            { label: '股東權益', desc: '資產-負債（股本、保留盈餘）' }
          ],
          purpose: '評估企業資產結構、償債能力與股東權益穩健度'
        },
        {
          name: '損益表',
          color: '#C4885F',
          icon: '📊',
          items: [
            { label: '營收', desc: '公司收入' },
            { label: '毛利', desc: '營收-銷貨成本' },
            { label: '營業利益', desc: '毛利-營運費用' },
            { label: '淨利', desc: '營業利益-稅金、利息' },
            { label: 'EPS', desc: '每股盈餘（投資價值指標）' }
          ],
          purpose: '剖析營收成長動能、毛利率變動與淨利獲利品質'
        },
        {
          name: '現金流量表',
          color: '#2C3E50',
          icon: '💰',
          items: [
            { label: '營運現金流', desc: '公司主要業務的現金流' },
            { label: '投資現金流', desc: '購買/出售資產的現金流' },
            { label: '融資現金流', desc: '借貸、發行股票、股利支出' },
            { label: '自由現金流', desc: '營運現金流-資本支出' }
          ],
          purpose: '洞察營運現金流品質與自由現金流的持續創造能力'
        }
      ]
    },
    {
      id: 3,
      title: 'Beneish M-Score偵測',
      subtitle: '財報造假風險評估',
      riskLevels: [
        {
          level: '低風險',
          mValue: 'M值 < -2',
          description: '財報造假機率極低，公司誠實度高，具備高可信度',
          color: '#52B788',
          icon: '✅'
        },
        {
          level: '中等風險',
          mValue: 'M值 -2 ~ -1.78',
          description: '企業可能進行財務美化或盈餘管理，需要進一步關注會計政策變動',
          color: '#F4A261',
          icon: '⚠️'
        },
        {
          level: '高風險',
          mValue: 'M值 > -1.78',
          description: '高度財報造假風險，應提高警覺，深入查核會計政策與變動原因',
          color: '#C1442D',
          icon: '🚨'
        }
      ],
      warnings: [
        '檢視應收帳款、存貨或折舊政策異常調整跡象',
        '比對損益與現金流趨勢，確認盈餘品質真實性',
        '結合現金流、營運能力等指標綜合評估'
      ]
    },
    {
      id: 4,
      title: 'ROE與ROIC對比分析',
      subtitle: '衡量賺錢效率的核心指標',
      comparison: [
        {
          metric: 'ROE（股東權益報酬率）',
          definition: '淨利 / 股東權益',
          meaning: '代表股東資本的回報效率',
          benchmark: '≥ 15% 代表投資效率好',
          pros: ['易於理解', '便於比較同行業公司', '常用投資指標'],
          cons: ['易受財務槓桿影響', '可能失真', '不反映整體資本效率'],
          color: '#52B788'
        },
        {
          metric: 'ROIC（投入資本報酬率）',
          definition: '稅後營業利潤 / 投入資本',
          meaning: '衡量公司對全部投入資本的回報率',
          benchmark: '10%～15% 或穩定代表投資效率好',
          pros: ['排除槓桿干擾', '視角全面', '反映真實能力'],
          cons: ['計算複雜', '需要更多數據', '初學者難理解'],
          color: '#C4885F'
        }
      ],
      keyInsight: '當ROIC > WACC且ROE穩定，代表公司具備可持續競爭優勢'
    },
    {
      id: 5,
      title: '長期價值投資的六大標準',
      subtitle: '財務篩選條件',
      standards: [
        {
          title: 'EPS 獲利能力 - 10年穩定持續成長',
          description: '每股盈餘(EPS)是衡量公司為每股股東創造多少淨利潤的指標。',
          detail: '連續10年的穩定增長，代表公司具備持續的獲利能力與穩健的經營模式。',
          icon: '📈',
          importance: '獲利能力的持續性'
        },
        {
          title: 'Dividend 股息 - 10年穩定發配息',
          description: '持續且穩定地發放股息，代表公司擁有健康的現金流與對股東負責的態度。',
          detail: '這不僅是回饋股東的方式，更是對公司長期營運穩健的信心展現。',
          icon: '💵',
          importance: '盈餘品質與現金流的證明'
        },
        {
          title: 'Free Cash Flow - 10年皆為正數',
          description: '自由現金流是企業在滿足營運和資本支出後，真正可以自由運用的現金。',
          detail: '連續10年為正數，表明企業核心業務「造血」能力強，無需依賴外部融資。',
          icon: '💎',
          importance: '企業真實的內在價值'
        },
        {
          title: 'ROIC 賺錢效率 - 10年每年大於10%～15%',
          description: '投入資本回報率(ROIC)衡量公司利用所有資本創造利潤的效率，不受財務槓桿影響。',
          detail: '長期高於10%-15%，意味著公司能持續創造超越其資本成本的價值，擁有強大護城河。',
          icon: '⚡',
          importance: '真實的價值創造能力'
        },
        {
            title: 'Interest Coverage - 大於4，大於10最好',
            description: '利息保障倍數衡量公司支付利息的能力，是評估償債風險的關鍵指標。',
            detail: '倍數大於4表示穩健，大於10則極為安全，代表公司財務結構健康，幾乎沒有債務風險。',
            icon: '🛡️',
            importance: '財務結構的穩健度'
        },
        {
            title: '淨利率(Net Margin) - 大於10%，大於20%最好',
            description: '淨利率反映企業每一元的營收中，能賺取多少淨利潤。',
            detail: '長期維持高淨利率（>10%，甚至20%）代表公司擁有強大的定價能力或成本控制優勢。',
            icon: '🎯',
            importance: '核心競爭力與定價權'
        }
      ]
    },
    {
      id: 6,
      title: '綜合判斷與投資實踐',
      subtitle: '最佳實踐建議',
      practices: [
        {
          title: '勿迷信單一指標',
          points: [
            'ROE、EPS等單一數字無法全面反映企業真實價值',
            '需結合質化與量化指標進行評估',
            '整合損益表、資產負債表與現金流量表數據'
          ]
        },
        {
          title: 'ROE波動背後的原因',
          points: [
            '檢查ROE變動的原因（獲利波動或股東權益變動）',
            '檢視ROIC是否穩定（反映本質經營能力）',
            '觀察長期趨勢而非短期波動'
          ]
        },
        {
          title: '堅持長期觀察',
          points: [
            '單季或年度數據易波動，觀察5至10年趨勢',
            '區分暫時變動和會計調整',
            '聚焦本質能力（營運現金流、ROIC、自由現金流）'
          ]
        },
        {
          title: '投資決策檢查清單',
          points: [
            '✓ 查看三大財務報表完整數據',
            '✓ 檢視M-Score評估造假風險',
            '✓ 對比ROE與ROIC判斷真實能力',
            '✓ 驗證六大篩選標準',
            '✓ 分析長期趨勢而非單年表現'
          ],
          isChecklist: true
        }
      ]
    }
  ],
  
  navigationItems: [
    { label: '第1章：投資決策', chapter: 1 },
    { label: '第2章：三大財務報表', chapter: 2 },
    { label: '第3章：造假風險檢測', chapter: 3 },
    { label: '第4章：ROE與ROIC', chapter: 4 },
    { label: '第5章：六大篩選標準', chapter: 5 },
    { label: '第6章：投資實踐', chapter: 6 }
  ]
};

// 應用程式狀態
let appState = {
  currentChapter: 1,
  isSidebarCollapsed: false
};

// 初始化應用程式
function initApp() {
  renderNavigation();
  renderSidebar();
  renderChapter(1);
  setupEventListeners();
}

// 渲染導航
function renderNavigation() {
  const navCenter = document.getElementById('navCenter');
  navCenter.innerHTML = appData.navigationItems.map(item => `
    <button class="nav-btn" onclick="navigateToChapter(${item.chapter})" data-chapter="${item.chapter}">
      ${item.label}
    </button>
  `).join('');
  updateActiveNav();
}

// 渲染側邊欄
function renderSidebar() {
  const sidebarNav = document.getElementById('sidebarNav');
  sidebarNav.innerHTML = appData.navigationItems.map(item => `
    <button class="sidebar-item" onclick="navigateToChapter(${item.chapter})" data-chapter="${item.chapter}">
      ${item.label}
    </button>
  `).join('');
  updateActiveSidebar();
}

// 更新活動導航
function updateActiveNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const chapter = parseInt(btn.dataset.chapter);
    if (chapter === appState.currentChapter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 更新活動側邊欄
function updateActiveSidebar() {
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    const chapter = parseInt(btn.dataset.chapter);
    if (chapter === appState.currentChapter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 導航到章節
function navigateToChapter(chapterId) {
  appState.currentChapter = chapterId;
  renderChapter(chapterId);
  updateActiveNav();
  updateActiveSidebar();
  
  // 在手機上自動收起側邊欄
  if (window.innerWidth <= 1024) {
    appState.isSidebarCollapsed = true;
    updateSidebarState();
  }
  
  // 滾動到頂部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 渲染章節
function renderChapter(chapterId) {
  const chapter = appData.chapters.find(c => c.id === chapterId);
  if (!chapter) return;
  
  const mainContent = document.getElementById('mainContent');
  
  let html = `
    <div class="chapter">
      <div class="chapter-header">
        <h2 class="chapter-title">${chapter.title}</h2>
        <p class="chapter-subtitle">${chapter.subtitle}</p>
      </div>
  `;
  
  // 根據章節類型渲染內容
  if (chapter.id === 1) {
    html += renderChapter1(chapter);
  } else if (chapter.id === 2) {
    html += renderChapter2(chapter);
  } else if (chapter.id === 3) {
    html += renderChapter3(chapter);
  } else if (chapter.id === 4) {
    html += renderChapter4(chapter);
  } else if (chapter.id === 5) {
    html += renderChapter5(chapter);
  } else if (chapter.id === 6) {
    html += renderChapter6(chapter);
  }
  
  html += '</div>';
  mainContent.innerHTML = html;
}

// 渲染第1章
function renderChapter1(chapter) {
  return `
    <div class="card-grid">
      ${chapter.sections.map(section => `
        <div class="card">
          <h3 class="card-title">${section.title}</h3>
          <p class="card-content">${section.content}</p>
          <div class="card-highlight">${section.highlight}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 渲染第2章
function renderChapter2(chapter) {
  return chapter.tables.map(table => `
    <div class="table-card">
      <div class="table-card-header" style="border-color: ${table.color};">
        <div class="card-icon">${table.icon}</div>
        <h3 class="table-card-title" style="color: ${table.color};">${table.name}</h3>
      </div>
      <div class="table-card-items">
        ${table.items.map(item => `
          <div class="table-item">
            <div class="table-item-label">${item.label}</div>
            <div class="table-item-desc">${item.desc}</div>
          </div>
        `).join('')}
      </div>
      <div class="table-card-purpose">
        <strong>應用：</strong>${table.purpose}
      </div>
    </div>
  `).join('');
}

// 渲染第3章
function renderChapter3(chapter) {
  let html = chapter.riskLevels.map(risk => `
    <div class="risk-card" style="border-color: ${risk.color};">
      <div class="risk-header">
        <div class="risk-level" style="color: ${risk.color};">${risk.level}</div>
        <div class="risk-icon">${risk.icon}</div>
      </div>
      <div class="risk-mvalue" style="color: ${risk.color};">${risk.mValue}</div>
      <p class="risk-description">${risk.description}</p>
    </div>
  `).join('');
  
  html += `
    <div class="warning-section">
      <h3 class="warning-title">⚠️ 投資警示提醒</h3>
      <ul class="warning-list">
        ${chapter.warnings.map(warning => `<li>${warning}</li>`).join('')}
      </ul>
    </div>
  `;
  
  return html;
}

// 渲染第4章
function renderChapter4(chapter) {
  let html = `
    <div class="comparison-grid">
      ${chapter.comparison.map(item => `
        <div class="comparison-card" style="border-color: ${item.color};">
          <h3 class="comparison-metric" style="color: ${item.color};">${item.metric}</h3>
          
          <div class="comparison-item">
            <div class="comparison-label">計算公式</div>
            <div class="comparison-value">${item.definition}</div>
          </div>
          
          <div class="comparison-item">
            <div class="comparison-label">意義</div>
            <div class="comparison-value">${item.meaning}</div>
          </div>
          
          <div class="comparison-item">
            <div class="comparison-label">評估標準</div>
            <div class="comparison-value">${item.benchmark}</div>
          </div>
          
          <div class="comparison-item">
            <div class="comparison-label">優點</div>
            <ul class="comparison-list pros">
              ${item.pros.map(pro => `<li>${pro}</li>`).join('')}
            </ul>
          </div>
          
          <div class="comparison-item">
            <div class="comparison-label">缺點</div>
            <ul class="comparison-list cons">
              ${item.cons.map(con => `<li>${con}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  html += `
    <div class="key-insight">
      <h3 class="key-insight-title">💡 關鍵洞察</h3>
      <p class="key-insight-text">${chapter.keyInsight}</p>
    </div>
  `;
  
  return html;
}

// 渲染第5章
function renderChapter5(chapter) {
  return `
    <div class="standards-grid">
      ${chapter.standards.map(standard => `
        <div class="standard-card">
          <div class="standard-icon">${standard.icon}</div>
          <h3 class="standard-title">${standard.title}</h3>
          <p class="standard-description">${standard.description}</p>
          <p class="standard-detail">${standard.detail}</p>
          <div class="standard-importance">
            <strong>重要性：</strong>${standard.importance}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 渲染第6章
function renderChapter6(chapter) {
  return chapter.practices.map(practice => `
    <div class="practice-section">
      <div class="practice-card">
        <h3 class="practice-title">${practice.title}</h3>
        <ul class="practice-points ${practice.isChecklist ? 'checklist-points' : ''}">
          ${practice.points.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// 設定事件監聽器
function setupEventListeners() {
  // 選單切換
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', toggleSidebar);
  
  // 全螢幕切換
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  
  // 監聽視窗大小變化
  window.addEventListener('resize', handleResize);
}

// 切換側邊欄
function toggleSidebar() {
  appState.isSidebarCollapsed = !appState.isSidebarCollapsed;
  updateSidebarState();
}

// 更新側邊欄狀態
function updateSidebarState() {
  const sidebar = document.getElementById('sidebar');
  if (appState.isSidebarCollapsed) {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }
}

// 切換全螢幕
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('無法進入全螢幕模式:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// 處理視窗大小變化
function handleResize() {
  if (window.innerWidth > 1024) {
    appState.isSidebarCollapsed = false;
    updateSidebarState();
  }
}

// 當 DOM 載入完成後初始化應用程式
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}