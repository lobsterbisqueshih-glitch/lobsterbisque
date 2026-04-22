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
// 天機閣廣告（命理主題）
// ============================================================
const destinyAds = [
    {
        id: 'destiny-book-1',
        title: '紫微斗數入門經典',
        description: '專業命理教學書籍，從基礎到進階完整教學',
        category: '書籍雜誌',
        service: '紫微斗數',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
        link: 'https://shoppingfun.co/3QW_R'
    },
    {
        id: 'destiny-crystal-1',
        title: '天然開運水晶手鍊',
        description: '精選天然水晶，提升正能量與好運氣',
        category: '其他類別',
        service: '開運物品',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
        link: 'https://dreamstore.info/3QW_X'
    },
    {
        id: 'destiny-course-1',
        title: '八字命理線上課程',
        description: '專業命理師親自教學，隨時隨地學習',
        category: '教育學習',
        service: '八字命理',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop',
        link: 'https://www1.gamepark.com.tw/3QW_Y'
    },
    {
        id: 'destiny-tool-1',
        title: '專業命理排盤工具',
        description: '電腦排盤軟體，快速準確分析命盤',
        category: '教育學習',
        service: '命理工具',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=250&fit=crop',
        link: 'https://igrape.net/3QW_a'
    }
];

// ============================================================
// 運勢結果頁廣告（動態推薦）
// ============================================================
const resultAds = [
    {
        id: 'result-ad-1',
        title: '根據您的運勢推薦',
        description: '開運水晶手鍊，提升今日好運氣',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
        buttonText: '立即查看',
        link: 'https://shoppingfun.co/3QW_R'
    },
    {
        id: 'result-ad-2',
        title: '運勢相關商品',
        description: '命理書籍，深入了解運勢原理',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop',
        buttonText: '了解更多',
        link: 'https://dreamstore.info/3QW_X'
    },
    {
        id: 'result-ad-3',
        title: '提升運勢推薦',
        description: '線上課程，學習改善運勢方法',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop',
        buttonText: '開始學習',
        link: 'https://www1.gamepark.com.tw/3QW_Y'
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
