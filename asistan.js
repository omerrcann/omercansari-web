// --- STİL (CSS) AYARLARI ---
const widgetStyle = `
<style>
    .float-btn { position: fixed; right: 30px; width: 50px; height: 50px; background: rgba(0, 247, 255, 0.1); border: 2px solid #00f7ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1000; box-shadow: 0 0 10px rgba(0,247,255,0.5); transition: 0.3s; }
    .float-btn:hover { background: #00f7ff; box-shadow: 0 0 20px #00f7ff; transform: scale(1.1); }
    .float-btn:hover i { color: #020c1b !important; }
</style>
`;
document.head.insertAdjacentHTML('beforeend', widgetStyle);

// --- HTML ARAYÜZÜ ---
const widgetHTML = `
<div class="float-btn" onclick="toggleChat()" style="bottom: 90px;" title="Asistan">
    <i class="fas fa-comment-dots" style="color: #00f7ff; font-size: 1.5em;"></i>
</div>

<div class="float-btn" onclick="toggleTerminal()" style="bottom: 30px;" title="Sistem Terminali">
    <i class="fas fa-terminal" style="color: #00f7ff; font-size: 1.5em;"></i>
</div>

<div id="chatbot-window" style="display: none; position: fixed; bottom: 150px; right: 30px; width: 350px; height: 450px; background: rgba(2, 12, 27, 0.95); border: 1px solid #00f7ff; border-radius: 10px; z-index: 1001; flex-direction: column; box-shadow: 0 0 30px rgba(0,0,0,0.8); backdrop-filter: blur(10px);">
    <div style="padding: 15px; border-bottom: 1px solid rgba(0, 247, 255, 0.3); display: flex; align-items: center; justify-content: space-between;">
        <span style="color: #00f7ff; font-weight: bold; letter-spacing: 1px;"> <i class="fas fa-robot"></i> ASİSTAN</span>
        <span onclick="toggleChat()" style="color: #ff0055; cursor: pointer; font-weight: bold;">✕</span>
    </div>
    <div id="chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; font-size: 0.9em;">
        <div style="align-self: flex-start; background: rgba(0, 247, 255, 0.1); color: #00f7ff; padding: 10px; border-radius: 10px 10px 10px 0; max-width: 80%;">
            Sistem çevrimiçi. Ben kişisel asistanınızım. Size nasıl yardımcı olabilirim?
        </div>
    </div>
    <div style="padding: 10px; border-top: 1px solid rgba(0, 247, 255, 0.3); display: flex;">
        <input type="text" id="chat-input" placeholder="Komut girin..." onkeypress="handleEnter(event)" style="flex: 1; background: transparent; border: none; color: #fff; outline: none; padding: 5px;">
        <button onclick="sendMessage()" style="background: transparent; border: none; color: #00f7ff; cursor: pointer; font-size: 1.2em;">
            <i class="fas fa-paper-plane"></i>
        </button>
    </div>
</div>

<div id="terminal-window" style="display: none; position: fixed; bottom: 90px; right: 30px; width: 400px; height: 300px; background: rgba(2, 12, 27, 0.95); border: 1px solid #0f0; border-radius: 5px; z-index: 1002; flex-direction: column; box-shadow: 0 0 20px rgba(0,255,0,0.2); font-family: monospace;">
    <div style="padding: 10px; background: #0f0; color: #000; font-weight: bold; display: flex; justify-content: space-between;">
        <span>> root@omercansari:~</span>
        <span onclick="toggleTerminal()" style="cursor: pointer; font-size: 1.2em;">✕</span>
    </div>
    <div id="terminal-content" style="padding: 15px; color: #0f0; flex: 1; overflow-y: auto; font-size: 0.9em; line-height: 1.5;">
        <div>> Sistem bağlantısı kuruldu... [OK]</div>
        <div>> Modüller yükleniyor... [OK]</div>
        <div>> Hoş geldin. İletişim için 'help' yazabilirsin.</div>
    </div>
    <div style="padding: 10px; border-top: 1px solid rgba(0, 255, 0, 0.3); display: flex; color: #0f0;">
        <span style="margin-right: 5px;">>_</span>
        <input type="text" id="terminal-input" onkeypress="handleTermEnter(event)" style="flex: 1; background: transparent; border: none; color: #0f0; outline: none; font-family: monospace;" autocomplete="off">
    </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// --- MANTIKSAL İŞLEMLER VE FONKSİYONLAR ---
const linkedinURL = "https://linkedin.com/in/omerrcann";
const githubURL = "https://github.com/omerrcann";

function toggleChat() {
    var chatWindow = document.getElementById('chatbot-window');
    var chatInput = document.getElementById('chat-input');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        document.getElementById('terminal-window').style.display = 'none';
        if (chatInput) chatInput.focus();
    } else {
        chatWindow.style.display = 'none';
    }
}

function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    setTimeout(() => { botResponse(text.toLowerCase()); }, 600);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.style.padding = "10px"; div.style.maxWidth = "80%";
    div.style.borderRadius = sender === 'user' ? "10px 10px 0 10px" : "10px 10px 10px 0";
    div.style.fontSize = "0.9em"; div.style.marginBottom = "8px";

    if (sender === 'user') {
        div.style.alignSelf = "flex-end"; div.style.background = "rgba(255, 255, 255, 0.1)"; div.style.color = "#fff"; div.innerText = text;
    } else {
        div.style.alignSelf = "flex-start"; div.style.background = "rgba(0, 247, 255, 0.1)"; div.style.color = "#00f7ff"; div.style.border = "1px solid rgba(0, 247, 255, 0.2)"; div.innerHTML = text;
    }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botResponse(input) {
    let response = "";
    if (input.includes('proje')) { window.location.href = "index.html#projects"; response = "Projeler modülü ekrana getiriliyor..."; }
    else if (input.includes('hakkında') || input.includes('kimsin')) { window.location.href = "index.html#about"; response = "Hakkımda kısmına yönlendirildiniz."; }
    else if (input.includes('referans')) { window.location.href = "index.html#references"; response = "Referans bilgileri ekrana getiriliyor."; }
    else if (input.includes('iletişim')) { window.location.href = "index.html#contact"; response = "İletişim bölümüne bakabilirsiniz."; }
    else if (input.includes('linkedin')) { response = `<a href="${linkedinURL}" target="_blank" style="color:#fff;">>> LinkedIn Profilini Aç</a>`; }
    else if (input.includes('github')) { response = `<a href="${githubURL}" target="_blank" style="color:#fff;">>> GitHub Reposunu Aç</a>`; }
    else if (input.includes('merhaba') || input.includes('selam')) { response = "Selamlar! Size nasıl yardım edebilirim?"; }
    else { response = "Komutu anlayamadım. Şunları deneyin: 'Projeler', 'Referanslar', 'İletişim'."; }
    addMessage(response, 'bot');
}

function toggleTerminal() {
    var termWindow = document.getElementById('terminal-window');
    var termInput = document.getElementById('terminal-input');
    if (termWindow.style.display === 'none' || termWindow.style.display === '') {
        termWindow.style.display = 'flex';
        document.getElementById('chatbot-window').style.display = 'none';
        if (termInput) termInput.focus();
    } else {
        termWindow.style.display = 'none';
    }
}

function handleTermEnter(e) {
    if (e.key === 'Enter') {
        const termInput = document.getElementById('terminal-input');
        const cmd = termInput.value.trim();
        if (!cmd) return;
        printTerm("> " + cmd);
        termInput.value = '';
        processCommand(cmd.toLowerCase());
    }
}

function printTerm(text) {
    const content = document.getElementById('terminal-content');
    const div = document.createElement('div');
    div.innerHTML = text;
    content.appendChild(div);
    content.scrollTop = content.scrollHeight;
}

function processCommand(cmd) {
    if (cmd === 'help') {
        printTerm("Mevcut Komutlar: <br>- <b>whoami</b>: Kullanıcı bilgisi <br>- <b>projects</b>: Proje listesi <br>- <b>clear</b>: Ekranı temizle <br>- <b>matrix</b>: Sürpriz :)");
    } else if (cmd === 'whoami') {
        printTerm("Kullanıcı: Ömer Can Sarı <br>Rol: İstatistik ve Bilgisayar Bilimleri Öğrencisi <br>Odak: Backend & Veri Bilimi");
    } else if (cmd === 'projects') {
        printTerm("1. CineScope (Yapay Zeka)<br>2. Akıllı Gözlük (Gömülü Sistem)<br>3. Restoran Yönetimi (C++)");
    } else if (cmd === 'clear') {
        document.getElementById('terminal-content').innerHTML = '';
    } else if (cmd === 'matrix') {
        printTerm("Sisteme sızılıyor... Şaka şaka. Sadece portfolyo sitesindesin.");
    } else {
        printTerm("Hata: Komut bulunamadı -> '" + cmd + "'. 'help' yazarak komutları gör.");
    }
}