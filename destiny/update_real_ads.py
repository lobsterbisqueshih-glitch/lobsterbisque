#!/usr/bin/env python3
"""
更新真的iChannels廣告連結
需要Stone提供實際廣告連結
"""

import json
import sys

def update_ad_links(real_links):
    """
    更新廣告連結為真的iChannels連結
    
    Args:
        real_links: dict，包含真的廣告連結
           格式：{
                'destiny-book-1': 'https://www.ichannels.com.tw/redirect.php?k=123456&member=3QWtn&...',
                'destiny-crystal-1': 'https://www.ichannels.com.tw/redirect.php?k=234567&member=3QWtn&...',
                ...
            }
    """
    
    print("開始更新真的iChannels廣告連結...")
    
    # 讀取HTML檔案
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 更新廣告連結
    for ad_id, real_link in real_links.items():
        # 替換JavaScript中的連結
        pattern = f'"link": ".*{ad_id}.*"'
        replacement = f'"link": "{real_link}"'
        content = content.replace(pattern, replacement)
        
        # 替換HTML中的連結
        pattern = f'href=".*{ad_id}.*"'
        replacement = f'href="{real_link}"'
        content = content.replace(pattern, replacement)
        
        print(f"已更新 {ad_id}: {real_link[:50]}...")
    
    # 寫回檔案
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("廣告連結更新完成！")
    
    return True

if __name__ == "__main__":
    print("請提供真的iChannels廣告連結")
    print("格式：廣告ID=廣告連結")
    print("例如：destiny-book-1=https://www.ichannels.com.tw/redirect.php?k=123456&member=3QWtn&...")
    print()
    print("需要至少7個廣告連結：")
    print("1. destiny-book-1 (紫微斗數書籍)")
    print("2. destiny-crystal-1 (開運水晶手鍊)")
    print("3. destiny-course-1 (八字命理課程)")
    print("4. destiny-tool-1 (命理排盤工具)")
    print("5. result-ad-1 (運勢結果廣告1)")
    print("6. result-ad-2 (運勢結果廣告2)")
    print("7. result-ad-3 (運勢結果廣告3)")
    print()
    print("請將連結貼在下方，每行一個：")