// iChannels 廣告追蹤系統 - 共享組件
// 用於所有獨立服務網站

const ICHANNELS_CONFIG = {
    memberId: '3QWtn',
    trackingEnabled: true,
    debug: true
};

// 廣告類別對應（根據Stone提供的資料）
const AD_CATEGORIES = {
    31: '家居生活',
    34: '美容保養',
    37: '書籍雜誌',
    40: '休閒影音',
    42: '教育學習',
    43: '其他類別',
    52: '運動戶外'
};

const AD_TYPES = {
    1: '推廣貼紙',
    6: '促銷活動',
    7: 'Landing Page'
};

// 服務對應廣告類別
const SERVICE_AD_MAPPING = {
    destiny: { // 天機閣
        name: '天機閣',
        categories: [37, 42, 43], // 書籍雜誌、教育學習、其他類別
        adTypes: [1, 7],
        description: '命理書籍、開運物品、心靈課程'
    },
    face: { // 變臉坊
        name: '變臉坊',
        categories: [34, 42], // 美容保養、教育學習
        adTypes: [1, 6],
        description: '攝影器材、美妝產品、影像軟體'
    },
    tarot: { // 塔羅堂
        name: '塔羅堂',
        categories: [37, 40], // 書籍雜誌、休閒影音
        adTypes: [1, 7],
        description: '塔羅牌組、心靈課程、冥想工具'
    },
    star: { // 星象館
        name: '星象館',
        categories: [37, 40], // 書籍雜誌、休閒影音
        adTypes: [1, 6],
        description: '星座商品、天文器材、星空攝影'
    },
    mind: { // 心靈角落
        name: '心靈角落',
        categories: [31, 52], // 家居生活、運動戶外
        adTypes: [1, 7],
        description: '冥想工具、健康食品、瑜伽課程'
    }
};

// 載入iChannels追蹤腳本
function loadIChannelsTracking() {
    if (!ICHANNELS_CONFIG.trackingEnabled) return;
    
    console.log('🔍 載入iChannels追蹤系統...');
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
        var oeya_member = "${ICHANNELS_CONFIG.memberId}";
        var oeya_uid1 = "";
        var oeya_uid2 = "";
        var oeya_uid3 = "";
        var oeya_uid4 = "";
        var oeya_uid5 = "";
        var pkBaseURL = (("https:" == document.location.protocol) ? "https://www.conn.tw/" : "http://crazykiwi.net/");
        document.write(unescape("%3Cscript src='" + pkBaseURL + "/track/script/oeya_member_url.js' type='text/javascript'%3E%3C/script%3E"));
    `;
    
    document.head.appendChild(script);
    
    if (ICHANNELS_CONFIG.debug) {
        console.log('✅ iChannels追蹤腳本載入完成');
        console.log(`📊 會員ID: ${ICHANNELS_CONFIG.memberId}`);
    }
}

// 廣告點擊追蹤
function trackAdClick(adData) {
    const {
        adId,
        service,
        category,
        adType,
        price,
        commission,
        title
    } = adData;
    
    if (!ICHANNELS_CONFIG.trackingEnabled) return;
    
    const trackData = {
        adId,
        service: service || 'unknown',
        category: category || 'unknown',
        adType: adType || 'unknown',
        memberId: ICHANNELS_CONFIG.memberId,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // 記錄到控制台（開發用）
    if (ICHANNELS_CONFIG.debug) {
        console.log('🎯 廣告點擊追蹤:', trackData);
        console.log(`  商品: ${title || adId}`);
        console.log(`  價格: ${price || 'N/A'}`);
        console.log(`  佣金: ${commission || 'N/A'}`);
    }
    
    // 發送到後台記錄（可選）
    sendTrackingData(trackData);
    
    // iChannels追蹤腳本會自動處理主要追蹤
    return true;
}

// 發送追蹤數據到後台
function sendTrackingData(data) {
    // 這裡可以發送到自己的後台進行額外記錄
    // 例如：記錄點擊統計、分析轉換率等
    
    if (ICHANNELS_CONFIG.debug) {
        console.log('📤 發送追蹤數據:', data);
    }
    
    // 範例：發送到本地API
    /*
    fetch('/api/track-ad-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(err => {
        if (ICHANNELS_CONFIG.debug) {
            console.log('追蹤數據發送失敗:', err);
        }
    });
    */
}

// 建立廣告連結
function createAdLink(baseUrl, params = {}) {
    const defaultParams = {
        member: ICHANNELS_CONFIG.memberId,
        ref: 'portal-system',
        timestamp: Date.now()
    };
    
    const allParams = { ...defaultParams, ...params };
    const queryString = new URLSearchParams(allParams).toString();
    
    return `${baseUrl}?${queryString}`;
}

// 取得服務廣告配置
function getServiceAdConfig(serviceKey) {
    return SERVICE_AD_MAPPING[serviceKey] || {
        name: '未知服務',
        categories: [43], // 其他類別
        adTypes: [1], // 推廣貼紙
        description: '通用商品'
    };
}

// 取得類別名稱
function getCategoryName(categoryId) {
    return AD_CATEGORIES[categoryId] || '其他類別';
}

// 取得類型名稱
function getAdTypeName(typeId) {
    return AD_TYPES[typeId] || '推廣廣告';
}

// 初始化廣告追蹤系統
function initAdTracking() {
    console.log('🚀 初始化iChannels廣告追蹤系統');
    
    // 載入追蹤腳本
    loadIChannelsTracking();
    
    // 設定全局追蹤函數
    window.trackIChannelsAd = trackAdClick;
    window.getAdConfig = getServiceAdConfig;
    window.createAdLink = createAdLink;
    
    console.log('✅ iChannels廣告追蹤系統初始化完成');
    console.log(`📊 可用服務: ${Object.keys(SERVICE_AD_MAPPING).join(', ')}`);
    
    return true;
}

// 頁面載入完成後初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdTracking);
} else {
    initAdTracking();
}

// 提供全局訪問
window.IChannelsTracker = {
    config: ICHANNELS_CONFIG,
    track: trackAdClick,
    getServiceConfig: getServiceAdConfig,
    getCategoryName,
    getAdTypeName,
    createLink: createAdLink,
    init: initAdTracking
};