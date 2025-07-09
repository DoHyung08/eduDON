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
    const submitPasswordBtn = document.getElementById('submitBtn');
    const resultMessage = document.getElementById('resultMessage');
    const CORRECT_PASSWORD = "GAME"; // 최종 비밀번호를 여기에 설정하세요.

    // 입력 시 다음 칸으로 자동 이동
    passwordInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            // 글자가 입력되면 다음 칸으로 포커스 이동
            if (input.value.length === 1 && index < passwordInputs.length - 1) {
                passwordInputs[index + 1].focus();
            }
        });

        // 백스페이스 키 처리
        input.addEventListener('keydown', (e) => {
            // 백스페이스를 누르고 칸이 비어있으면 이전 칸으로 이동
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                passwordInputs[index - 1].focus();
            }
        });
    });

    // 최종 비밀번호 제출 버튼 클릭 이벤트
    submitPasswordBtn.addEventListener('click', function() {
        let enteredPassword = '';
        passwordInputs.forEach(input => {
            enteredPassword += input.value;
        });

        resultMessage.textContent = ''; // 이전 메시지 초기화
        resultMessage.classList.remove('success', 'error');

        if (enteredPassword.toUpperCase() === CORRECT_PASSWORD) {
            resultMessage.textContent = '정답입니다! 모든 문제를 해결하셨습니다!';
            resultMessage.classList.add('success');
        } else {
            resultMessage.textContent = '비밀번호가 일치하지 않습니다.';
            resultMessage.classList.add('error');
        }
    });
}); 