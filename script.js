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
            //alert(`문제 ${problemNumber}를 선택했습니다. 새 창 기능은 나중에 구현됩니다.`);
            // static 미리 만들어 둠
            window.location.href = `problems/problem${problemNumber}.html`;
        });
    });
    
    // 메뉴 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
            menuDropdown.classList.remove('show');
        }
    });
    
    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            menuDropdown.classList.remove('show');
        }
    });

    // password 입력 js
    const passwordInputs = document.querySelectorAll('.password-input');
    const submitBtn = document.getElementById('submitBtn');
    const resultMessage = document.getElementById('resultMessage');
    const CORRECT_PASSWORD = "1234"; // 최종 비밀번호를 여기에 설정하세요.

    passwordInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // 숫자만 입력 가능
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // 다음 입력 필드로 자동 이동
            if (this.value && index < passwordInputs.length - 1) {
                passwordInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            // 백스페이스로 이전 필드로 이동
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
        } else {
            showResult('비밀번호가 올바르지 않습니다.', 'error');
        }
    });
    
    // 결과 메시지 표시 함수
    function showResult(message, type) {
        resultMessage.textContent = message;
        resultMessage.className = `result-message ${type} show`;
        
        // 3초 후 메시지 숨기기
        setTimeout(() => {
            resultMessage.classList.remove('show');
        }, 3000);
    }
}); 