// Loading Screen Control

// ロード完了時、ローディング画面の当たり判定を即無効化→その後アニメで消す
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  let counterStarted = false;
  
  function startSalesCounter() {
    if (!counterStarted) {
      counterStarted = true;
      initSalesCounterAnimation();
    }
  }
  
  if (loadingScreen) {
    loadingScreen.style.pointerEvents = 'none';
    
    // カウントアップをローディング開始と同時に即座に開始
    startSalesCounter();
    
    setTimeout(() => {
      loadingScreen.classList.add('slide-up');
      loadingScreen.addEventListener('animationend', () => {
        loadingScreen.remove();
        // カウントアップは既に開始済み
        
        // フローティングボタンとぼかし帯を表示（カウントアップより後に）
        setTimeout(() => {
          const floatingButton = document.querySelector('.floating-button');
          const floatingBlur = document.querySelector('.floating-blur');
          if (floatingButton) {
            floatingButton.style.display = 'block';
          }
          if (floatingBlur) {
            floatingBlur.style.display = 'block';
          }
        }, 1500);
      }, { once: true });
      
      // フォールバック: アニメーションイベントが発火しない場合
      setTimeout(() => {
        if (!counterStarted) {
          startSalesCounter();
        }
        // フローティングボタンとぼかし帯のフォールバック表示
        setTimeout(() => {
          const floatingButton = document.querySelector('.floating-button');
          const floatingBlur = document.querySelector('.floating-blur');
          if (floatingButton) {
            floatingButton.style.display = 'block';
          }
          if (floatingBlur) {
            floatingBlur.style.display = 'block';
          }
        }, 1500);
      }, 3000);
    }, 1200);
  } else {
    // ローディング画面が存在しない場合のフォールバック
    startSalesCounter();
    // フローティングボタンとぼかし帯を表示
    setTimeout(() => {
      const floatingButton = document.querySelector('.floating-button');
      const floatingBlur = document.querySelector('.floating-blur');
      if (floatingButton) {
        floatingButton.style.display = 'block';
      }
      if (floatingBlur) {
        floatingBlur.style.display = 'block';
      }
    }, 1500);
  }

  // 念のため、もしモーダルが開いたままなら閉じる（誤表示のブロック対策）
  document.querySelectorAll('.modal, .image-modal').forEach(m => {
    if (getComputedStyle(m).display !== 'none') m.style.display = 'none';
  });
  document.body.style.overflow = 'auto';
});

