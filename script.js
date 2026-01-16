// 아재개그 데이터
let jokesData = [];
let todayJoke = null;

// DOM 요소
const elements = {
    dateDisplay: document.getElementById('date-display'),
    jokeQuestion: document.getElementById('joke-question'),
    jokeAnswer: document.getElementById('joke-answer'),
    showAnswerBtn: document.getElementById('show-answer-btn'),
    answerCard: document.getElementById('answer-card'),
    answerSection: document.getElementById('answer-section'),
    shareQuestionBtn: document.getElementById('share-question-btn'),
    shareWithAnswerBtn: document.getElementById('share-with-answer-btn'),
    shareImageBtn: document.getElementById('share-image-btn'),
    shareCanvas: document.getElementById('share-canvas'),
    loading: document.getElementById('loading')
};

// 날짜 표시 업데이트
function updateDateDisplay() {
    const t = window.t || ((key, vars = {}) => key);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const locale = window.currentLang === 'en' ? 'en-US' : 'ko-KR';
    const dayNames = window.currentLang === 'en' 
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[today.getDay()];
    
    elements.dateDisplay.textContent = `${year}.${month}.${date} (${dayName})`;
}

// 오늘의 개그 선택 (날짜 기반 고정)
function getTodayJoke() {
    if (jokesData.length === 0) return null;
    
    // 오늘 날짜를 기반으로 고정된 인덱스 선택
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % jokesData.length;
    
    return jokesData[index];
}

// 아재개그 데이터 로드
async function loadJokes() {
    try {
        elements.loading.classList.remove('hidden');
        
        const response = await fetch('jokes.json');
        const t = window.t || ((key, vars = {}) => key);
        if (!response.ok) {
            throw new Error(t('errorLoadData'));
        }
        
        jokesData = await response.json();
        todayJoke = getTodayJoke();
        window.todayJoke = todayJoke;
        
        if (todayJoke) {
            displayJoke(todayJoke);
        } else {
            throw new Error(t('errorLoadJoke'));
        }
        
        elements.loading.classList.add('hidden');
    } catch (error) {
        elements.loading.classList.add('hidden');
        console.error('아재개그 로드 실패:', error);
        const t = window.t || ((key, vars = {}) => key);
        alert(t('alertLoadError'));
    }
}

// 아재개그 표시
function displayJoke(joke) {
    const t = window.t || ((key, vars = {}) => key);
    const lang = window.currentLang || 'ko';
    
    // 언어에 따라 다른 필드 사용
    const question = lang === 'en' && joke.question_en ? joke.question_en : joke.question;
    const answer = lang === 'en' && joke.answer_en ? joke.answer_en : joke.answer;
    
    elements.jokeQuestion.textContent = question;
    elements.jokeAnswer.textContent = answer;
    
    // 정답 카드 숨기기
    elements.answerCard.style.display = 'none';
    elements.showAnswerBtn.textContent = t('btnShowAnswer');
    elements.showAnswerBtn.style.display = 'block';
}

// 정답 보기/숨기기 토글
function toggleAnswer() {
    const t = window.t || ((key, vars = {}) => key);
    const isVisible = elements.answerCard.style.display !== 'none';
    
    if (isVisible) {
        elements.answerCard.style.display = 'none';
        elements.showAnswerBtn.textContent = t('btnShowAnswer');
    } else {
        elements.answerCard.style.display = 'block';
        elements.showAnswerBtn.textContent = t('btnHideAnswer');
    }
}

// 문제만 공유
async function shareQuestion() {
    const t = window.t || ((key, vars = {}) => key);
    if (!todayJoke) return;
    
    const lang = window.currentLang || 'ko';
    const question = lang === 'en' && todayJoke.question_en ? todayJoke.question_en : todayJoke.question;
    
    const shareText = t('shareQuestionTemplate', {
        question: question,
        url: window.location.href
    });
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: t('shareTitle'),
                text: shareText,
                url: window.location.href
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                fallbackShare(shareText);
            }
        }
    } else {
        fallbackShare(shareText);
    }
}

