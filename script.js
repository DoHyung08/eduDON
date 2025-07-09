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
            alert(`문제 ${problemNumber}를 선택했습니다. 새 창 기능은 나중에 구현됩니다.`);
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
}); 