// 廣告載入系統 - 完全動態生成
class AdLoader {
    constructor() {
        this.adsLoaded = false;
    }
    
    // 載入廣告資料
    loadAds() {
        return new Promise((resolve, reject) => {
            // 檢查是否已載入
            if (window.portalAds && window.destinyAds && window.resultAds) {
                this.adsLoaded = true;
                resolve();
                return;
            }
            
            // 載入 ads.js
            const script = document.createElement('script');
            script.src = 'ads/ads.js';
            script.onload = () => {
                this.adsLoaded = true;
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // 動態生成廣告卡片
    createAdCard(adData, type = 'destiny') {
        const card = document.createElement('div');
        card.className = type === 'destiny' ? 'ad-card' : 'service-card';
        
        if (type === 'destiny') {
            card.innerHTML = `
                <img src="${adData.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop'}" 
                     alt="${adData.title || '推薦商品'}" 
                     class="ad-image">
                <div class="ad-content">
                    <h4>${adData.title || '商品標題'}</h4>
                    <p>${adData.description || '商品描述'}</p>
                    <a href="${adData.link || '#'}" target="_blank" class="ad-link">了解更多</a>
                </div>
            `;
        } else if (type === 'portal') {
            card.innerHTML = `
                <img src="${adData.image || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop'}" 
                     alt="${adData.title || '熱門商品'}">
                <h4>${adData.title || '商品標題'}</h4>
                <p>${adData.description || '商品描述'}</p>
            `;
        }
        
        return card;
    }
    
    // 渲染天機閣廣告
    renderDestinyAds() {
        if (!window.destinyAds || !this.adsLoaded) return;
        
        const container = document.getElementById('destiny-ad-container');
        if (!container) return;
        
        // 清空容器
        container.innerHTML = '';
        
        // 動態生成廣告卡片
        window.destinyAds.forEach(ad => {
            const card = this.createAdCard(ad, 'destiny');
            container.appendChild(card);
        });
    }
    
    // 渲染入口網站廣告
    renderPortalAds() {
        if (!window.portalAds || !this.adsLoaded) return;
        
        const container = document.getElementById('portal-ad-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        window.portalAds.forEach(ad => {
            const card = this.createAdCard(ad, 'portal');
            container.appendChild(card);
        });
    }
    
    // 初始化
    async init() {
        try {
            await this.loadAds();
            this.renderDestinyAds();
            this.renderPortalAds();
            console.log('廣告載入完成');
        } catch (error) {
            console.error('廣告載入失敗:', error);
        }
    }
}

// 建立全域實例
window.adLoader = new AdLoader();

// 自動初始化
document.addEventListener('DOMContentLoaded', () => {
    window.adLoader.init();
});
