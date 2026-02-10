/* script.js - 画像拡大＆透かし＆イラスト配置 (修正版) */

document.addEventListener('DOMContentLoaded', function() {
    
    // ▼▼▼ 1. 画像拡大と透かし機能 (そのまま) ▼▼▼
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("expandedImg");
    var modalVideo = document.getElementById("expandedVideo");
    var watermarkContainer = document.getElementById("watermarkContainer");
    
    if (modal) {
        var watermarkText = `
            もる✩.*˚<br>
            @ocean_mol
        `;
        var items = document.querySelectorAll(".work-item img, .work-item video, .gallery-item img, .gallery-item video");
        items.forEach(function(item) {
            item.onclick = function() {
                if (this.parentElement.tagName === 'A') return;
                modal.style.display = "flex";
                createWatermarks();
                if (this.tagName === 'IMG') {
                    if (modalImg) {
                        modalImg.style.display = "block";
                        modalImg.src = this.src;
                    }
                    if (modalVideo) modalVideo.style.display = "none";
                } else if (this.tagName === 'VIDEO') {
                    if (modalImg) modalImg.style.display = "none";
                    if (modalVideo) {
                        modalVideo.style.display = "block";
                        modalVideo.src = this.src;
                        modalVideo.play();
                    }
                }
            }
        });
        function createWatermarks() {
            if (!watermarkContainer) return;
            watermarkContainer.innerHTML = '';
            for (var i = 0; i < 12; i++) {
                var div = document.createElement('div');
                div.className = 'watermark-unit';
                div.innerHTML = watermarkText;
                watermarkContainer.appendChild(div);
            }
        }
        var closeBtn = document.getElementsByClassName("close-btn")[0];
        function closeModal() {
            modal.style.display = "none";
            if(modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        }
        if (closeBtn) closeBtn.onclick = closeModal;
        modal.onclick = function(event) {
            if (event.target === modal) closeModal();
        }
    }

// ▼▼▼ 2. イラスト画像を配置する機能 (側面＆手前表示版) ▼▼▼
    
    // ★画像ファイル名を設定
    const imageList = [
        'images/27197398.png', 
    ];

    const decoCount = 4; // 星の数

    const decoContainer = document.createElement('div');
    decoContainer.classList.add('deco-layer');
    document.body.appendChild(decoContainer);

    const sectionHeight = 100 / decoCount;

    for (let i = 0; i < decoCount; i++) {
        const img = document.createElement('img');
        img.classList.add('deco-illust');

        const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
        img.src = randomImage;
        
        // --- 位置の計算 ---

        if (i % 2 === 0) { 
            // 左側 (端から0%〜5%)
            const xPercent = Math.random() * 5;
            img.style.left = `${xPercent}%`;
            img.style.right = 'auto';
        } else {
            // 右側 (端から0%〜5%)
            const xPercent = Math.random() * 5;
            img.style.right = `${xPercent}%`;
            img.style.left = 'auto';
        }

        // 縦の位置
        const yAreaStart = i * sectionHeight;
        const yRandomOffset = Math.random() * (sectionHeight * 0.8); 
        const yPercent = yAreaStart + yRandomOffset;

        img.style.top = `${yPercent}%`;
        
        // 角度をランダムに
        const rotation = Math.random() * 30 - 15;
        img.style.transform = `rotate(${rotation}deg)`;

        decoContainer.appendChild(img);
    }
});

/* --- ハンバーガーメニューの開閉 --- */
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const globalNav = document.getElementById('globalNav');
    
    if (menuBtn && globalNav) {
        // ボタンクリックで開閉切り替え
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('open');
            globalNav.classList.toggle('open');
        });

        // メニュー内のリンクをクリックしたら閉じる
        const navLinks = globalNav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuBtn.classList.remove('open');
                globalNav.classList.remove('open');
            });
        });
    }
});