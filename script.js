document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 버튼과 드롭다운 요소들
    const menuBtn = document.getElementById('menuBtn');
    const menuDropdown = document.getElementById('menuDropdown');
    const loginBtn = document.getElementById('loginBtn');
    const myInfoBtn = document.getElementById('myInfoBtn');
    
    // 문제 카드들
    const problemCards = document.querySelectorAll('.problem-card');
    
    // 문제 내용 카드 관련 요소들
    const problemContentCard = document.getElementById('problemContentCard');
    const problemTitle = document.getElementById('problemTitle');
    const problemDescription = document.getElementById('problemDescription');
    const closeProblemBtn = document.getElementById('closeProblemBtn');
    const guideMessage = document.getElementById('guideMessage');
    
    // 비밀번호 입력 관련 요소들
    const passwordInputs = document.querySelectorAll('.password-input');
    const submitBtn = document.getElementById('submitBtn');
    const resultMessage = document.getElementById('resultMessage');
    
    // 문제별 플래그와 비밀번호 매핑
    const problemFlagMap = {
        1: { flag: 'A', password: '1' },
        2: { flag: 'B', password: '2' },
        3: { flag: 'C', password: '3' },
        4: { flag: 'D', password: '4' },
    };
    let currentProblemNumber = null;
    
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
            
            // 이미 선택된 카드인지 확인
            const isSelected = this.classList.contains('selected');
            
            // 모든 카드에서 선택 상태 제거
            problemCards.forEach(c => c.classList.remove('selected'));
            
            if (isSelected) {
                // 이미 선택된 카드였다면 문제 내용 숨기고 안내문 보이기
                problemContentCard.classList.add('show');
                guideMessage.style.display = '';
                problemDescription.style.display = 'none';
                problemTitle.textContent = '';
            } else {
                // 새로운 카드 선택 시 문제 내용 표시, 안내문 숨기기
                this.classList.add('selected');
                showProblemContent(problemNumber);
            }
        });
    });
    
    // 문제 내용 표시 함수
    function showProblemContent(problemNumber) {
        // 문제 제목과 내용 설정 (나중에 실제 문제 내용으로 교체)
        problemTitle.textContent = `문제 ${problemNumber}`;
        problemDescription.innerHTML = `
            <p>문제 ${problemNumber}의 상세 내용이 여기에 표시됩니다.</p>
            <p>이 문제를 해결하여 암호를 찾아보세요!</p>
            <div class=\"flag-section\" id=\"flagSection\">
                <input type=\"text\" id=\"flagInput\" class=\"flag-input\" placeholder=\"플래그를 입력하세요\">
                <button id=\"flagSubmitBtn\" class=\"flag-submit-btn\">제출</button>
                <div id=\"flagResult\" class=\"flag-result\"></div>
            </div>
        `;
        
        // 문제 내용 카드 표시
        problemContentCard.classList.add('show');
        guideMessage.style.display = 'none';
        problemDescription.style.display = '';
        
        // 현재 문제 번호 저장
        currentProblemNumber = problemNumber;
        
        // 플래그 제출 이벤트 바인딩
        setTimeout(() => {
            const flagInput = document.getElementById('flagInput');
            const flagSubmitBtn = document.getElementById('flagSubmitBtn');
            const flagResult = document.getElementById('flagResult');
            if (flagInput && flagSubmitBtn && flagResult) {
                flagInput.value = '';
                flagResult.textContent = '';
                flagResult.className = 'flag-result';
                flagSubmitBtn.onclick = function() {
                    const userFlag = flagInput.value.trim();
                    const correctFlag = problemFlagMap[problemNumber].flag;
                    const password = problemFlagMap[problemNumber].password;
                    if (userFlag === correctFlag) {
                        flagResult.textContent = `비밀번호: ${password}`;
                        flagResult.className = 'flag-result success';
                    } else {
                        flagResult.textContent = '플래그가 올바르지 않습니다.';
                        flagResult.className = 'flag-result error';
                    }
                };
                flagInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        flagSubmitBtn.click();
                    }
                });
            }
        }, 0);
    }
    
    // 닫기 버튼 클릭 이벤트
    closeProblemBtn.addEventListener('click', function() {
        problemContentCard.classList.add('show');
        guideMessage.style.display = '';
        problemDescription.style.display = 'none';
        problemTitle.textContent = '';
        problemCards.forEach(card => card.classList.remove('selected'));
    });
    
    // 페이지 로드 시 안내문만 보이도록 초기화
    guideMessage.style.display = '';
    problemDescription.style.display = 'none';
    problemTitle.textContent = '';
    problemContentCard.classList.add('show');
    currentProblemNumber = null;
    
    // 비밀번호 입력 필드 이벤트
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
        
        if (password === '1234') {
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
}); 