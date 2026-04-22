/**
 * ads.js - iChannels 廣告資料庫
 * 
 * 獨立於系統邏輯，廣告資料變更只需編輯此檔案
 * 更換廣告商也只需替換此檔案
 * 
 * 維護者: 龍蝦粥
 * 最後更新: 2026-04-22
 * 
 * 推廣碼來源: iChannels通路王
 * 會員ID: 3QWtn
 * 短網址格式: {domain}/{MEMBER_ID}_{品牌代碼}
 */

// ============================================================
// 入口網站廣告
// ============================================================
const portalAds = [
    {
        id: 'portal-ad-1',
        title: '暢銷書籍推薦',
        description: '各類熱門書籍，知識與娛樂兼具',
        category: '書籍雜誌',
        link: 'https://shoppingfun.co/3QW_R'
    },
    {
        id: 'portal-ad-2',
        title: '熱門商品精選',
        description: '優質商品，限時優惠中',
        category: '限時優惠',
        link: 'https://dreamstore.info/3QW_X'
    },
    {
        id: 'portal-ad-3',
        title: '生活好物推薦',
        description: '提升生活品質的優選好物',
        category: '生活好物',
        link: 'https://www1.gamepark.com.tw/3QW_Y'
    },
    {
        id: 'portal-ad-4',
        title: '人氣商品推薦',
        description: '大家都在買的熱門商品',
        category: '人氣推薦',
        link: 'https://igrape.net/3QW_a'
    }
];

// ============================================================
// 天機閣廣告（使用新發現的有效推廣碼）
// ============================================================
const destinyAds = [
    {
        id: 'destiny-ad-1',
        title: '佳瑪大罩杯內衣推薦',
        description: '舒適透氣內衣，限時優惠中',
        category: '服飾內衣',
        service: '生活用品',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
        link: 'https://shoppingfun.co/3QW_R'  // 保留這個，內容完整
    },
    {
        id: 'destiny-ad-2',
        title: '精選生活用品',
        description: '高品質生活用品，提升日常體驗',
        category: '生活百貨',
        service: '生活用品',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
        link: 'https://shoppingfun.co/3QW_W'  // 新發現的有效推廣碼
    },
    {
        id: 'destiny-ad-3',
        title: '熱門商品推薦',
        description: '大家都在買的人氣商品',
        category: '熱門推薦',
        service: '生活用品',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop',
        link: 'https://shoppingfun.co/3QW_Q'  // 新發現的有效推廣碼
    },
    {
        id: 'destiny-ad-4',
        title: '限時優惠商品',
        description: '精選商品，限時優惠中',
        category: '精選推薦',
        service: '生活用品',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=250&fit=crop',
        link: 'https://shoppingfun.co/3QW_S'  // 新發現的有效推廣碼
    }
];

// ============================================================
// 運勢結果頁廣告（使用新發現的有效推廣碼）
// ============================================================
const resultAds = [
    {
        id: 'result-ad-1',
        title: '今日精選推薦',
        description: '優質商品，提升生活品質',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
        buttonText: '立即查看',
        link: 'https://shoppingfun.co/3QW_1'  // 新發現的有效推廣碼
    },
    {
        id: 'result-ad-2',
        title: '熱門商品推薦',
        description: '大家都在買的人氣商品',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop',
        buttonText: '了解更多',
        link: 'https://shoppingfun.co/3QW_2'  // 新發現的有效推廣碼
    },
    {
        id: 'result-ad-3',
        title: '限時優惠商品',
        description: '精選商品，限時優惠中',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop',
        buttonText: '開始選購',
        link: 'https://shoppingfun.co/3QW_3'  // 新發現的有效推廣碼
    }
];

// ============================================================
// 共用輔助函數
// ============================================================

/**
 * 點擊廣告並跳轉
 * @param {string} adId - 廣告ID
 * @param {string} source - 來源頁面 ('portal', 'destiny', 'result')
 */
function clickAd(adId, source) {
    // 從對應的資料庫找廣告
    let ad = null;
    let db = null;
    
    switch(source) {
        case 'portal':
            db = portalAds;
            break;
        case 'destiny':
            db = destinyAds;
            break;
        case 'result':
            db = resultAds;
            break;
        default:
            db = [...portalAds, ...destinyAds, ...resultAds];
    }
    
    ad = db.find(a => a.id === adId);
    if (!ad) {
        console.warn('找不到廣告:', adId);
        return false;
    }
    
    // 追蹤點擊（日後可加GA）
    console.log(`[廣告點擊] ${adId} (${ad.title}) from ${source}`);
    
    // 跳轉到廣告連結
    if (ad.link) {
        window.open(ad.link, '_blank');
    }
    
    return false;
}
