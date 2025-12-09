document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const audio = document.getElementById('lamp-audio');
    const desktopBtn = document.getElementById('desktop-btn');
    const mobileBtn = document.getElementById('mobile-btn');
    const lampGlow = document.getElementById('lamp-glow');
    const lampBulb = document.getElementById('lamp-bulb');
    const lampContainer = document.getElementById('lamp-container');
    const loveMessage = document.getElementById('love-message');

    // Variables de estado
    let lampOn = false;
    let lampAnimated = false;

    // Texto original del mensaje
    const originalMessage = loveMessage ? loveMessage.textContent : '';

    // Función para el efecto máquina de escribir
    function typeLoveMessage() {
        if (!loveMessage) return;
        loveMessage.textContent = '';
        loveMessage.style.opacity = '1';
        let i = 0;
        function type() {
            if (i <= originalMessage.length) {
                loveMessage.textContent = originalMessage.slice(0, i);
                i++;
                setTimeout(type, 80);
            }
        }
        setTimeout(type, 500);
    }

    // Función para resetear el mensaje
    function resetLoveMessage() {
        if (!loveMessage) return;
        loveMessage.textContent = '';
        loveMessage.style.opacity = '0';
    }

    // Función principal para alternar lámpara y música
    function toggleLampAndMusic() {
        lampOn = !lampOn;

        // Cambiar botones (desktop + mobile)
        const buttons = [desktopBtn, mobileBtn].filter(btn => btn);
        buttons.forEach(btn => {
            if (lampOn) {
                btn.classList.add('on');
                btn.querySelector('span').textContent = 'ON';
            } else {
                btn.classList.remove('on');
                btn.querySelector('span').textContent = 'OFF';
            }
        });

        // Lógica al encender
        if (lampOn) {
            document.body.classList.add('lamp-on', 'light-on');
            lampContainer.classList.add('lamp-on');

            // 🔊 Reproducir música correctamente
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(err => {
                    console.log("Autoplay bloqueado, esperando interacción...");
                });
            }

            // Animación para móvil
            if (window.innerWidth <= 600) {
                if (!lampAnimated) {
                    lampAnimated = true;
                    lampContainer.classList.add('lamp-down');
                }
            }

            // Mensaje romántico con delay
            setTimeout(() => typeLoveMessage(), window.innerWidth <= 600 ? 3000 : 1000);

        } else {
            // Lógica al apagar
            document.body.classList.remove('lamp-on', 'light-on');
            lampContainer.classList.remove('lamp-on');

            // 🔇 Apagar música
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            resetLoveMessage();
        }
    }

    // Eventos para botones de escritorio y móvil
    if (desktopBtn) {
        desktopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLampAndMusic();
        });
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLampAndMusic();
        });

        mobileBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLampAndMusic();
        });
    }

    // Inicializar mensaje oculto
    resetLoveMessage();
});
