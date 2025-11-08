class SoraGuideApp {
    constructor() {
        this.isFullscreen = false;
        this.sidebarVisible = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.setupCollapsibleSections();
        this.setupCopyButtons();
        this.handleMobileLayout();
        this.setupPromptGenerator(); // 初始化提示詞產生器
    }

    bindEvents() {
        // Fullscreen toggle
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileSidebar());
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Fullscreen change events
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());

        // Window resize
        window.addEventListener('resize', () => this.handleMobileLayout());

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    enterFullscreen() {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    handleFullscreenChange() {
        this.isFullscreen = !!(document.fullscreenElement || 
                             document.webkitFullscreenElement || 
                             document.mozFullScreenElement || 
                             document.msFullscreenElement);
        
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const btnText = fullscreenBtn?.querySelector('.btn-text');
        
        if (btnText) {
            btnText.textContent = this.isFullscreen ? '退出全螢幕' : '全螢幕';
        }

        // Update icon
        const icon = fullscreenBtn?.querySelector('svg');
        if (icon) {
            if (this.isFullscreen) {
                icon.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>';
            } else {
                icon.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>';
            }
        }
    }

    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        this.sidebarVisible = !this.sidebarVisible;
        sidebar.classList.toggle('visible', this.sidebarVisible);
        
        // Update mobile menu button
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('svg');
            if (this.sidebarVisible) {
                icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
            } else {
                icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        }
    }

    handleOutsideClick(e) {
        if (window.innerWidth <= 768 && this.sidebarVisible) {
            const sidebar = document.getElementById('sidebar');
            const toggleBtn = document.getElementById('mobile-menu-toggle');
            
            if (sidebar && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                this.sidebarVisible = false;
                sidebar.classList.remove('visible');
                
                // Reset button icon
                const icon = toggleBtn.querySelector('svg');
                icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        }
    }

    handleNavigation(e) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Smooth scroll to target
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile sidebar after navigation
            if (window.innerWidth <= 768 && this.sidebarVisible) {
                this.toggleMobileSidebar();
            }
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    
                    // Remove active class from all nav links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to corresponding nav link
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            });
        }, options);

        // Observe all sections
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }

    setupCollapsibleSections() {
        const collapseButtons = document.querySelectorAll('.collapse-btn');
        
        collapseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const section = e.target.closest('.content-section');
                const content = section.querySelector('.section-content');
                const isCollapsed = content.classList.contains('collapsed');
                
                if (isCollapsed) {
                    content.classList.remove('collapsed');
                    button.classList.remove('collapsed');
                    button.setAttribute('aria-label', '摺疊章節');
                } else {
                    content.classList.add('collapsed');
                    button.classList.add('collapsed');
                    button.setAttribute('aria-label', '展開章節');
                }
            });
        });
    }

    setupCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const targetSelector = button.getAttribute('data-clipboard-target');
                const targetElement = document.querySelector(targetSelector) || button.closest('.code-block').querySelector(targetSelector);
                
                if (targetElement) {
                    const text = targetElement.textContent;
                    
                    try {
                        await navigator.clipboard.writeText(text);
                        this.showCopyFeedback(button, '已複製！');
                    } catch (err) {
                        // Fallback for older browsers
                        this.fallbackCopyTextToClipboard(text);
                        this.showCopyFeedback(button, '已複製！');
                    }
                }
            });
        });
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback(button, message) {
        const originalText = button.innerHTML;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}`;
        button.style.color = 'var(--color-success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.color = '';
        }, 2000);
    }

    handleMobileLayout() {
        const content = document.getElementById('main-content');
        const sidebar = document.getElementById('sidebar');
        
        if (window.innerWidth <= 768) {
            content?.classList.add('expanded');
            if (sidebar && this.sidebarVisible) {
                sidebar.classList.add('visible');
            }
        } else {
            content?.classList.remove('expanded');
            sidebar?.classList.remove('visible', 'hidden');
            this.sidebarVisible = false;
            
            // Reset mobile menu button
            const toggleBtn = document.getElementById('mobile-menu-toggle');
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('svg');
                icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        }
    }

    // 提示詞產生器邏輯
    setupPromptGenerator() {
        const fields = {
            style: document.getElementById('prompt-style'),
            description: document.getElementById('prompt-description'),
            camera: document.getElementById('prompt-camera'),
            lens: document.getElementById('prompt-lens'),
            lighting: document.getElementById('prompt-lighting'),
            mood: document.getElementById('prompt-mood'),
            action: document.getElementById('prompt-action'),
            dialogue: document.getElementById('prompt-dialogue'),
            sound: document.getElementById('prompt-sound'),
        };
        const outputElement = document.getElementById('generated-prompt-code');
        const loadExample1Btn = document.getElementById('load-example1-btn');
        const loadExample2Btn = document.getElementById('load-example2-btn');
        const loadExample3Btn = document.getElementById('load-example3-btn');
        const loadExample4Btn = document.getElementById('load-example4-btn');
        const loadExample5Btn = document.getElementById('load-example5-btn');
        const loadExample6Btn = document.getElementById('load-example6-btn');
        const loadExample7Btn = document.getElementById('load-example7-btn');
        const loadExample8Btn = document.getElementById('load-example8-btn');
        const resetBtn = document.getElementById('reset-generator-btn');

        if (!outputElement) return;

        const example1 = {
            style: `手繪2D/3D混合動畫，具有柔和筆刷紋理、溫暖鎢絲燈光和觸覺定格動畫感。美學喚起2000年代中期故事書動畫——舒適、不完美、充滿機械魅力。微妙的水彩洗和繪畫紋理；暖冷平衡分級；電影運動模糊用於動畫真實感。`,
            description: `在一個雜亂的工作室內，架子上溢滿了齒輪、螺栓和泛黃的藍圖。在中心，一個小圓機器人坐在木長凳上，其凹陷的身體用不匹配的板材和舊油漆層修補。它的大發光眼睛閃爍淡藍色，緊張地擺弄著一個嗡嗡響的燈泡。空氣中充滿安靜的機械呼呼聲，雨水拍打在窗戶上，時鐘在背景中穩定滴答。`,
            camera: `中近景，慢推進與來自懸掛工具的溫和視差`,
            lens: `35mm虛擬鏡頭；淺景深以軟化背景雜亂`,
            lighting: `來自頂部實用的溫暖關鍵光；來自窗戶的涼爽溢出形成對比`,
            mood: `溫柔、異想天開，一絲懸疑`,
            action: `- 機器人敲擊燈泡；火花爆裂。\n- 它畏縮，掉落燈泡，眼睛睜大。\n- 燈泡慢動作翻滾；它及時抓住它。\n- 一股蒸汽從其胸部逸出——寬慰和驕傲。`,
            dialogue: `機器人輕聲說："差點丟了它...但我抓住了！"`,
            sound: `雨聲、滴答聲、輕柔機械嗡嗡聲、微弱燈泡嘶嘶聲。`
        };

        const example2 = {
            style: `1970年代浪漫劇，用35mm膠片拍攝，自然光暈、柔焦和溫暖暈光。輕微膠片晃動和手持微震動喚起復古親密感。溫暖柯達風格分級；燈泡上輕微暈光；膠片顆粒和柔和暈影用於時代真實性。`,
            description: `在黃金時刻，磚砌公寓屋頂變成一個小舞台。掛著白床單的晾衣繩在風中搖擺，捕捉最後的陽光。一串不匹配的仙女燈泡在頭頂微弱嗡嗡響。一個穿著飄逸紅絲裙的年輕女子赤腳跳舞，捲髮在漸逝的光線中發光。她的舞伴——袖子捲起，吊帶鬆散——鼓掌，笑容寬闊而毫無防備。下方，城市嗡嗡響著汽車喇叭、地鐵震動和遠方笑聲。`,
            camera: `中廣角鏡頭，從平視緩慢推軌`,
            lens: `40mm球面；淺焦點以將情侶從天際線中分離`,
            lighting: `黃金自然關鍵光與鎢絲反彈；來自仙女燈泡的邊緣`,
            mood: `懷舊、溫柔、電影化`,
            action: `- 她旋轉；她的裙子展開，捕捉陽光。\n- 他步入，抓住她的手，將她浸入陰影中。\n- 床單飄過畫面，短暫遮蔽天際線然後再次分開。`,
            dialogue: `女子（笑）："看？連城市今晚都與我們一起跳舞。"\n男子（微笑）："只因為你領舞。"`,
            sound: `僅自然環境：微弱風聲、織物飄動、街道噪音、悶響音樂。無添加配樂。`
        };
        
        const example3 = {
            style: `科幻黑色電影，賽博龐克美學。高對比度，深陰影，以及大量霓虹燈反射在潮濕的街道上。畫面充滿顆粒感，讓人聯想到80年代的合成器浪潮電影。`,
            description: `在一個反烏托邦的未來城市，雨水不斷。一個穿著風衣的偵探站在一個狹窄的小巷裡，臉被一個閃爍的全息廣告牌照亮。飛行汽車在他頭頂呼嘯而過，留下光軌。`,
            camera: `低角度仰拍，強調城市的壓迫感`,
            lens: `廣角24mm鏡頭，邊緣有輕微畸變`,
            lighting: `刺眼的霓虹燈作為主光，幾乎沒有補光`,
            mood: `神秘、陰鬱、疏離`,
            action: `- 偵探點燃一支電子菸，煙霧在霓虹燈下繚繞。\n- 他抬頭看著一架警用無人機飛過。\n- 從口袋裡拿出一個數據晶片，對著光檢查。`,
            dialogue: ``,
            sound: `持續的雨聲、遠處的警笛、飛行汽車的嗡嗡聲。`
        };

        const example4 = {
            style: `BBC自然紀錄片風格，極致清晰的8K畫質。色彩鮮豔飽滿，所有細節都銳利可見。使用高速攝影機捕捉慢動作。`,
            description: `在非洲大草原上，一隻獵豹在金色晨光中悄悄潛行，穿過高高的草叢。牠的肌肉在每一次移動中都清晰可見，目光專注於遠處的一群羚羊。`,
            camera: `地面高度的長焦跟蹤鏡頭，與獵豹平行移動`,
            lens: `600mm超長焦鏡頭，背景極度壓縮和模糊`,
            lighting: `清晨的柔和自然光，創造出溫暖的光暈`,
            mood: `緊張、原始、雄偉`,
            action: `- 獵豹壓低身體，幾乎與地面融為一體。\n- 牠的尾巴輕微抽動，顯示出緊張感。\n- 突然，牠以爆炸性的速度衝出，草屑四濺（慢動作）。`,
            dialogue: ``,
            sound: `草的沙沙聲、昆蟲的鳴叫、獵豹輕微的呼吸聲，以及突然的寂靜。`
        };
        
        const example5 = {
            style: `奇幻史詩電影，具有廣闊的IMAX規模感。色彩分級偏向飽和的藍色和金色。視覺效果融合了實景拍攝和CG，創造出宏偉的景觀。`,
            description: `一位身披銀色盔甲的孤獨騎士站在懸崖邊緣，俯瞰著一個被雲海環繞的浮空城堡。巨大的瀑布從浮島上傾瀉而下，形成彩虹。兩隻巨龍在遠處的天空中盤旋。`,
            camera: `極廣角建立鏡頭，緩慢向前推進，增加史詩感`,
            lens: `18mm廣角鏡頭，景深極大`,
            lighting: `戲劇性的神聖光芒從雲層縫隙中射出，照亮騎士和城堡`,
            mood: `敬畏、史詩、孤獨`,
            action: `- 騎士的披風在風中劇烈飄揚。\n- 他舉起手中的劍，劍刃反射出城堡的光芒。\n- 其中一隻巨龍發出長嘯，聲音在山谷中迴盪。`,
            dialogue: ``,
            sound: `風的呼嘯聲、遠處瀑布的轟鳴、巨龍的吼叫。`
        };

        const example6 = {
            style: `第一人稱視角的拾得錄影（Found Footage）恐怖片。畫面不穩定，有明顯的數位噪點和失真。使用夜視模式，所有東西都呈現詭異的綠色調。`,
            description: `透過手持攝影機的視角，主角正在探索一座廢棄的瘋人院。手電筒的光束在黑暗、剝落的走廊上 frantic 地移動，照亮了生鏽的輪椅和倒塌的家具。`,
            camera: `手持，模擬主角的呼吸和驚慌的動作`,
            lens: `智慧型手機或消費級攝影機的鏡頭質感`,
            lighting: `唯一的光源是主角手中不穩定的手電筒和攝影機的夜視功能`,
            mood: `幽閉、恐懼、身臨其境`,
            action: `- 攝影機快速轉向一個聲音的來源，但什麼也沒看到。\n- 前方一扇門突然自行關上。\n- 主角發出驚恐的喘息，鏡頭劇烈晃動，然後對準自己的臉，眼睛裡充滿恐懼。`,
            dialogue: `主角（喘息）："有人嗎？...這不好笑！"`,
            sound: `主角沉重的呼吸聲、腳步在碎石上的聲音、遠處無法辨識的低語和刮擦聲。`
        };
        
        const example7 = {
            style: `美食烹飪影片，色彩溫暖誘人。特寫鏡頭，質地豐富，景深極淺。燈光明亮柔和，突顯食物的新鮮感。`,
            description: `在一個鄉村風格的廚房裡，一雙手正在揉捏麵團。麵粉輕輕灑在木製檯面上。背景是新鮮的香草和銅製鍋具。`,
            camera: `頂視角（Top-down）和45度角的特寫鏡頭之間切換`,
            lens: `100mm微距鏡頭，捕捉麵粉的顆粒和麵團的紋理`,
            lighting: `柔和的窗光，輔以溫暖的補光`,
            mood: `舒適、溫馨、令人垂涎`,
            action: `- 麵團被熟練地折疊和按壓。\n- 慢動作鏡頭：巧克力醬被緩緩淋在剛出爐的麵包上。\n- 一小塊奶油在溫熱的麵包上融化。`,
            dialogue: ``,
            sound: `揉麵的聲音、烤箱的輕微嗡嗡聲、巧克力醬流動的聲音（ASMR）。`
        };

        const example8 = {
            style: `Lofi / Vaporwave 美學，使用 4:3 的畫面比例。畫面柔和，有VHS錄影帶的掃描線和色彩溢出效果。色調以粉彩、紫色和青色為主。`,
            description: `夜晚的東京街頭，但空無一人。路燈和廣告牌的霓虹燈光在濕潤的路面上反射出模糊的光暈。一輛80年代的日本跑車靜靜地停在路邊。`,
            camera: `固定的三腳架鏡頭，偶爾有輕微的平移`,
            lens: `老式鏡頭的質感，帶有光暈和色差`,
            lighting: `完全依賴環境中的霓虹燈和路燈`,
            mood: `懷舊、夢幻、憂鬱`,
            action: `- 畫面中的假名（日文）廣告牌在緩慢地閃爍。\n- 蒸汽從下水道井蓋中升起。\n- 車頭燈突然亮起，照亮了飄落的櫻花瓣。`,
            dialogue: ``,
            sound: `輕柔的Lofi Hip Hop背景音樂，混合著微弱的城市環境音和VHS的嘶嘶聲。`
        };


        const updateGeneratedPrompt = () => {
            const parts = [];
            const styleValue = fields.style.value.trim();
            if (styleValue) parts.push(`風格: ${styleValue}`);
            
            const descriptionValue = fields.description.value.trim();
            if (descriptionValue) parts.push(descriptionValue);

            const photographyParts = [];
            if (fields.camera.value.trim()) photographyParts.push(`攝影機: ${fields.camera.value.trim()}`);
            if (fields.lens.value.trim()) photographyParts.push(`鏡頭: ${fields.lens.value.trim()}`);
            if (fields.lighting.value.trim()) photographyParts.push(`光線: ${fields.lighting.value.trim()}`);
            if (fields.mood.value.trim()) photographyParts.push(`情緒: ${fields.mood.value.trim()}`);

            if (photographyParts.length > 0) {
                parts.push("攝影:\n" + photographyParts.join("\n"));
            }

            if (fields.action.value.trim()) {
                parts.push("動作:\n" + fields.action.value.trim());
            }

            if (fields.dialogue.value.trim()) {
                parts.push("對話:\n" + fields.dialogue.value.trim());
            }

            if (fields.sound.value.trim()) {
                parts.push("背景聲音:\n" + fields.sound.value.trim());
            }

            if (parts.length === 0) {
                outputElement.textContent = "請在上方欄位輸入內容以產生提示詞...";
                outputElement.style.color = 'var(--color-text-secondary)';
            } else {
                outputElement.textContent = parts.join('\n\n');
                outputElement.style.color = '';
            }

            if (window.Prism) {
                Prism.highlightElement(outputElement);
            }
        };

        const loadExample = (example) => {
            Object.keys(example).forEach(key => {
                if (fields[key]) {
                    fields[key].value = example[key];
                }
            });
            updateGeneratedPrompt();
        };

        const resetGenerator = () => {
            Object.values(fields).forEach(field => field.value = '');
            updateGeneratedPrompt();
        };

        Object.values(fields).forEach(field => {
            field.addEventListener('input', updateGeneratedPrompt);
        });

        loadExample1Btn.addEventListener('click', () => loadExample(example1));
        loadExample2Btn.addEventListener('click', () => loadExample(example2));
        loadExample3Btn.addEventListener('click', () => loadExample(example3));
        loadExample4Btn.addEventListener('click', () => loadExample(example4));
        loadExample5Btn.addEventListener('click', () => loadExample(example5));
        loadExample6Btn.addEventListener('click', () => loadExample(example6));
        loadExample7Btn.addEventListener('click', () => loadExample(example7));
        loadExample8Btn.addEventListener('click', () => loadExample(example8));
        resetBtn.addEventListener('click', resetGenerator);

        updateGeneratedPrompt();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SoraGuideApp();
});