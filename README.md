# เกมปั่นหุ้น: รู้ทัน สังเกต และรอดตาย

คู่มือเอาตัวรอดในตลาดหุ้นสำหรับนักลงทุนรายย่อย — Static Site สำหรับ Deploy ที่ Vercel

## โครงสร้าง

```
dist/
├── index.html                                  # หน้าหลัก
├── 00-preface.html                             # คำนำและ Disclaimer
├── 01-stock-manipulation-guide.html            # ภาค 1: รู้จักเกมปั่นหุ้น
├── 02-stock-signals-guide.html                 # ภาค 2: สังเกตก่อนเกิด
├── 03-money-management-guide.html              # ภาค 3: การจัดการเงิน
├── 04-valuation-guide.html                     # ภาค 4: การประเมินมูลค่า
├── 05-advanced-lessons-guide.html              # ภาค 5: บทเรียนขั้นสูง
├── 06-daily-routine-guide.html                 # ภาค 6: กิจวัตรหุ้นไทย
├── 06A-futures-commodity-gold-guide.html       # ภาค 6A: Futures/Commodity/Gold
├── 06B-international-investor-guide.html       # ภาค 6B: นักลงทุนต่างประเทศ
├── 07-intermarket-analysis-guide.html          # ภาค 7: Intermarket Analysis
├── 08-crypto-defi-guide.html                   # ภาค 8: Crypto/DeFi (ใหม่)
├── 09-dw-derivatives-guide.html                # ภาค 9: DW/Warrant/อนุพันธ์ (ใหม่)
├── 10-tax-cost-guide.html                      # ภาค 10: ภาษีและต้นทุน (ใหม่)
├── Next_Supercycles_Research.html              # งานวิจัย Supercycles
├── STPI-Valuation-Analysis.html                # ตัวอย่าง Valuation STPI
├── theme.js                                    # JS สำหรับเปลี่ยนธีม
├── vercel.json                                 # Vercel config + redirects
├── package.json                                # Static site config
├── robots.txt                                  # SEO
├── sitemap.xml                                 # SEO
├── 404.html                                    # หน้า Not Found
├── .gitignore
└── .vercelignore
```

## วิธี Deploy ที่ Vercel

### วิธีที่ 1: Vercel CLI (แนะนำสำหรับ Deploy ครั้งแรก)

```bash
# ติดตั้ง Vercel CLI (ถ้ายังไม่มี)
npm install -g vercel

# เข้าโฟลเดอร์ dist
cd dist

# Login
vercel login

# Deploy แบบ Preview
vercel

# Deploy แบบ Production
vercel --prod
```

### วิธีที่ 2: ผ่าน Vercel Dashboard (ลากวาง)

1. เข้า [vercel.com/new](https://vercel.com/new)
2. เลือก "Browse" หรือลากโฟลเดอร์ `dist/` ทั้งโฟลเดอร์ลงไป
3. ไม่ต้องกำหนด Build Command (ปล่อยว่าง)
4. Output Directory: `.` (จุด)
5. กด Deploy

### วิธีที่ 3: ผ่าน Git (สำหรับ Auto-Deploy)

```bash
# เข้าโฟลเดอร์ dist
cd dist

# Init git
git init
git add .
git commit -m "Initial commit"

# สร้าง repo บน GitHub แล้ว push
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

แล้วไปที่ [vercel.com/new](https://vercel.com/new) → Import Git Repository → เลือก repo

## URLs ที่ใช้งานได้หลัง Deploy

หลัง deploy แล้ว คุณจะเข้าถึงเนื้อหาได้ทั้ง:

**URL ตามชื่อไฟล์:**
- `https://your-site.vercel.app/`
- `https://your-site.vercel.app/00-preface.html`
- `https://your-site.vercel.app/01-stock-manipulation-guide.html`

**URL แบบสั้น (เพราะมี redirects):**
- `https://your-site.vercel.app/preface`
- `https://your-site.vercel.app/part1`
- `https://your-site.vercel.app/part8` (Crypto)
- `https://your-site.vercel.app/part9` (DW/Derivatives)
- `https://your-site.vercel.app/part10` (ภาษี)
- `https://your-site.vercel.app/supercycles`
- `https://your-site.vercel.app/stpi`

## ทดสอบในเครื่องก่อน Deploy

```bash
# วิธีที่ 1: ใช้ npx serve
npx serve .

# วิธีที่ 2: ใช้ Python
python3 -m http.server 8000

# วิธีที่ 3: ใช้ Vercel Dev (จำลอง routing เหมือน production)
vercel dev
```

แล้วเปิด `http://localhost:3000` หรือ `http://localhost:8000`

## หลัง Deploy

1. **อัปเดต Domain ใน sitemap.xml** — ปัจจุบันใช้ `https://test-deploy-vercel-mauve-seven.vercel.app` ถ้าได้ custom domain แล้วให้เปลี่ยนตรงนี้
2. **ส่ง sitemap.xml เข้า Google Search Console** เพื่อให้ Google index
3. **ตั้งค่า Custom Domain** (ถ้ามี) ใน Vercel Dashboard

## ข้อจำกัดความรับผิด

เนื้อหาในเว็บไซต์เป็นข้อมูลเพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำการลงทุน
ดูรายละเอียดเพิ่มเติมที่ [00-preface.html](00-preface.html)

## License

เนื้อหาทั้งหมดอยู่ภายใต้ [Creative Commons BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)
- ✅ ใช้แชร์ต่อได้ (ไม่เชิงพาณิชย์)
- ✅ ต้องให้เครดิตผู้เขียน
- ❌ ห้ามดัดแปลง
- ❌ ห้ามนำไปใช้เชิงพาณิชย์
