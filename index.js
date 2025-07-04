let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll=()=>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >=offset && top < offset +height){
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })

    let header = DocumentTimeline.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
})

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'})
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom'})
ScrollReveal().reveal('.home-content h1, .about-img ', { origin: 'left'})
ScrollReveal().reveal('.home-content p, .about-content ', { origin: 'right'})

const typed = new Typed('.multiple-text', {
    strings: ['Full-Stack Developer', 'Computer Science', 'Gaming', 'Blogger'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

// Ensure DOM is ready before running AI assistant logic
window.addEventListener('DOMContentLoaded', function() {
    // AI Assistant Widget Logic
    const widget = document.getElementById('ai-assistant-widget');
    const toggleBtn = document.getElementById('ai-assistant-toggle');
    const closeBtn = document.getElementById('ai-assistant-close');
    const form = document.getElementById('ai-assistant-form');
    const input = document.getElementById('ai-assistant-input');
    const messages = document.getElementById('ai-assistant-messages');

    // Show/hide widget
    function showWidget() {
        widget.style.display = 'flex';
        widget.style.flexDirection = 'column';
        toggleBtn.style.display = 'none';
        input.focus();
    }
    function hideWidget() {
        widget.style.display = 'none';
        toggleBtn.style.display = 'flex';
    }
    if (toggleBtn) toggleBtn.onclick = showWidget;
    if (closeBtn) closeBtn.onclick = hideWidget;

    // Responsive: close on outside click (mobile)
    document.addEventListener('click', function(e) {
        if (widget.style.display === 'flex' && !widget.contains(e.target) && e.target !== toggleBtn) {
            hideWidget();
        }
    });
    // Responsive: resize widget on window resize
    function adjustWidget() {
        if (window.innerWidth < 500) {
            widget.style.width = '98vw';
            widget.style.right = '1vw';
            widget.style.bottom = '80px';
        } else {
            widget.style.width = '340px';
            widget.style.right = '32px';
            widget.style.bottom = '100px';
        }
    }
    window.addEventListener('resize', adjustWidget);
    adjustWidget();

    // Add message to chat
    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = 'ai-message ' + sender;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    // Simulate AI response
    async function getAIResponse(userText) {
        // Use OpenAI GPT-3.5/4 API (replace YOUR_API_KEY with your real key)
        // This is a demo: in production, use a backend to keep your API key safe!
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        const apiKey = 'YOUR_API_KEY'; // <-- Replace with your OpenAI API key
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        const body = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant for a portfolio website.' },
                { role: 'user', content: userText }
            ]
        });
        try {
            const res = await fetch(endpoint, { method: 'POST', headers, body });
            const data = await res.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content.trim();
            } else {
                return "Sorry, I couldn't get a response from GPT.";
            }
        } catch (e) {
            return "Error contacting AI service.";
        }
    }

    // Handle form submit
    form.onsubmit = async function(e) {
        e.preventDefault();
        const userText = input.value.trim();
        if(!userText) return;
        addMessage(userText, 'user');
        input.value = '';
        addMessage('Thinking...', 'bot');
        const aiText = await getAIResponse(userText);
        // Remove the 'Thinking...' message
        const lastMsg = messages.querySelector('.ai-message.bot:last-child');
        if (lastMsg && lastMsg.textContent === 'Thinking...') {
            lastMsg.remove();
        }
        addMessage(aiText, 'bot');
    };

    // Optionally, open on Ctrl+Shift+A
    document.addEventListener('keydown', function(e) {
        if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            widget.style.display = 'flex';
            toggleBtn.style.display = 'none';
            input.focus();
        }
    });
});