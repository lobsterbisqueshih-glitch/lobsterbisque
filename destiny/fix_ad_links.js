// 更新廣告資料庫，添加連結欄位
const ads = [
    {
        id: 'destiny-book-1',
        title: '紫微斗數入門經典',
        description: '專業命理教學書籍，從基礎到進階完整教學',
        category: '書籍雜誌',
        service: '紫微斗數',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
        // 臨時連結 - 需要Stone提供實際iChannels連結
        link: 'https://www.ichannels.com.tw/product/example-book?member=3QWtn&track=destiny-book-1'
    },
    {
        id: 'destiny-crystal-1',
        title: '天然開運水晶手鍊',
        description: '精選天然水晶，提升正能量與好運氣',
        category: '其他類別',
        service: '開運物品',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
        link: 'https://www.ichannels.com.tw/product/example-crystal?member=3QWtn&track=destiny-crystal-1'
    },
    {
        id: 'destiny-course-1',
        title: '八字命理線上課程',
        description: '專業命理師親自教學，隨時隨地學習',
        category: '教育學習',
        service: '八字命理',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop',
        link: 'https://www.ichannels.com.tw/product/example-course?member=3QWtn&track=destiny-course-1'
    },
    {
        id: 'destiny-tool-1',
        title: '專業命理排盤工具',
        description: '電腦排盤軟體，快速準確分析命盤',
        category: '教育學習',
        service: '命理工具',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=250&fit=crop',
        link: 'https://www.ichannels.com.tw/product/example-tool?member=3QWtn&track=destiny-tool-1'
    }
];

// 運勢結果中間廣告資料
const resultAds = [
    {
        id: 'result-ad-1',
        title: '根據您的運勢推薦',
        description: '開運水晶手鍊，提升今日好運氣',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
        buttonText: '立即查看',
        link: 'https://www.ichannels.com.tw/product/example-crystal?member=3QWtn&track=result-ad-1'
    },
    {
        id: 'result-ad-2',
        title: '運勢相關商品',
        description: '命理書籍，深入了解運勢原理',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop',
        buttonText: '了解更多',
        link: 'https://www.ichannels.com.tw/product/example-book?member=3QWtn&track=result-ad-2'
    },
    {
        id: 'result-ad-3',
        title: '提升運勢推薦',
        description: '線上課程，學習改善運勢方法',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop',
        buttonText: '開始學習',
        link: 'https://www.ichannels.com.tw/product/example-course?member=3QWtn&track=result-ad-3'
    }
];

// 修復廣告點擊追蹤函數
function trackAd(adId) {
    // 找到對應廣告
    const allAds = [...ads, ...resultAds];
    const ad = allAds.find(a => a.id === adId);
    
    if (!ad) {
        console.error('找不到廣告:', adId);
        return false;
    }
    
    // 後台追蹤記錄
    const trackData = {
        adId: adId,
        memberId: '3QWtn',
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        adTitle: ad.title
    };
    
    console.log('廣告追蹤（後台）:', trackData);
    
    // 實際跳轉到廣告連結
    if (ad.link) {
        // 模擬發送追蹤數據到後台
        try {
            // 這裡可以發送追蹤數據到iChannels
            // fetch('/api/track-ad', { method: 'POST', body: JSON.stringify(trackData) });
            
            // 實際跳轉
            window.open(ad.link, '_blank');
            return true;
        } catch (error) {
            console.error('廣告跳轉失敗:', error);
            // 備用方案：直接跳轉
            window.location.href = ad.link;
            return true;
        }
    } else {
        console.warn('廣告缺少連結:', adId);
        alert('廣告連結準備中，請稍後再試');
        return false;
    }
}

// 修復跳出廣告訪問函數
function visitAd() {
    if (window.currentAdId) {
        trackAd(window.currentAdId);
    }
    closePopupAd();
}

// 修復小方塊廣告點擊
function trackMiniAd() {
    if (window.currentMiniAdId) {
        trackAd(window.currentMiniAdId);
    }
    closeMiniAd();
}

// 修復結果中間廣告HTML生成
function getFortune() {
    const birthDate = document.getElementById('birth-date').value;
    const questionType = document.getElementById('question-type').value;
    
    if (!birthDate) {
        alert('請輸入出生年月日');
        return;
    }
    
    const fortune = expandedFortunes[questionType] || expandedFortunes.general;
    
    // 隨機選擇一個結果中間廣告
    const resultAd = resultAds[Math.floor(Math.random() * resultAds.length)];
    
    // 建立運勢結果HTML，在中間插入廣告
    const fortuneHTML = `
        <p><strong>${fortune.title}</strong></p>
        <p>${fortune.content}</p>
        
        <!-- 結果中間廣告 -->
        <div class="result-ad">
            <img src="${resultAd.image}" alt="${resultAd.title}" class="result-ad-image">
            <h4>${resultAd.title}</h4>
            <p>${resultAd.description}</p>
            <a href="${resultAd.link}" class="result-ad-button" onclick="trackAd('${resultAd.id}'); return false;">${resultAd.buttonText}</a>
        </div>
        
        <div style="margin-top: 15px;">
            <span style="color: #ffd166;">幸運色：${fortune.luckyColor}</span> | 
            <span style="color: #ffd166;">幸運數字：${fortune.luckyNumber}</span>
        </div>
        <p style="margin-top: 15px; font-style: italic; color: #aaa;">
            以上分析僅供參考，實際運勢取決於個人努力與選擇。
        </p>
    `;
    
    document.getElementById('fortune-content').innerHTML = fortuneHTML;
    document.getElementById('fortune-result').style.display = 'block';
    
    // 顯示小方塊廣告（運算完成後）
    setTimeout(() => {
        showMiniAd();
    }, 1000);
    
    // 滾動到結果
    document.getElementById('fortune-result').scrollIntoView({ behavior: 'smooth' });
}