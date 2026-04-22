// 廣告輪播系統
// 目標：讓同一個推廣碼展示不同商品，提高點擊率

const adRotator = {
    // 基礎推廣碼
    basePromoCode: 'https://shoppingfun.co/3QW_R',
    
    // 不同展示版本
    variations: [
        {
            id: 'variation-1',
            title: '佳瑪大罩杯內衣推薦',
            description: '舒適透氣內衣，限時優惠中',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
            category: '服飾內衣'
        },
        {
            id: 'variation-2', 
            title: '舒適居家內衣',
            description: '適合居家穿著，柔軟親膚',
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
            category: '居家服飾'
        },
        {
            id: 'variation-3',
            title: '限時優惠內衣',
            description: '精選款式，特價優惠',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop',
            category: '特價商品'
        },
        {
            id: 'variation-4',
            title: '新款內衣上市',
            description: '最新款式，時尚設計',
            image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=250&fit=crop',
            category: '新品上市'
        }
    ],
    
    // 取得隨機廣告版本
    getRandomAd: function() {
        const randomIndex = Math.floor(Math.random() * this.variations.length);
        const variation = this.variations[randomIndex];
        
        return {
            ...variation,
            link: this.basePromoCode,
            timestamp: new Date().toISOString()
        };
    },
    
    // 取得特定廣告版本
    getAdById: function(id) {
        const variation = this.variations.find(v => v.id === id);
        if (!variation) return this.getRandomAd();
        
        return {
            ...variation,
            link: this.basePromoCode,
            timestamp: new Date().toISOString()
        };
    },
    
    // 更新頁面上的廣告
    updatePageAds: function() {
        // 更新天機閣廣告
        const destinyAd = this.getRandomAd();
        if (window.updateDestinyAd) {
            window.updateDestinyAd(destinyAd);
        }
        
        // 更新結果頁廣告
        const resultAd = this.getRandomAd();
        if (window.updateResultAd) {
            window.updateResultAd(resultAd);
        }
        
        // 記錄輪播
        this.logRotation(destinyAd.id, resultAd.id);
        
        return { destinyAd, resultAd };
    },
    
    // 記錄輪播
    logRotation: function(destinyId, resultId) {
        const log = {
            timestamp: new Date().toISOString(),
            destinyAd: destinyId,
            resultAd: resultId,
            promoCode: this.basePromoCode
        };
        
        // 儲存到 localStorage（簡單記錄）
        try {
            const logs = JSON.parse(localStorage.getItem('adRotations') || '[]');
            logs.push(log);
            if (logs.length > 100) logs.shift(); // 只保留最近100筆
            localStorage.setItem('adRotations', JSON.stringify(logs));
        } catch (e) {
            console.error('無法記錄廣告輪播:', e);
        }
    },
    
    // 取得輪播統計
    getStats: function() {
        try {
            const logs = JSON.parse(localStorage.getItem('adRotations') || '[]');
            const stats = {
                totalRotations: logs.length,
                variationsUsed: {},
                lastRotation: logs[logs.length - 1]
            };
            
            // 計算各版本使用次數
            logs.forEach(log => {
                stats.variationsUsed[log.destinyAd] = (stats.variationsUsed[log.destinyAd] || 0) + 1;
                stats.variationsUsed[log.resultAd] = (stats.variationsUsed[log.resultAd] || 0) + 1;
            });
            
            return stats;
        } catch (e) {
            return { totalRotations: 0, variationsUsed: {}, lastRotation: null };
        }
    }
};

// 導出給其他腳本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = adRotator;
} else {
    window.adRotator = adRotator;
}
