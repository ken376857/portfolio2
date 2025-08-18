// Loading Screen Control
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Add a minimum loading time for better UX
    setTimeout(() => {
        loadingScreen.classList.add('slide-up');
        
        // Remove element completely after slide animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }, 1200); // 1.2 seconds minimum loading time
});

// Profile Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initProfileAnimations();
    initLoveTags();
    initScrollAnimations();
    initScrollDownIndicator();
    initTocLinks();

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
        
        // Career section background animation with smooth scroll-based control
        const careerSection = document.getElementById('career');
        
        function updateCareerBackground() {
            if (!careerSection) return;
            
            const rect = careerSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visibility progress (0 to 1)
            // Starts when section enters viewport, completes when fully visible
            const visibilityProgress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight * 0.8)
            ));
            
            // Apply background blue tint based on scroll progress  
            const overlay = careerSection.querySelector('::before') || careerSection;
            const blueOpacity = Math.min(1, 1 * visibilityProgress);
            
            // Update CSS custom property for smooth transition
            careerSection.style.setProperty('--dark-opacity', blueOpacity);
            
            if (visibilityProgress > 0.1) {
                careerSection.classList.add('blue-background');
            } else {
                careerSection.classList.remove('blue-background');
            }
            
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
        
        // Add scroll listener for career background and TOC animation
        window.addEventListener('scroll', updateCareerBackground, { passive: true });
        window.addEventListener('scroll', updateTocAnimation, { passive: true });
        updateCareerBackground(); // Initial call
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
                    (windowHeight - rect.top) / (windowHeight * 0.6)
                ));
                
                // Apply gentle easing for smooth but visible animation
                const scrollProgress = Math.sqrt(rawProgress); // Square root easing for gradual acceleration
                
                // Calculate positions based on scroll progress
                // Start: 30% away, End: 0% (center)
                const firstLineOffset = 30 * (1 - scrollProgress);
                const lastLineOffset = -30 * (1 - scrollProgress);
                
                // Apply transforms with smooth text alignment transition
                if (firstLine) {
                    firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                    // Reset padding that might interfere
                    firstLine.style.paddingLeft = '0';
                    firstLine.style.paddingRight = '0';
                    
                    // Smooth text alignment transition based on scroll progress
                    if (scrollProgress < 0.4) {
                        firstLine.style.textAlign = 'right';
                    } else if (scrollProgress > 0.8) {
                        firstLine.style.textAlign = 'center';
                    } else {
                        // Transition zone - use a mix of positioning and alignment
                        firstLine.style.textAlign = 'right';
                        const transitionOffset = (scrollProgress - 0.4) / 0.4; // 0 to 1 over transition zone
                        const additionalOffset = -15 * transitionOffset; // Additional movement toward center
                        firstLine.style.transform = `translateX(${firstLineOffset + additionalOffset}%)`;
                    }
                }
                if (lastLine) {
                    lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                    // Reset padding that might interfere
                    lastLine.style.paddingLeft = '0';
                    lastLine.style.paddingRight = '0';
                    
                    // Smooth text alignment transition based on scroll progress
                    if (scrollProgress < 0.4) {
                        lastLine.style.textAlign = 'left';
                    } else if (scrollProgress > 0.8) {
                        lastLine.style.textAlign = 'center';
                    } else {
                        // Transition zone - use a mix of positioning and alignment
                        lastLine.style.textAlign = 'left';
                        const transitionOffset = (scrollProgress - 0.4) / 0.4; // 0 to 1 over transition zone
                        const additionalOffset = 15 * transitionOffset; // Additional movement toward center
                        lastLine.style.transform = `translateX(${lastLineOffset + additionalOffset}%)`;
                    }
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
                    (windowHeight - rect.top) / (windowHeight * 0.6)
                ));
                
                // Apply gentle easing for smooth but visible animation
                const scrollProgress = Math.sqrt(rawProgress);
                
                // Calculate positions based on scroll progress
                const firstLineOffset = 30 * (1 - scrollProgress);
                const lastLineOffset = -30 * (1 - scrollProgress);
                
                // Apply transforms with smooth text alignment transition
                if (firstLine) {
                    firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                    firstLine.style.paddingLeft = '0';
                    firstLine.style.paddingRight = '0';
                    
                    if (scrollProgress < 0.4) {
                        firstLine.style.textAlign = 'right';
                    } else if (scrollProgress > 0.8) {
                        firstLine.style.textAlign = 'center';
                    } else {
                        firstLine.style.textAlign = 'right';
                        const transitionOffset = (scrollProgress - 0.4) / 0.4;
                        const additionalOffset = -15 * transitionOffset;
                        firstLine.style.transform = `translateX(${firstLineOffset + additionalOffset}%)`;
                    }
                }
                if (lastLine) {
                    lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                    lastLine.style.paddingLeft = '0';
                    lastLine.style.paddingRight = '0';
                    
                    if (scrollProgress < 0.4) {
                        lastLine.style.textAlign = 'left';
                    } else if (scrollProgress > 0.8) {
                        lastLine.style.textAlign = 'center';
                    } else {
                        lastLine.style.textAlign = 'left';
                        const transitionOffset = (scrollProgress - 0.4) / 0.4;
                        const additionalOffset = 15 * transitionOffset;
                        lastLine.style.transform = `translateX(${lastLineOffset + additionalOffset}%)`;
                    }
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
                    (windowHeight - rect.top) / (windowHeight * 0.6)
                ));
                
                // Apply gentle easing for smooth but visible animation
                const scrollProgress = Math.sqrt(rawProgress);
                
                // Calculate positions based on scroll progress
                const firstLineOffset = 30 * (1 - scrollProgress);
                const lastLineOffset = -30 * (1 - scrollProgress);
                
                // Apply transforms with smooth text alignment transition
                if (firstLine) {
                    firstLine.style.transform = `translateX(${firstLineOffset}%)`;
                    firstLine.style.paddingLeft = '0';
                    firstLine.style.paddingRight = '0';
                    
                    if (scrollProgress < 0.4) {
                        firstLine.style.textAlign = 'right';
                    } else if (scrollProgress > 0.8) {
                        firstLine.style.textAlign = 'center';
                    } else {
                        firstLine.style.textAlign = 'right';
                        const transitionOffset = (scrollProgress - 0.4) / 0.4;
                        const additionalOffset = -15 * transitionOffset;
                        firstLine.style.transform = `translateX(${firstLineOffset + additionalOffset}%)`;
                    }
                }
                if (lastLine) {
                    lastLine.style.transform = `translateX(${lastLineOffset}%)`;
                    lastLine.style.paddingLeft = '0';
                    lastLine.style.paddingRight = '0';
                    
                    if (scrollProgress < 0.4) {
                        lastLine.style.textAlign = 'left';
                    } else if (scrollProgress > 0.8) {
                        lastLine.style.textAlign = 'center';
                    } else {
                        lastLine.style.textAlign = 'left';
                        const transitionOffset = (scrollProgress - 0.4) / 0.4;
                        const additionalOffset = 15 * transitionOffset;
                        lastLine.style.transform = `translateX(${lastLineOffset + additionalOffset}%)`;
                    }
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
        
        // Animate category tag
        const categoryTag = document.querySelector('.skills-category-tag');
        if (categoryTag) {
            categoryTag.style.opacity = '0';
            categoryTag.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                categoryTag.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                categoryTag.style.opacity = '1';
                categoryTag.style.transform = 'translateY(0)';
            }, 200);
        }
    }
    
    // Scroll Down Indicator with smart visibility control
    function initScrollDownIndicator() {
        const scrollIndicator = document.querySelector('.scroll-down-indicator');
        const heroSection = document.querySelector('.hero-section');
        
        if (scrollIndicator && heroSection) {
            // Click functionality
            scrollIndicator.addEventListener('click', () => {
                const tocSection = document.querySelector('.toc-section');
                if (tocSection) {
                    tocSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
            
            // Smart visibility control based on hero section visibility
            function updateScrollIndicatorVisibility() {
                const heroRect = heroSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Show indicator only when hero section is visible
                // Hide when hero section is mostly out of view
                const heroVisible = heroRect.bottom > windowHeight * 0.2;
                
                if (heroVisible) {
                    scrollIndicator.classList.remove('hidden');
                } else {
                    scrollIndicator.classList.add('hidden');
                }
            }
            
            // Listen for scroll events
            window.addEventListener('scroll', updateScrollIndicatorVisibility, { passive: true });
            
            // Initial check
            updateScrollIndicatorVisibility();
        }
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
    initScrollDownIndicator();
    
    // 売上カウンターアニメーション開始
    setTimeout(() => {
        initSalesCounterAnimation();
    }, 1000);
});

// ダークオーバーレイ制御
function initDarkOverlay() {
    const darkOverlay = document.getElementById('dark-overlay');
    const serviceSection = document.getElementById('service');
    const serviceIntroSection = document.querySelector('.service-intro');
    
    if (!darkOverlay || !serviceSection || !serviceIntroSection) return;
    
    function checkServicePosition() {
        const serviceRect = serviceSection.getBoundingClientRect();
        const serviceIntroRect = serviceIntroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // SERVICEセクションが画面に表示されているかチェック（開始点を遅く）
        const serviceVisible = serviceRect.top < windowHeight - 200 && serviceRect.bottom > 0;
        
        // 「私にお任せください！」セクションが画面に入る前まで適用（終点を遅く）
        const serviceIntroNotStarted = serviceIntroRect.top > windowHeight - 300;
        
        
        if (serviceVisible && serviceIntroNotStarted) {
            darkOverlay.classList.add('active');
        } else {
            darkOverlay.classList.remove('active');
        }
    }
    
    // スクロールイベントリスナー
    window.addEventListener('scroll', checkServicePosition);
    
    // 初期チェック
    checkServicePosition();
}

// DOMが読み込まれた後にダークオーバーレイを初期化
document.addEventListener('DOMContentLoaded', initDarkOverlay);

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

// Modal Functions
function openPromptModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closePromptModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Image Modal Functions
function openImageModal(imageSrc, altText) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImage && modalCaption) {
        modal.style.display = 'block';
        modalImage.src = imageSrc;
        modalImage.alt = altText;
        modalCaption.textContent = altText;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

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

// Close image modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Sales Counter Animation
function initSalesCounterAnimation() {
    const counter = document.getElementById('sales-counter');
    if (!counter) return;
    
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
    
    // ページロード後少し遅れてアニメーション開始
    setTimeout(() => {
        updateCounter();
    }, 1500);
}