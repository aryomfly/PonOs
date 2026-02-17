// ============================================
// УПРАВЛЕНИЕ ВЕРСИЯМИ PONOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки версий
    const versionButtons = document.querySelectorAll('.version-btn');
    
    // Получаем сохраненную версию из localStorage
    const savedVersion = localStorage.getItem('ponos-version') || 'light';
    
    // Применяем сохраненную версию при загрузке
    setVersion(savedVersion);
    
    // Добавляем обработчики событий на все кнопки
    versionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const version = this.getAttribute('data-version');
            setVersion(version);
            // Сохраняем выбор в localStorage
            localStorage.setItem('ponos-version', version);
        });
    });
    
    // Обработчик для CTA кнопки
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.getElementById('download').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Обработчики для кнопок загрузки
    const downloadBtns = document.querySelectorAll('.large-btn');
    downloadBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            showDownloadAlert(this.textContent);
        });
    });
    
    // Обработчики для card buttons
    const cardDownloadBtns = document.querySelectorAll('.download-btn');
    cardDownloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showDownloadAlert(this.textContent);
        });
    });
});

// Функция для установки версии
function setVersion(version) {
    // Удаляем все классы версий
    document.body.classList.remove('light', 'standard', 'ultra', 'gaming');
    
    // Добавляем новый класс
    document.body.classList.add(version);
    
    // Обновляем активную кнопку
    const allButtons = document.querySelectorAll('.version-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-version') === version) {
            btn.classList.add('active');
        }
    });
    
    // Показываем уведомление о смене темы
    showVersionNotification(version);
}

// Функция для показа уведомления о версии
function showVersionNotification(version) {
    const versionNames = {
        'light': '☀️ Light Edition',
        'standard': '⚙️ Standard Edition',
        'ultra': '⚡ Ultra Edition',
        'gaming': '🎮 Gaming Edition'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 15px 25px;
        background: linear-gradient(135deg, var(--current-primary), var(--current-accent));
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        font-weight: 600;
    `;
    
    notification.textContent = `✓ Тема изменена: ${versionNames[version]}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Функция для показа уведомления о загрузке
function showDownloadAlert(buttonText) {
    const version = buttonText.trim();
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        text-align: center;
        min-width: 350px;
        animation: slideInUp 0.5s ease;
    `;
    
    alert.innerHTML = `
        <h3 style="margin-bottom: 15px; color: var(--current-primary);">Начало загрузки</h3>
        <p style="margin-bottom: 20px; color: #666;">Вы скачиваете: <strong>${version}</strong></p>
        <p style="margin-bottom: 20px; color: #999; font-size: 14px;">Загрузка начнется в скором времени...</p>
        <button onclick="this.parentElement.remove()" style="
            padding: 10px 30px;
            background: var(--current-primary);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        ">Закрыть</button>
    `;
    
    alert.onmouseenter = function() {
        this.querySelector('button').style.transform = 'scale(1.05)';
    };
    
    alert.onmouseleave = function() {
        this.querySelector('button').style.transform = 'scale(1)';
    };
    
    document.body.appendChild(alert);
    
    // Автоматически закрываем через 5 секунд
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }
    }, 5000);
}

// Навигация по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Эффект параллакса для hero секции
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-visual');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    
    // Анимация элементов при прокрутке
    const elements = document.querySelectorAll('[class*="card"], [class*="item"]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Добавляем анимацию при загрузке страницы
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.feature-card, .version-card, .gallery-item, .benefit-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Отзывчивая навигация
function handleResponsiveNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navLogo = document.querySelector('.nav-logo');
    
    if (window.innerWidth <= 480) {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
}

window.addEventListener('resize', handleResponsiveNav);
window.addEventListener('load', handleResponsiveNav);

// Счетчик посетителей (простой пример)
function initVisitorCounter() {
    let visitors = localStorage.getItem('ponos-visitors') || '0';
    visitors = parseInt(visitors) + 1;
    localStorage.setItem('ponos-visitors', visitors);
    
    console.log(`👋 Добро пожаловать! Это визит №${visitors}`);
}

initVisitorCounter();

// Клавиатурные сокращения
document.addEventListener('keydown', function(e) {
    // Alt + L - Light версия
    if (e.altKey && e.key === 'l') {
        setVersion('light');
        localStorage.setItem('ponos-version', 'light');
    }
    // Alt + S - Standard версия
    if (e.altKey && e.key === 's') {
        setVersion('standard');
        localStorage.setItem('ponos-version', 'standard');
    }
    // Alt + U - Ultra версия
    if (e.altKey && e.key === 'u') {
        setVersion('ultra');
        localStorage.setItem('ponos-version', 'ultra');
    }
    // Alt + G - Gaming версия
    if (e.altKey && e.key === 'g') {
        setVersion('gaming');
        localStorage.setItem('ponos-version', 'gaming');
    }
});

// Конфетти эффект при клике на версию (для веселья!)
function createConfetti() {
    const colors = ['#ffd700', '#00d4ff', '#a644ff', '#ff006e'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            opacity: 0.8;
            z-index: 999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        const duration = 2000 + Math.random() * 1000;
        const xOffset = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 0.8 },
            { transform: `translateY(${window.innerHeight}px) translateX(${xOffset}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => confetti.remove(), duration);
    }
}

// Добавляем конфетти при клике на версию
document.querySelectorAll('.version-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            createConfetti();
        }
    });
});

// Проверка браузера и совместимости
function checkBrowserCompatibility() {
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isEdge = /Edge/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    
    console.log('🖥️ Браузер: ' + (isChrome ? 'Chrome' : isFirefox ? 'Firefox' : isEdge ? 'Edge' : isSafari ? 'Safari' : 'Другой'));
    console.log('✅ PonOS полностью поддерживается вашим браузером!');
}

checkBrowserCompatibility();

// Запись в консоль приветствия в зависимости от версии
function logVersionInfo() {
    const version = localStorage.getItem('ponos-version') || 'light';
    const messages = {
        'light': '☀️ Вы в режиме Light - идеально для дневной работы',
        'standard': '⚙️ Вы в режиме Standard - универсальное решение',
        'ultra': '⚡ Вы в режиме Ultra - максимум возможностей',
        'gaming': '🎮 Вы в режиме Gaming - приготовьтесь к эпическим впечатлениям!'
    };
    
    console.log('%cPonOS v7.0', 'font-size: 20px; font-weight: bold; color: #0066cc;');
    console.log('%c' + messages[version], 'font-size: 14px; color: #00d4ff;');
    console.log('%cКлавиатурные сокращения: Alt+L, Alt+S, Alt+U, Alt+G', 'font-size: 12px; color: #999;');
}

logVersionInfo();
