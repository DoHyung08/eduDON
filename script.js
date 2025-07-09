document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 버튼과 드롭다운 요소들
    const menuBtn = document.getElementById('menuBtn');
    const menuDropdown = document.getElementById('menuDropdown');
    const loginBtn = document.getElementById('loginBtn');
    const myInfoBtn = document.getElementById('myInfoBtn');
    
    // 문제 카드들
    const problemCards = document.querySelectorAll('.problem-card');
    
    // 메뉴 버튼 클릭 이벤트
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        menuDropdown.classList.toggle('show');
    });
    
    // 로그인 버튼 클릭 이벤트
    loginBtn.addEventListener('click', function() {
        alert('로그인 기능은 나중에 구현됩니다.');
        menuDropdown.classList.remove('show');
    });
    
    // 나의 정보 버튼 클릭 이벤트
    myInfoBtn.addEventListener('click', function() {
        alert('나의 정보 기능은 나중에 구현됩니다.');
        menuDropdown.classList.remove('show');
    });
    
    // 문제 카드 클릭 이벤트
    problemCards.forEach(card => {
        card.addEventListener('click', function() {
            const problemNumber = this.getAttribute('data-problem');
            window.location.href = `problems/problem${problemNumber}.html`;
        });
    });
    
    // 메뉴 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (menuBtn && !menuBtn.contains(e.target) && menuDropdown && !menuDropdown.contains(e.target)) {
            menuDropdown.classList.remove('show');
        }
    });
    
    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuDropdown) {
            menuDropdown.classList.remove('show');
        }
    });

    // --- 최종 비밀번호 입력 로직 ---
    const passwordInputs = document.querySelectorAll('.password-input');
    const submitBtn = document.getElementById('submitBtn');
    const resultMessage = document.getElementById('resultMessage');
    const CORRECT_PASSWORD = "1234"; // 최종 비밀번호

    // passwordInputs가 페이지에 있을 때만 로직 실행
    if (passwordInputs.length > 0) {
        passwordInputs.forEach((input, index) => {
            input.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value && index < passwordInputs.length - 1) {
                    passwordInputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && !this.value && index > 0) {
                    passwordInputs[index - 1].focus();
                }
            });
        });
        
        // 제출 버튼 클릭 이벤트
        submitBtn.addEventListener('click', function() {
            const password = Array.from(passwordInputs).map(input => input.value).join('');
            
            if (password.length !== 4) {
                showResult('4자리 비밀번호를 모두 입력해주세요.', 'error');
                return;
            }
            
            if (password === CORRECT_PASSWORD) {
                showResult('통과!', 'success');
                // 정답일 때 축하 효과 함수 호출!
                celebrate();
            } else {
                showResult('비밀번호가 올바르지 않습니다.', 'error');
            }
        });
    }
    
    // 결과 메시지 표시 함수
    function showResult(message, type) {
        if (!resultMessage) return;
        resultMessage.textContent = message;
        resultMessage.className = `result-message ${type} show`;
        
        setTimeout(() => {
            resultMessage.classList.remove('show');
        }, 3000);
    }

    // --- 축하 효과 함수 (새로 추가) ---
    function celebrate() {
        // 1. 폭죽 효과
        function fire(particleRatio, opts) {
            const count = 200;
            const defaults = { origin: { y: 0.7 } };
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        // 2. 풍선 효과(수정)
        function launchBalloons() {
            const balloonDefaults = {
                particleCount: 30, // 풍선 개수 증가
                angle: 90,
                spread: 100,
                startVelocity: 15,
                decay: 0.9,
                gravity: -0.2, // 위로 올라가는 힘 강화
                ticks: 300,
                shapes: ['circle'],
                scalar: 2 // 풍선 크기 증가
            };
            
            // 3군데에서 색깔별로 발사
            confetti(Object.assign({}, balloonDefaults, { origin: { x: 0.1, y: 1.2 }, colors: ['#667eea', '#ffffff'] }));
            confetti(Object.assign({}, balloonDefaults, { origin: { x: 0.5, y: 1.2 }, colors: ['#764ba2', '#f0f0f0'] }));
            confetti(Object.assign({}, balloonDefaults, { origin: { x: 0.9, y: 1.2 }, colors: ['#869dff', '#ffffff'] }));
        }

        // 약간의 시간차를 두고 풍선 발사
        setTimeout(launchBalloons, 200);
        setTimeout(launchBalloons, 500);
    }
});