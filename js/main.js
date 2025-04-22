document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 스크롤 시 헤더 스타일 변경
    const navbar = document.querySelector('.navbar');
    let scrolled = false;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (!scrolled) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                scrolled = true;
            }
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            scrolled = false;
        }
    });
    
    // 스크롤 애니메이션
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // 초기 애니메이션 실행
    setTimeout(animateOnScroll, 300);
    
    // 스크롤 시 애니메이션 실행
    window.addEventListener('scroll', animateOnScroll);
    
    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴가 열려있을 경우 닫기
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}); 