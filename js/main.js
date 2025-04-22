// Co:Re 메인 자바스크립트 파일

document.addEventListener('DOMContentLoaded', () => {
  // 스크롤 애니메이션 효과
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // 애니메이션 대상 요소들
  const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .testimonial, .pricing-card, .step');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // 네비게이션 스크롤 처리
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 모바일 메뉴 버튼 클릭 이벤트 (기존 버튼이 있는 경우)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      
      // 접근성 속성 추가 (aria-expanded)
      const isExpanded = mainNav.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // 모바일 메뉴 내의 링크 클릭 시 메뉴 닫기
    const mobileNavLinks = mainNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
    
    // 화면 크기 변경 시 모바일 메뉴 상태 관리
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        mainNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 문의하기 폼 처리
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 간단한 폼 유효성 검사
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      
      if (!name || !email || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
      }
      
      // 폼 제출 성공 시 메시지
      alert('메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.');
      this.reset();
    });
  }
  
  // 이메일 유효성 검사 함수
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // CSS 애니메이션을 위한 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* 모바일 메뉴 스타일 개선 */
    .main-nav.active {
      display: flex;
    }
    
    /* 모바일 메뉴 버튼 애니메이션 */
    .mobile-menu-btn.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    .mobile-menu-btn.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    
    /* 모달 스타일 */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
    .modal-content {
      background-color: white;
      margin: 10% auto;
      padding: 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      width: 90%;
      max-width: 500px;
      position: relative;
    }
    .close {
      position: absolute;
      right: 1.5rem;
      top: 1rem;
      font-size: 2rem;
      color: var(--light-text);
      cursor: pointer;
    }
    .close:hover {
      color: var(--text-color);
    }
    .modal h2 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .form-actions button {
      flex: 1;
    }
    .forgot-password {
      margin-top: 1rem;
      text-align: center;
    }
    .forgot-password a {
      color: var(--primary-color);
      font-size: 0.9rem;
      text-decoration: none;
    }
    .forgot-password a:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
  
  // 요금제 버튼 기능 구현
  const pricingButtons = document.querySelectorAll('.pricing-plan .btn');
  pricingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 로그인 확인
      if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('서비스를 이용하기 위해 로그인이 필요합니다.');
        loginModal.style.display = 'block';
      } else {
        // 해당 요금제 선택 처리
        const planName = this.closest('.pricing-plan').querySelector('h3').textContent;
        alert(`${planName} 요금제를 선택하셨습니다. 결제 페이지로 이동합니다.`);
        // 결제 페이지 이동 처리 (구현 필요시)
      }
    });
  });

  // 사용자 리뷰 슬라이더 구현
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // 슬라이드 변경 함수
    const changeSlide = (index) => {
      // 범위 체크
      if (index < 0) index = testimonials.length - 1;
      if (index >= testimonials.length) index = 0;
      
      // 현재 활성 슬라이드 비활성화
      testimonials.forEach(slide => slide.style.display = 'none');
      dots.forEach(dot => dot.classList.remove('active'));
      
      // 새 슬라이드 활성화
      testimonials[index].style.display = 'block';
      dots[index].classList.add('active');
      
      currentIndex = index;
    };
    
    // 초기 슬라이드 설정
    changeSlide(0);
    
    // 다음 버튼 클릭 이벤트
    if (nextBtn) {
      nextBtn.addEventListener('click', () => changeSlide(currentIndex + 1));
    }
    
    // 이전 버튼 클릭 이벤트
    if (prevBtn) {
      prevBtn.addEventListener('click', () => changeSlide(currentIndex - 1));
    }
    
    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => changeSlide(index));
    });
    
    // 자동 슬라이드 변경 (5초마다)
    setInterval(() => {
      changeSlide(currentIndex + 1);
    }, 5000);
  }

  // 요금제 카드 호버 효과
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length > 0) {
    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
      
      // 요금제 버튼 클릭 이벤트
      const button = card.querySelector('.btn');
      if (button) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // 로그인 확인
          if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            alert('서비스를 이용하기 위해 로그인이 필요합니다.');
            window.location.href = 'login.html';
          } else {
            // 해당 요금제 선택 처리
            const planName = card.querySelector('h3').textContent;
            alert(`${planName} 요금제를 선택하셨습니다. 결제 페이지로 이동합니다.`);
            // 결제 페이지 이동 처리 (구현 필요시)
          }
        });
      }
    });
  }
});