// 정답 포함 공유
async function shareWithAnswer() {
    const t = window.t || ((key, vars = {}) => key);
    if (!todayJoke) return;
    
    const lang = window.currentLang || 'ko';
    const question = lang === 'en' && todayJoke.question_en ? todayJoke.question_en : todayJoke.question;
    const answer = lang === 'en' && todayJoke.answer_en ? todayJoke.answer_en : todayJoke.answer;
    
    const shareText = t('shareWithAnswerTemplate', {
        question: question,
        answer: answer
    });
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: t('shareTitle'),
                text: shareText,
                url: window.location.href
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                fallbackShare(shareText);
            }
        }
    } else {
        fallbackShare(shareText);
    }
}

// 공유 대체 방법
function fallbackShare(text) {
    const t = window.t || ((key, vars = {}) => key);
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert(t('alertCopied'));
        });
    } else {
        prompt(t('promptCopy'), text);
    }
}

// 랜덤 배경색 생성
function getRandomColor() {
    const colors = [
        { start: '#667eea', end: '#764ba2' },
        { start: '#f093fb', end: '#f5576c' },
        { start: '#4facfe', end: '#00f2fe' },
        { start: '#43e97b', end: '#38f9d7' },
        { start: '#fa709a', end: '#fee140' },
        { start: '#30cfd0', end: '#330867' },
        { start: '#a8edea', end: '#fed6e3' },
        { start: '#ff9a9e', end: '#fecfef' }
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 카드 이미지 생성 및 공유
async function createAndShareImage() {
    const t = window.t || ((key, vars = {}) => key);
    if (!todayJoke) {
        alert(t('alertLoadError'));
        return;
    }
    
    try {
        const canvas = elements.shareCanvas;
        const ctx = canvas.getContext('2d');
        
        // 캔버스 크기 설정 (SNS 공유 최적화)
        canvas.width = 1200;
        canvas.height = 630;
        
        // 랜덤 그라데이션 배경
        const color = getRandomColor();
        const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
        gradient.addColorStop(0, color.start);
        gradient.addColorStop(1, color.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1200, 630);
        
        // 텍스트 색상 및 폰트
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 제목
        const t = window.t || ((key, vars = {}) => key);
        ctx.font = 'bold 48px Arial';
        ctx.fillText(t('title'), 600, 80);
        
        // 날짜
        const today = new Date();
        const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
        ctx.font = '32px Arial';
        ctx.fillText(dateStr, 600, 140);
        
        // 문제
        const lang = window.currentLang || 'ko';
        const question = lang === 'en' && todayJoke.question_en ? todayJoke.question_en : todayJoke.question;
        const answer = lang === 'en' && todayJoke.answer_en ? todayJoke.answer_en : todayJoke.answer;
        
        ctx.font = 'bold 56px Arial';
        const questionY = 280;
        wrapText(ctx, `Q. ${question}`, 600, questionY, 1000, 60);
        
        // 정답
        ctx.font = 'bold 48px Arial';
        const answerY = 450;
        wrapText(ctx, `A. ${answer}`, 600, answerY, 1000, 50);
        
        // 이미지를 Blob으로 변환
        canvas.toBlob(async (blob) => {
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'joke.png', { type: 'image/png' })] })) {
                try {
                    const t = window.t || ((key, vars = {}) => key);
                    const file = new File([blob], t('shareImageFilename'), { type: 'image/png' });
                    const lang = window.currentLang || 'ko';
                    const question = lang === 'en' && todayJoke.question_en ? todayJoke.question_en : todayJoke.question;
                    await navigator.share({
                        title: t('shareTitle'),
                        text: `${question}`,
                        files: [file]
                    });
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        downloadImage(blob);
                    }
                }
            } else {
                downloadImage(blob);
            }
        }, 'image/png');
    } catch (error) {
        console.error('이미지 생성 실패:', error);
        const t = window.t || ((key, vars = {}) => key);
        alert(t('alertImageError'));
    }
}

// 텍스트 줄바꿈 처리
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, currentY);
            line = words[i] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, currentY);
}

// 이미지 다운로드
function downloadImage(blob) {
    const t = window.t || ((key, vars = {}) => key);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = t('shareImageFilename');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(t('alertImageDownloaded'));
}

// 이벤트 리스너
elements.showAnswerBtn.addEventListener('click', toggleAnswer);
elements.shareQuestionBtn.addEventListener('click', shareQuestion);
elements.shareWithAnswerBtn.addEventListener('click', shareWithAnswer);
elements.shareImageBtn.addEventListener('click', createAndShareImage);

// 페이지 로드 시 초기화
updateDateDisplay();
loadJokes();
