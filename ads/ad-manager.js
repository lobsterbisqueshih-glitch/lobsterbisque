// 廣告管理系統 - 主動優化版本
class AdManager {
    constructor() {
        this.ads = {};
        this.performance = {};
        this.sources = {};
        this.init();
    }
    
    async init() {
        // 1. 載入廣告資料
        await this.loadAds();
        
        // 2. 初始化監控
        this.initMonitoring();
        
        // 3. 初始化輪播
        this.initRotation();
        
        // 4. 初始化多來源
        this.initSources();
        
        console.log('廣告管理系統已啟動');
    }
    
    // 載入廣告資料
    async loadAds() {
        try {
            // 動態載入 ads.js
            await this.loadScript('ads/ads.js');
            
            this.ads = {
                portal: window.portalAds || [],
                destiny: window.destinyAds || [],
                result: window.resultAds || []
            };
            
            console.log(`載入廣告: ${this.ads.portal.length}入口, ${this.ads.destiny.length}天機閣, ${this.ads.result.length}結果頁`);
        } catch (error) {
            console.error('載入廣告失敗:', error);
        }
    }
    
    // 廣告輪播系統
    initRotation() {
        this.rotation = {
            currentIndex: {},
            history: {},
            stats: {}
        };
        
        // 為每個廣告位置建立輪播
        ['portal', 'destiny', 'result'].forEach(type => {
            this.rotation.currentIndex[type] = 0;
            this.rotation.history[type] = [];
            this.rotation.stats[type] = {};
        });
    }
    
    // 廣告監控系統
    initMonitoring() {
        this.monitoring = {
            lastCheck: Date.now(),
            failures: {},
            alerts: []
        };
        
        // 每日檢查廣告連結
        setInterval(() => this.checkAdLinks(), 24 * 60 * 60 * 1000);
        
        // 每小時檢查效能
        setInterval(() => this.checkPerformance(), 60 * 60 * 1000);
    }
    
    // 多廣告來源系統
    initSources() {
        this.sources = {
            active: 'iChannels',
            available: ['iChannels', 'AmazonAssociates', 'AffiliateNetwork', 'GoogleAdSense'],
            config: {}
        };
        
        // 載入來源配置
        this.loadSourceConfig();
    }
    
    // 取得輪播廣告
    getRotatedAd(type = 'destiny', position = 0) {
        if (!this.ads[type] || this.ads[type].length === 0) {
            return this.getFallbackAd();
        }
        
        const index = this.rotation.currentIndex[type];
        const ad = this.ads[type][index];
        
        // 更新輪播索引
        this.rotation.currentIndex[type] = (index + 1) % this.ads[type].length;
        
        // 記錄歷史
        this.rotation.history[type].push({
            timestamp: Date.now(),
            adId: ad.id,
            position: position
        });
        
        return ad;
    }
    
    // 檢查廣告連結有效性
    async checkAdLinks() {
        console.log('檢查廣告連結有效性...');
        
        const allAds = [...this.ads.portal, ...this.ads.destiny, ...this.ads.result];
        const results = [];
        
        for (const ad of allAds) {
            try {
                const isValid = await this.validateAdLink(ad.link);
                results.push({
                    adId: ad.id,
                    link: ad.link,
                    valid: isValid,
                    timestamp: Date.now()
                });
                
                if (!isValid) {
                    this.monitoring.failures[ad.id] = (this.monitoring.failures[ad.id] || 0) + 1;
                    this.sendAlert(`廣告連結失效: ${ad.title} (${ad.link})`);
                }
            } catch (error) {
                console.error(`檢查廣告失敗 ${ad.id}:`, error);
            }
        }
        
        this.monitoring.lastCheck = Date.now();
        this.saveMonitoringResults(results);
        
        return results;
    }
    
    // 檢查效能
    async checkPerformance() {
        // 這裡可以整合 Google Analytics 或自建追蹤
        console.log('檢查廣告效能...');
        
        // 模擬效能檢查
        const performance = {
            timestamp: Date.now(),
            totalAds: Object.values(this.ads).reduce((sum, arr) => sum + arr.length, 0),
            rotations: Object.values(this.rotation.history).reduce((sum, arr) => sum + arr.length, 0),
            failures: Object.keys(this.monitoring.failures).length
        };
        
        this.performance = performance;
        this.savePerformanceData(performance);
    }
    
    // 取得備用廣告
    getFallbackAd() {
        return {
            id: 'fallback-ad',
            title: '精選推薦',
            description: '為您挑選優質商品',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
            link: '#',
            category: '備用廣告'
        };
    }
    
    // 驗證廣告連結
    async validateAdLink(url) {
        if (!url || url === '#') return false;
        
        try {
            const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
            return true;
        } catch (error) {
            // 嘗試其他驗證方法
            return await this.validateWithProxy(url);
        }
    }
    
    // 使用代理驗證
    async validateWithProxy(url) {
        // 這裡可以實現更複雜的驗證邏輯
        return true; // 暫時返回 true
    }
    
    // 發送警報
    sendAlert(message) {
        this.monitoring.alerts.push({
            timestamp: Date.now(),
            message: message,
            read: false
        });
        
        console.warn(`廣告警報: ${message}`);
        
        // 這裡可以整合 Telegram 或郵件通知
        // this.sendTelegramAlert(message);
    }
    
    // 載入來源配置
    async loadSourceConfig() {
        try {
            // 嘗試載入外部來源配置
            const response = await fetch('ads/sources.json');
            if (response.ok) {
                this.sources.config = await response.json();
            }
        } catch (error) {
            // 使用預設配置
            this.sources.config = {
                iChannels: { enabled: true, priority: 1 },
                AmazonAssociates: { enabled: false, priority: 2, needsSetup: true },
                AffiliateNetwork: { enabled: false, priority: 3, needsSetup: true },
                GoogleAdSense: { enabled: false, priority: 4, needsSetup: true }
            };
        }
    }
    
    // 輔助方法
    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    saveMonitoringResults(results) {
        // 儲存到 localStorage 或發送到後端
        try {
            localStorage.setItem('ad-monitoring-results', JSON.stringify(results));
        } catch (error) {
            console.error('儲存監控結果失敗:', error);
        }
    }
    
    savePerformanceData(data) {
        try {
            const history = JSON.parse(localStorage.getItem('ad-performance-history') || '[]');
            history.push(data);
            if (history.length > 100) history.shift();
            localStorage.setItem('ad-performance-history', JSON.stringify(history));
        } catch (error) {
            console.error('儲存效能數據失敗:', error);
        }
    }
    
    // 公開方法
    getAds(type = 'destiny') {
        return this.ads[type] || [];
    }
    
    getNextAd(type = 'destiny') {
        return this.getRotatedAd(type);
    }
    
    getAlerts() {
        return this.monitoring.alerts.filter(alert => !alert.read);
    }
    
    getStats() {
        return {
            ads: {
                total: Object.values(this.ads).reduce((sum, arr) => sum + arr.length, 0),
                byType: Object.keys(this.ads).reduce((obj, key) => {
                    obj[key] = this.ads[key].length;
                    return obj;
                }, {})
            },
            rotation: this.rotation.stats,
            monitoring: {
                lastCheck: this.monitoring.lastCheck,
                failures: this.monitoring.failures,
                alerts: this.monitoring.alerts.length
            },
            performance: this.performance
        };
    }
}

// 建立全域實例
window.adManager = new AdManager();

// 導出給其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdManager;
}