// Profile Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initProfileAnimations();
    initLoveTags();
    initScrollAnimations();
    initMaslow();
    initTocLinks();
    // initHearingCircleAnimation();
    // initAnalysisCircleAnimation();
    // initLearningCircleAnimation();
    initStrengthsTitleAnimation();
    initFlowTitleAnimation();
    initFaqTitleAnimation();
    //initContactTitleAnimation();

    // Profile Section Animations
    function initProfileAnimations() {
        // Stagger animation for profile content
        const profileElements = document.querySelectorAll('.profile-left > *, .profile-right > *');
        profileElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Love Tags Interactive Effects
    function initLoveTags() {
        const loveTags = document.querySelectorAll('.love-tag');
        
        loveTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Create floating hearts animation
                createFloatingHearts(this);
                
                // Add pulse effect
                this.style.animation = 'pulse 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
    }
    
    // Create floating hearts animation
    function createFloatingHearts(element) {
        const hearts = ['💙', '💜', '🩵', '💫', '✨'];
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 1000;
                animation: floatUp 2s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
    }
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animation for achievement cards
                    if (entry.target.classList.contains('achievement-card')) {
                        animateNumber(entry.target);
                    }
                    
                    // Trigger underline animation for profile section
                    if (entry.target.id === 'profile') {
                        const underlineElement = document.querySelector('.underline-animation');
                        if (underlineElement) {
                            setTimeout(() => {
                                underlineElement.classList.add('animate-underline');
                            }, 1500);
                        }
                    }
                    
                    
                    
                    
                }
            });
        }, observerOptions);
        
        // Observe elements including handwritten name, profile section, skills section, and TOC section
        const elementsToAnimate = document.querySelectorAll('.skill-category, .achievement-card, .handwritten-name, #profile, #skills, .toc-section, .career-item');
        elementsToAnimate.forEach(el => observer.observe(el));
        
        // ヒアリング力セクションのアニメーション監視
        const hearingPowerSection = document.querySelector('.hearing-power-section');
        if (hearingPowerSection) {
            observer.observe(hearingPowerSection);
        }
        
        // 分析力セクションのアニメーション監視
        const analysisPowerSection = document.querySelector('.analysis-power-section');
        if (analysisPowerSection) {
            observer.observe(analysisPowerSection);
        }
        
        // 学び続ける姿勢セクションのアニメーション監視
        const learningPowerSection = document.querySelector('.learning-power-section');
        if (learningPowerSection) {
            observer.observe(learningPowerSection);
        }
        
        // Skills section specific observer for staggered animations
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.id === 'skills') {
                    animateSkillsSection();
                }
            });
        }, { threshold: 0.2 });
        
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
        
        // Career items scroll-based fade in animation (without background filter)
        const careerSection = document.getElementById('career');
        
        function updateCareerItems() {
            if (!careerSection) return;
            
            const windowHeight = window.innerHeight;
            
            // Career items scroll-based fade in animation
            const careerItems = careerSection.querySelectorAll('.career-item');
            careerItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemVisibility = Math.max(0, Math.min(1,
                    (windowHeight - itemRect.top + 100) / (windowHeight * 0.5)
                ));
                
                // Apply opacity and transform based on scroll progress
                item.style.opacity = itemVisibility;
                item.style.transform = `translateY(${30 * (1 - itemVisibility)}px)`;
            });
        }
        
        // TOC/Index section scroll-based staggered animation
        const tocSection = document.querySelector('.toc-section');
        
        function updateTocAnimation() {
            if (!tocSection) return;
            
            const rect = tocSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // More generous scroll progress calculation to ensure completion
            const scrollProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top + 200) / (windowHeight * 0.8)
            ));
            
            // Animate main TOC items (01プロフィール, 02サービス, 03実績, 04依頼の流れ, 05よくある質問, 06お問い合わせ) sequentially
            const mainTocItems = tocSection.querySelectorAll('.toc-item');
            mainTocItems.forEach((item, index) => {
                const delay = index * 0.12; // Slightly reduced delay to accommodate more items
                const itemProgress = Math.max(0, Math.min(1, 
                    scrollProgress >= delay ? (scrollProgress - delay) / (1 - delay) : 0
                ));
                
                item.style.opacity = itemProgress;
                item.style.transform = `translateX(${-60 * (1 - itemProgress)}px)`;
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            // Animate work items (実績の各項目) sequentially after main items
            const workItems = tocSection.querySelectorAll('.toc-work-item');
            workItems.forEach((item, index) => {
                const delay = 0.45 + (index * 0.1); // Earlier start with smaller delays
                const itemProgress = Math.max(0, Math.min(1, 
                    scrollProgress >= delay ? (scrollProgress - delay) / (1 - delay) : 0
                ));
                
                item.style.opacity = itemProgress;
                item.style.transform = `translateX(${-60 * (1 - itemProgress)}px)`;
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }
        
        // Add scroll listener for career items and TOC animation
        window.addEventListener('scroll', updateCareerItems, { passive: true });
        window.addEventListener('scroll', updateTocAnimation, { passive: true });
        updateCareerItems(); // Initial call
        updateTocAnimation(); // Initial call
        
        // Profile title scroll-based animation
        const profileSection = document.getElementById('profile');
        const profileTitle = profileSection?.querySelector('.profile-hero-title');
        
        if (profileSection && profileTitle) {
            const firstLine = profileTitle.querySelector('.title-line:first-child');
            const lastLine = profileTitle.querySelector('.title-line:last-child');
            
            function updateProfileTitlePosition() {
                const rect = profileSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Calculate scroll progress (0 to 1)
                // Balanced calculation - visible animation but reaches center in time
                const rawProgress = Math.max(0, Math.min(1, 
                    (windowHeight - rect.top) / (windowHeight * 1.0)
                ));
                
                // Apply gentle easing for smooth but visible animation
                const scrollProgress = Math.sqrt(rawProgress); // Square root easing for gradual acceleration
                
                // Calculate positions based on scroll progress
                // Start: 30% away, End: 0% (center)
                const firstLineOffset = 30 * (1 - scrollProgress);
                const lastLineOffset = -30 * (1 - scrollProgress);
                
                // Apply smooth transforms without text alignment changes
                if (firstLine) {
                    firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                    firstLine.style.textAlign = 'center'; // Keep consistent alignment
                }
                if (lastLine) {
                    lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                    lastLine.style.textAlign = 'center'; // Keep consistent alignment
                }
            }
            
            // Add scroll listener
            window.addEventListener('scroll', updateProfileTitlePosition, { passive: true });
            
            // Initial call
            updateProfileTitlePosition();
        }
        
        // Service title scroll-based animation (same as profile)
        const serviceSection = document.getElementById('service');
        const serviceTitle = serviceSection?.querySelector('.service-hero-title');
        
        if (serviceSection && serviceTitle) {
            const firstLine = serviceTitle.querySelector('.title-line:first-child');
            const lastLine = serviceTitle.querySelector('.title-line:last-child');
            
            function updateServiceTitlePosition() {
                const rect = serviceSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Calculate scroll progress (0 to 1)
                const rawProgress = Math.max(0, Math.min(1, 
                    (windowHeight - rect.top) / (windowHeight * 1.0)
                ));
                
                // Apply gentle easing for smooth but visible animation
                const scrollProgress = Math.sqrt(rawProgress); // Square root easing for gradual acceleration
                
                // Calculate positions based on scroll progress
                const firstLineOffset = 30 * (1 - scrollProgress);
                const lastLineOffset = -30 * (1 - scrollProgress);
                
                // Apply smooth transforms without text alignment changes
                if (firstLine) {
                    firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                    firstLine.style.textAlign = 'center'; // Keep consistent alignment
                }
                if (lastLine) {
                    lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                    lastLine.style.textAlign = 'center'; // Keep consistent alignment
                }
            }
            
            // Add scroll listener
            window.addEventListener('scroll', updateServiceTitlePosition, { passive: true });
            
            // Initial call
            updateServiceTitlePosition();
        }
        
        // Works title scroll-based animation (same as profile and service)
        const worksSection = document.getElementById('works');
        const worksTitle = worksSection?.querySelector('.works-hero-title');
        
        if (worksSection && worksTitle) {
            const firstLine = worksTitle.querySelector('.title-line:first-child');
            const lastLine = worksTitle.querySelector('.title-line:last-child');
            
            function updateWorksTitlePosition() {
                const rect = worksSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Calculate scroll progress (0 to 1)
                const rawProgress = Math.max(0, Math.min(1, 
                    (windowHeight - rect.top) / (windowHeight * 1.0)
                ));
                
                // Apply gentle easing for smooth but visible animation
                const scrollProgress = Math.sqrt(rawProgress);
                
                // Calculate positions based on scroll progress
                const firstLineOffset = 30 * (1 - scrollProgress);
                const lastLineOffset = -30 * (1 - scrollProgress);
                
                // Apply smooth transforms without text alignment changes
                if (firstLine) {
                    firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                    firstLine.style.textAlign = 'center'; // Keep consistent alignment
                }
                if (lastLine) {
                    lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                    lastLine.style.textAlign = 'center'; // Keep consistent alignment
                }
            }
            
            // Add scroll listener
            window.addEventListener('scroll', updateWorksTitlePosition, { passive: true });
            
            // Initial call
            updateWorksTitlePosition();
        }
    }
    
    // Animate numbers in achievement cards
    function animateNumber(card) {
        const numberElement = card.querySelector('.achievement-number');
        if (!numberElement) return;
        
        const finalNumber = numberElement.textContent;
        const isYen = finalNumber.includes('万円');
        const hasScale = finalNumber.includes('万円規模');
        
        let targetValue;
        if (isYen) {
            if (hasScale) {
                targetValue = 1000; // 1,000万円規模
            } else {
                targetValue = 300; // 300万円
            }
        } else {
            targetValue = parseInt(finalNumber.replace(/[^\d]/g, '')) || 100;
        }
        
        let currentValue = 0;
        const increment = targetValue / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const frameTime = duration / 60;
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            if (isYen) {
                if (hasScale) {
                    numberElement.textContent = `${Math.floor(currentValue)}万円規模`;
                } else {
                    numberElement.textContent = `${Math.floor(currentValue)}万円`;
                }
            } else {
                numberElement.textContent = Math.floor(currentValue).toString();
            }
        }, frameTime);
    }
    
    
    // Add CSS for scroll animations
    const scrollAnimationStyle = document.createElement('style');
    scrollAnimationStyle.textContent = `
        .skill-category,
        .achievement-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-category.animate-in,
        .achievement-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .profile-left,
        .profile-right {
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(scrollAnimationStyle);
    
    
    // Typing effect for profile quote
    function initTypingEffect() {
        const quote = document.querySelector('.profile-quote');
        if (!quote) return;
        
        const text = quote.textContent;
        quote.textContent = '';
        quote.style.opacity = '1';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            quote.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    }
    
    // Initialize typing effect after a delay
    setTimeout(initTypingEffect, 1000);
    
    
    // Skills Section Animation
    function animateSkillsSection() {
        const skillItems = document.querySelectorAll('.skill-item, .claude-gemini-item, .ai-tools-item');
        
        skillItems.forEach((item, index) => {
            // Initial state
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.95)';
            
            // Animate with staggered timing
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
                
                // Add bounce effect
                setTimeout(() => {
                    item.style.transform = 'translateY(-5px) scale(1.02)';
                    setTimeout(() => {
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 150);
                }, 300);
                
            }, index * 100); // 100ms stagger between items
        });
        
    }
    
    
    // TOC Links Smooth Scrolling
    function initTocLinks() {
        const tocLinks = document.querySelectorAll('.toc-link');
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset to account for any fixed headers or spacing
                    const yOffset = -50; // Adjust this value as needed
                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    
    // TOC Section Initialization
    function initTocSection() {
        const tocSection = document.querySelector('.toc-section');
        if (tocSection) {
            tocSection.classList.add('initialized');
        }
    }
    
    // 初期化関数の呼び出し
    initTocSection();
    initTocLinks();
    initLoveTags();
    // Vennダイアグラム初期化は末尾で実行
    
    // 売上カウンターアニメーションはローディング画面完了後に開始
    // （loadイベントで確実に開始されるため、フォールバックは不要）
});


// Vennダイアグラム統合管理（重複削除済み・末尾に最終形あり）




// Vennダイアグラム初期化を他の初期化と統合
// (DOMContentLoaded内のinitProfileAnimations等と一緒に実行される)


// RINDO ファネルセクション背景制御
function initRindoBackground() {
    const rindoSection = document.getElementById('rindo-funnel-section');
    const salesLetterSection = document.getElementById('sales-letter');
    const backgroundLayer = document.getElementById('rindo-background-layer');
    const worksTitle = document.querySelector('.works-hero-title');
    
    if (!rindoSection || !salesLetterSection || !backgroundLayer || !worksTitle) return;
    
    function checkRindoSectionPosition() {
        const rindoRect = rindoSection.getBoundingClientRect();
        const salesLetterRect = salesLetterSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // RINDOセクションの開始から次のセクション（sales-letter）の開始より少し早めまで
        const isInRange = rindoRect.top < windowHeight && salesLetterRect.top > 400;
        
        if (isInRange) {
            backgroundLayer.classList.add('active');
            worksTitle.classList.add('white-text');
            document.body.classList.add('rindo-text-white');
        } else {
            backgroundLayer.classList.remove('active');
            worksTitle.classList.remove('white-text');
            document.body.classList.remove('rindo-text-white');
        }
    }
    
    // スクロールイベントリスナー
    window.addEventListener('scroll', checkRindoSectionPosition);
    
    // 初期チェック
    checkRindoSectionPosition();
}

// DOMが読み込まれた後にRINDO背景を初期化
document.addEventListener('DOMContentLoaded', initRindoBackground);

// 統合背景制御
function initBackgroundSwitching() {
    const salesLetterSection = document.getElementById('sales-letter');
    const writingBusinessSection = document.getElementById('writing-business');
    const seoMediaSection = document.getElementById('seo-media');
    const flowSection = document.getElementById('flow');
    
    const salesLetterBackgroundLayer = document.getElementById('sales-letter-background-layer');
    const seoMediaBackgroundLayer = document.getElementById('seo-media-background-layer');
    
    if (!salesLetterSection || !writingBusinessSection || !seoMediaSection || !flowSection || 
        !salesLetterBackgroundLayer || !seoMediaBackgroundLayer) return;
    
    function checkBackgroundPosition() {
        const windowHeight = window.innerHeight;
        
        const salesLetterRect = salesLetterSection.getBoundingClientRect();
        const writingBusinessRect = writingBusinessSection.getBoundingClientRect();
        const seoMediaRect = seoMediaSection.getBoundingClientRect();
        const flowRect = flowSection.getBoundingClientRect();
        
        // 全ての背景をリセット
        salesLetterBackgroundLayer.classList.remove('active');
        seoMediaBackgroundLayer.classList.remove('active');
        
        if (flowRect.top <= windowHeight * 0.7) {
            // flowセクション以降: ファーストビュー（背景なし）（タイミングを遅く）
            // 何も表示しない
        } else if (seoMediaRect.top <= windowHeight * 0.7) {
            // seo-mediaセクション: なべけん背景（タイミングを遅く）
            seoMediaBackgroundLayer.classList.add('active');
        } else if (writingBusinessRect.top <= windowHeight * 0.5) {
            // writing-businessセクション: ファーストビュー（背景なし）（切り替えタイミングをさらに遅く）
            // 何も表示しない
        } else if (salesLetterRect.top <= windowHeight * 0.7) {
            // sales-letterセクション: インフルエンサー背景（タイミングを遅く）
            salesLetterBackgroundLayer.classList.add('active');
        }
    }
    
    // スクロールイベントリスナー
    window.addEventListener('scroll', checkBackgroundPosition);
    
    // 初期チェック
    checkBackgroundPosition();
}

// DOMが読み込まれた後に統合背景制御を初期化
document.addEventListener('DOMContentLoaded', initBackgroundSwitching);

// なべけんの役割図アニメーション
function initRoleDiagramAnimation() {
    const roleSection = document.querySelector('.nabeken-role-section');
    const userLines = document.querySelectorAll('.user-line');
    const clientLines = document.querySelectorAll('.client-line');
    
    if (!roleSection) return;
    
    // IntersectionObserverでスクロール検知
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // なべけんから各アイコンへ線が描画されるアニメーション開始
                userLines.forEach(line => line.classList.add('animate-draw'));
                clientLines.forEach(line => line.classList.add('animate-draw'));
                
                // 一度実行したら監視を停止
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // 30%表示されたときに発動
    });
    
    observer.observe(roleSection);
}

// DOM読み込み完了後に役割図アニメーションを初期化
document.addEventListener('DOMContentLoaded', initRoleDiagramAnimation);

// Modal Functions
function openPromptModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        // スクロール位置を保存
        const scrollY = window.scrollY;
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        // スクロール位置をbodyに保存
        document.body.setAttribute('data-scroll-y', scrollY);
    }
}

function closePromptModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        
        // スクロール位置を復元
        const scrollY = document.body.getAttribute('data-scroll-y');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0'));
        document.body.removeAttribute('data-scroll-y');
    }
}

// Image Modal Functions
function openImageModal(imageSrc, altText) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImage && modalCaption) {
        // スクロール位置を保存
        const scrollY = window.scrollY;
        modal.style.display = 'block';
        modalImage.src = imageSrc;
        modalImage.alt = altText;
        modalCaption.textContent = altText;
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.setAttribute('data-scroll-y', scrollY);
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        
        // スクロール位置を復元
        const scrollY = document.body.getAttribute('data-scroll-y');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0'));
        document.body.removeAttribute('data-scroll-y');
    }
}

/*
// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle image modal
    const imageModal = document.getElementById('imageModal');
    if (event.target === imageModal) {
        closeImageModal();
    }
}
*/

// Close image modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Sales Counter Animation
let salesCounterStarted = false; // 重複実行防止フラグ

function initSalesCounterAnimation() {
    const counter = document.getElementById('sales-counter');
    if (!counter || salesCounterStarted) return;
    
    salesCounterStarted = true; // フラグを設定
    
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2秒間でアニメーション
    const increment = target / (duration / 16); // 60FPSで計算
    let current = 0;
    
    function updateCounter() {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        }
    }
    
    // アニメーション即座開始
    updateCounter();
}

// ヒアリング力の円にスクロール連動光エフェクト
function initHearingCircleAnimation() {
    const hearingCircle = document.querySelector('.hearing-power-section .hearing-venn-diagram .venn-circle-1');
    const hearingSection = document.querySelector('.hearing-power-section');
    if (!hearingCircle || !hearingSection) return;

    function updateHearingGlow() {
        const rect = hearingSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // より簡単な進行度計算：セクションの上端が画面に入ってから完全に通過するまで
        let progress = 0;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            // セクションがビューポート内にある場合
            if (rect.top <= windowHeight && rect.top > windowHeight * 0.2) {
                // セクション上部が画面下80%に入った時点から開始（より下から）
                progress = (windowHeight - rect.top) / (windowHeight * 0.8);
            } else if (rect.top <= windowHeight * 0.2 && rect.bottom > windowHeight * 0.2) {
                // セクションが画面上20%付近にある時は100%
                progress = 1;
            } else if (rect.bottom <= windowHeight * 0.2 && rect.bottom > 0) {
                // セクションが画面上部に向かう時は徐々に減少
                progress = rect.bottom / (windowHeight * 0.2);
            }
        }
        
        progress = Math.max(0, Math.min(1, progress));
        
        
        // 光の強度を段階的に計算（progress: 0-1を基準）
        let shadowIntensity, shadowSpread, innerShadow;
        
        // より滑らかな線形計算
        shadowIntensity = 0.2 + (progress * 0.7); // 0.2から0.9まで
        shadowSpread = 5 + (progress * 85); // 5pxから90pxまで
        
        // 内側の光は50%以降から追加
        if (progress >= 0.5) {
            const innerProgress = (progress - 0.5) * 2; // 0.5-1.0を0-1にマップ
            innerShadow = `inset 0 0 ${10 + (innerProgress * 30)}px rgba(59, 130, 246, ${innerProgress * 0.3})`;
        } else {
            innerShadow = '';
        }
        
        // ボックスシャドウを適用
        if (shadowSpread > 0) {
            const outerShadow = `0 0 ${shadowSpread}px rgba(59, 130, 246, ${shadowIntensity})`;
            const fullShadow = innerShadow ? `${outerShadow}, ${innerShadow}` : outerShadow;
            hearingCircle.style.boxShadow = fullShadow;
        } else {
            hearingCircle.style.boxShadow = 'none';
        }
    }
    
    // スクロールイベントリスナー
    window.addEventListener('scroll', updateHearingGlow, { passive: true });
    
    // 初期状態を設定
    updateHearingGlow();
}

// 分析力の円にスクロール連動光エフェクト（緑色）
function initAnalysisCircleAnimation() {
    const analysisCircle = document.querySelector('.analysis-power-section .analysis-venn-diagram .venn-circle-2');
    const analysisSection = document.querySelector('.analysis-power-section');
    if (!analysisCircle || !analysisSection) return;

    function updateAnalysisGlow() {
        const rect = analysisSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let progress = 0;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            if (rect.top <= windowHeight && rect.top > windowHeight * 0.2) {
                progress = (windowHeight - rect.top) / (windowHeight * 0.8);
            } else if (rect.top <= windowHeight * 0.2 && rect.bottom > windowHeight * 0.2) {
                progress = 1;
            } else if (rect.bottom <= windowHeight * 0.2 && rect.bottom > 0) {
                progress = rect.bottom / (windowHeight * 0.2);
            }
        }
        
        progress = Math.max(0, Math.min(1, progress));
        
        // 緑色の光エフェクト
        let shadowIntensity, shadowSpread, innerShadow;
        
        shadowIntensity = 0.2 + (progress * 0.7);
        shadowSpread = 5 + (progress * 85);
        
        if (progress >= 0.5) {
            const innerProgress = (progress - 0.5) * 2;
            innerShadow = `inset 0 0 ${10 + (innerProgress * 30)}px rgba(34, 197, 94, ${innerProgress * 0.3})`;
        } else {
            innerShadow = '';
        }
        
        if (shadowSpread > 0) {
            const outerShadow = `0 0 ${shadowSpread}px rgba(34, 197, 94, ${shadowIntensity})`;
            const fullShadow = innerShadow ? `${outerShadow}, ${innerShadow}` : outerShadow;
            analysisCircle.style.boxShadow = fullShadow;
        } else {
            analysisCircle.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateAnalysisGlow, { passive: true });
    updateAnalysisGlow();
}

// 学習姿勢の円にスクロール連動光エフェクト（赤色）
function initLearningCircleAnimation() {
    const learningCircle = document.querySelector('.learning-power-section .learning-venn-diagram .venn-circle-3');
    const learningSection = document.querySelector('.learning-power-section');
    if (!learningCircle || !learningSection) return;

    function updateLearningGlow() {
        const rect = learningSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let progress = 0;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            if (rect.top <= windowHeight && rect.top > windowHeight * 0.2) {
                progress = (windowHeight - rect.top) / (windowHeight * 0.8);
            } else if (rect.top <= windowHeight * 0.2 && rect.bottom > windowHeight * 0.2) {
                progress = 1;
            } else if (rect.bottom <= windowHeight * 0.2 && rect.bottom > 0) {
                progress = rect.bottom / (windowHeight * 0.2);
            }
        }
        
        progress = Math.max(0, Math.min(1, progress));
        
        // 赤色の光エフェクト
        let shadowIntensity, shadowSpread, innerShadow;
        
        shadowIntensity = 0.2 + (progress * 0.7);
        shadowSpread = 5 + (progress * 85);
        
        if (progress >= 0.5) {
            const innerProgress = (progress - 0.5) * 2;
            innerShadow = `inset 0 0 ${10 + (innerProgress * 30)}px rgba(239, 68, 68, ${innerProgress * 0.3})`;
        } else {
            innerShadow = '';
        }
        
        if (shadowSpread > 0) {
            const outerShadow = `0 0 ${shadowSpread}px rgba(239, 68, 68, ${shadowIntensity})`;
            const fullShadow = innerShadow ? `${outerShadow}, ${innerShadow}` : outerShadow;
            learningCircle.style.boxShadow = fullShadow;
        } else {
            learningCircle.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateLearningGlow, { passive: true });
    updateLearningGlow();
}

// Strengths title scroll-based animation
function initStrengthsTitleAnimation() {
    const strengthsSection = document.querySelector('.strength-section-header');
    const strengthsTitle = strengthsSection?.querySelector('.strength-section-title');
    
    if (strengthsSection && strengthsTitle) {
        const firstLine = strengthsTitle.querySelector('.title-line:first-child');
        const lastLine = strengthsTitle.querySelector('.title-line:last-child');
        
        function updateStrengthsTitlePosition() {
            const rect = strengthsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress (0 to 1)
            const rawProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight * 1.0)
            ));
            
            // Apply gentle easing for smooth but visible animation
            const scrollProgress = Math.sqrt(rawProgress);
            
            // Calculate positions based on scroll progress
            const firstLineOffset = 30 * (1 - scrollProgress);
            const lastLineOffset = -30 * (1 - scrollProgress);
            
            // Apply smooth transforms without text alignment changes
            if (firstLine) {
                firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                firstLine.style.textAlign = 'center';
            }
            if (lastLine) {
                lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                lastLine.style.textAlign = 'center';
            }
        }
        
        window.addEventListener('scroll', updateStrengthsTitlePosition, { passive: true });
        updateStrengthsTitlePosition();
    }
}

// Flow title scroll-based animation
function initFlowTitleAnimation() {
    const flowSection = document.getElementById('flow');
    const flowTitle = flowSection?.querySelector('.flow-hero-title');
    
    if (flowSection && flowTitle) {
        const firstLine = flowTitle.querySelector('.title-line:first-child');
        const lastLine = flowTitle.querySelector('.title-line:last-child');
        
        function updateFlowTitlePosition() {
            const rect = flowSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress (0 to 1)
            const rawProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight * 1.0)
            ));
            
            // Apply gentle easing for smooth but visible animation
            const scrollProgress = Math.sqrt(rawProgress);
            
            // Calculate positions based on scroll progress
            const firstLineOffset = 30 * (1 - scrollProgress);
            const lastLineOffset = -30 * (1 - scrollProgress);
            
            // Apply smooth transforms without text alignment changes
            if (firstLine) {
                firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                firstLine.style.textAlign = 'center';
            }
            if (lastLine) {
                lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                lastLine.style.textAlign = 'center';
            }
        }
        
        window.addEventListener('scroll', updateFlowTitlePosition, { passive: true });
        updateFlowTitlePosition();
    }
}

// FAQ title scroll-based animation
function initFaqTitleAnimation() {
    const faqSection = document.getElementById('faq');
    const faqTitle = faqSection?.querySelector('.faq-hero-title');
    
    if (faqSection && faqTitle) {
        const firstLine = faqTitle.querySelector('.title-line:first-child');
        const lastLine = faqTitle.querySelector('.title-line:last-child');
        
        function updateFaqTitlePosition() {
            const rect = faqSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress (0 to 1)
            const rawProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight * 1.0)
            ));
            
            // Apply gentle easing for smooth but visible animation
            const scrollProgress = Math.sqrt(rawProgress);
            
            // Calculate positions based on scroll progress
            const firstLineOffset = 30 * (1 - scrollProgress);
            const lastLineOffset = -30 * (1 - scrollProgress);
            
            // Apply smooth transforms without text alignment changes
            if (firstLine) {
                firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                firstLine.style.textAlign = 'center';
            }
            if (lastLine) {
                lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                lastLine.style.textAlign = 'center';
            }
        }
        
        window.addEventListener('scroll', updateFaqTitlePosition, { passive: true });
        updateFaqTitlePosition();
    }
}

// Contact title scroll-based animation
function initContactTitleAnimation() {
    const contactSection = document.getElementById('contact');
    const contactTitle = contactSection?.querySelector('.contact-hero-title');
    
    if (contactSection && contactTitle) {
        const firstLine = contactTitle.querySelector('.title-line:first-child');
        const lastLine = contactTitle.querySelector('.title-line:last-child');
        
        function updateContactTitlePosition() {
            const rect = contactSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress (0 to 1)
            const rawProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight * 1.0)
            ));
            
            // Apply gentle easing for smooth but visible animation
            const scrollProgress = Math.sqrt(rawProgress);
            
            // Calculate positions based on scroll progress
            const firstLineOffset = 30 * (1 - scrollProgress);
            const lastLineOffset = -30 * (1 - scrollProgress);
            
            // Apply smooth transforms without text alignment changes
            if (firstLine) {
                firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                firstLine.style.textAlign = 'center';
            }
            if (lastLine) {
                lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                lastLine.style.textAlign = 'center';
            }
        }
        
        window.addEventListener('scroll', updateContactTitlePosition, { passive: true });
        updateContactTitlePosition();
    }
}

// フローティングボタンの表示/非表示制御
function initFloatingButtonVisibility() {
    const floatingButton = document.querySelector('.floating-button');
    const floatingBlur = document.querySelector('.floating-blur');
    const contactButton = document.querySelector('.contact-button-container');
    
    if (!floatingButton || !contactButton) return;
    
    function updateFloatingButtonVisibility() {
        const contactButtonRect = contactButton.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // お問い合わせボタンが画面に表示された場合、フローティングボタンとぼかし背景を非表示
        if (contactButtonRect.top <= windowHeight && contactButtonRect.bottom >= 0) {
            floatingButton.style.opacity = '0';
            floatingButton.style.pointerEvents = 'none';
            if (floatingBlur) {
                floatingBlur.style.opacity = '0';
                floatingBlur.style.pointerEvents = 'none';
            }
        } else {
            floatingButton.style.opacity = '1';
            floatingButton.style.pointerEvents = 'auto';
            if (floatingBlur) {
                floatingBlur.style.opacity = '1';
                floatingBlur.style.pointerEvents = 'none'; // ぼかし背景は常にクリック無効
            }
        }
    }
    
    // スクロールイベントリスナー
    window.addEventListener('scroll', updateFloatingButtonVisibility, { passive: true });
    
    // 初期状態をチェック
    updateFloatingButtonVisibility();
}

// DOMContentLoaded後に初期化
document.addEventListener('DOMContentLoaded', function() {
    // 既存の初期化の後にフローティングボタン制御を追加
    setTimeout(() => {
        initFloatingButtonVisibility();
    }, 100);
});

// ===== Vennダイアグラム最終形（末尾配置） =====
function mountSingleStickyVenn(){
  const details = document.querySelector('.strengths-details');
  if (!details || document.querySelector('.strengths-sticky-wrapper')) return;

  const section = details.closest('.strengths') || details.closest('section') || details.parentNode;
  const wrapper = document.createElement('div'); wrapper.className = 'strengths-sticky-wrapper';
  const left    = document.createElement('div'); left.className    = 'strengths-sticky-left';

  section.insertBefore(wrapper, details);
  wrapper.appendChild(left);
  wrapper.appendChild(details);

  ['.hearing-venn-diagram','.analysis-venn-diagram','.learning-venn-diagram'].forEach(sel=>{
    const node = document.querySelector(sel); if (node) left.appendChild(node);
  });
  document.querySelectorAll('.hearing-power-left,.analysis-power-left,.learning-power-left')
    .forEach(el => el.style.display = 'none');
}

document.addEventListener('DOMContentLoaded', () => { mountSingleStickyVenn(); });

/* === Strengths: sticky が効かない環境向け fixed フォールバック === */
(function(){
  const wrapper = document.querySelector('.strengths-sticky-wrapper');
  const leftBox = document.querySelector('.strengths-sticky-left');
  if (!wrapper || !leftBox) return;

  let topPx = Math.round(window.innerHeight * 0.12); // ≒ 12vh（CSSと合わせる）
  let startY = 0, endY = 0, leftPx = 0, widthPx = 0;

  function compute() {
    // 追尾トップ・幅・左座標を再計算
    topPx = Math.round(window.innerHeight * 0.12);
    leftBox.style.setProperty('--fix-top', `${topPx}px`);

    const wcs = getComputedStyle(wrapper);
    const padLeft = parseFloat(wcs.paddingLeft || 0);
    const wRect = wrapper.getBoundingClientRect();
    leftPx = Math.round(wRect.left + padLeft);
    widthPx = leftBox.getBoundingClientRect().width; // 現状の見かけ幅

    leftBox.style.setProperty('--fix-left', `${leftPx}px`);
    leftBox.style.setProperty('--fix-width', `${widthPx}px`);

    // スクロール範囲（セクション内だけ fixed にする）
    const docTop = window.scrollY + wRect.top;
    const wHeight = wrapper.getBoundingClientRect().height;
    const lHeight = leftBox.getBoundingClientRect().height;
    startY = Math.max(0, docTop - topPx);
    endY   = docTop + wHeight - lHeight - topPx;
  }

  function onScroll() {
    const y = window.scrollY;
    if (y < startY) {
      leftBox.classList.remove('is-fixed','is-end'); // 通常（上側）
    } else if (y >= startY && y < endY) {
      leftBox.classList.add('is-fixed');             // 追尾ゾーン
      leftBox.classList.remove('is-end');
    } else {
      leftBox.classList.remove('is-fixed');          // 終端で下に固定
      leftBox.classList.add('is-end');
    }
  }

  // 初期化
  compute(); onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', () => { leftBox.classList.remove('is-fixed','is-end'); compute(); onScroll(); });
})();

/* ===== Maslow：スクロール連動ピラミッド表示 ===== */
(function(){
  const wrapper = document.querySelector('.maslow-scroll-wrapper');
  if (!wrapper) {
    console.warn('Maslow wrapper not found');
    return;
  }

  const sections = Array.from(wrapper.querySelectorAll('.maslow-section'));
  const segments = Array.from(wrapper.querySelectorAll('.maslow-seg'));
  const triggers = Array.from(wrapper.querySelectorAll('.maslow-trigger'));
  
  console.log('Maslow pyramid initialized:', { sections: sections.length, segments: segments.length, triggers: triggers.length });

  function updateActiveSection() {
    const windowHeight = window.innerHeight;
    let activeIndex = 0;
    
    // 各トリガー要素の位置を確認して、最も適切なアクティブインデックスを決定
    triggers.forEach((trigger, index) => {
      const rect = trigger.getBoundingClientRect();
      const triggerTop = rect.top;
      const triggerBottom = rect.bottom;
      
      // トリガーが画面の中央あたりにある場合
      if (triggerTop < windowHeight * 0.6 && triggerBottom > windowHeight * 0.4) {
        activeIndex = index;
      }
    });
    
    // アクティブなセクションとピラミッドセグメントを更新
    sections.forEach((section, index) => {
      section.classList.toggle('active', index === activeIndex);
    });
    
    segments.forEach((segment) => {
      const level = parseInt(segment.dataset.level);
      if (!isNaN(level)) {
        const isActive = level === (activeIndex + 1);
        segment.classList.toggle('active', isActive);
      }
    });
  }

  // スクロールイベントをthrottleで最適化
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }

  // 初回反映
  updateActiveSection();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  
  // 初期化 - 最初のセクションをアクティブに
  if (sections.length > 0) {
    sections[0].classList.add('active');
  }
  if (segments.length > 0) {
    segments[0].classList.add('active');
  }
  
  // スクロール連動の計算も初期化
  setTimeout(updateActiveSection, 100);
})();

