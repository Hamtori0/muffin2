const titleScreen = document.getElementById('title-screen');
const playScreen = document.getElementById('play-screen');
const startBtn = document.getElementById('start-btn');
const dialogueBox = document.getElementById('dialogue-box');
const speakerName = document.getElementById('speaker-name');
const dialogueText = document.getElementById('dialogue-text');

// 📜 원희의 대사 목록
const dialogueList = [
    { name: "원희", text: "이제 베이킹을 시작해 볼까? 어떤 걸 만들지 고민인데..." },
    { name: "원희", text: "역시 첫 도전이니까 가장 무난한 버터 쿠키가 좋겠어!" },
    { name: "원희", text: "근데 어떡하지... 혼자 만들기는 어려울 것 같은데 글릿한테 도움을 청해볼까?" },
    { name: "원희", text: "저기... 쿠키 만드는 걸 도와줄 수 있을까?" }
];

let currentDialogueIndex = 0; 
let isTyping = false;         
let timer = null;             
let currentText = "";         
let canClickDialogue = false; 

// [게임 시작] 버튼 클릭 시
startBtn.addEventListener('click', () => {
    titleScreen.classList.add('hidden');
    playScreen.classList.remove('hidden');
    
    // 🎵 배경음악 재생
    let bgm = document.getElementById('bgm');
    if (!bgm) {
        bgm = document.createElement('audio');
        bgm.id = 'bgm';
        bgm.src = 'bgm.mp3';
        bgm.loop = true;
        document.body.appendChild(bgm);
    }
    
    bgm.volume = 0.4;
    bgm.play().catch(error => {
        console.log("오디오 재생 차단 또는 파일 없음:", error);
    });

    // 첫 번째 대사 출력
    showDialogue(currentDialogueIndex);

    // 더블클릭 방지
    canClickDialogue = false;
    setTimeout(() => {
        canClickDialogue = true;
    }, 300);
});

// [대화창] 클릭 시
dialogueBox.addEventListener('click', () => {
    if (!canClickDialogue) return; 

    if (isTyping) {
        clearInterval(timer);
        dialogueText.textContent = currentText;
        isTyping = false;
    } else {
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogueList.length) {
            showDialogue(currentDialogueIndex);
        } else {
            alert("대화가 모두 끝났습니다!");
            currentDialogueIndex = 0;
            showDialogue(currentDialogueIndex);
        }
    }
});

// 타이핑 효과 함수
function showDialogue(index) {
    const data = dialogueList[index];
    speakerName.textContent = data.name;
    currentText = data.text;
    dialogueText.textContent = ""; 
    
    let charIndex = 0;
    isTyping = true;
    
    timer = setInterval(() => {
        if (charIndex < currentText.length) {
            dialogueText.textContent += currentText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(timer);
            isTyping = false;
        }
    }, 40);
}