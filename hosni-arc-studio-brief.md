# Brief: موقع Hosni Arc Studio

## نظرة عامة
موقع لشركة معمارية وتصميم داخلي (Hosni Arc Studio©)، مصري، ستاتيك بالكامل، هيتنشر على GitHub Pages.

**Tagline:** "Tomorrow's innovation, today's reality."

---

## المتطلبات التقنية

- **Stack:** HTML/CSS/JS ستاتيك بحت (مفيش React لازم إلا لو عايز — الأبسط أفضل لـ GitHub Pages)
- **الاستضافة:** GitHub repo + GitHub Pages (رابط مؤقت: `username.github.io/repo-name`، دومين مخصص هيتربط بعدين)
- **الصفحات:** Multi-page (مش SPA):
  - `index.html` (Home)
  - `projects.html` (Projects)
  - `profile.html` (Profile)
  - `contact.html` (Contact)
- **الفورم:** Formspree (أو Web3Forms كبديل) — فورم تواصل بيبعت إيميل فعلي. لازم:
  - `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
  - حقول: Name, Email, Phone (اختياري), Message
  - لازم أعمل حساب Formspree واحط الـ endpoint بنفسي بعد التنزيل
- **الصور:** مفيش صور حقيقية للمشاريع دلوقتي — استخدم **SVG placeholders** بسيطة (مربعات/مستطيلات بتدرج لوني من هوية البراند) بدل الصور، هستبدلها يدوي بعدين من الـ repo. سميها بأسماء واضحة زي `project-01.svg`, `project-02.svg` إلخ عشان يسهل استبدالها.
- **Responsive:** لازم يشتغل كويس على موبايل (فيه mobile menu في البراند بوك بتصميم بسيط: Home/Projects/Profile/Contact + زرار X للإغلاق)

---

## هوية العلامة (من البراند بوك)

### الألوان
| الاسم | الكود | الاستخدام |
|---|---|---|
| Jungle Green | `#1A3633` | اللون الأساسي (خلفيات داكنة، أزرار) |
| Quick Silver | `#9CABA1` | اللون الثانوي (نصوص فاتحة، تفاصيل) |
| Cold Black | `#090A0C` | خلفيات سوداء/داكنة جدًا |
| Feldgrau | `#445A58` | لون وسيط/تدرجات |
| Intense White | `#F8F9FA` | خلفيات فاتحة، نصوص على الداكن |

### الخط (Typography)
- **TT Hoves Pro** (خط مدفوع — لو مش متاح استخدم بديل مجاني قريب منه زي **Inter** أو **Sora** من Google Fonts، هيدين شكل geometric مشابه)
- الشعار "HOSNI" بخط geometric حاد الزوايا (custom logotype، مش نص عادي — لو مش هنعمل SVG للوجو، استخدم أقرب خط bold geometric زي Sora Bold أو Space Grotesk)

### اللوجو
- الاسم: **HOSNI** (بحرف H بيبان كـ K في التصميم — ده تصميم خاص، ممكن أستخدم نص عادي بالخط المناسب بدل ما أعمل vector معقد)
- رمز © بجانب الاسم
- تحت الاسم أحيانًا: "ARCHITECTURE & INTERIOR DESIGN STUDIO"

---

## محتوى الصفحات

### Home (index.html)
- Hero section بالـ tagline "Tomorrow's innovation, today's reality." بخط كبير، خلفية داكنة (Jungle Green / Cold Black) مع صورة معمارية (placeholder SVG أو صورة تجريدية geometric)
- نبذة مختصرة عن الشركة (من نص البراند بوك):
  > "Hosni Arc Studio© is a dynamic and innovative architectural firm with a deep passion for design and a commitment to excellence. For +6 years, we have been dedicated to shaping spaces that inspire, while respecting the environment and the people who inhabit them."
- Navbar: Home | Projects | Profile | Contact + لوجو HOSNI في الشمال

### Projects (projects.html)
- Grid لعرض مشاريع (استخدم 6 placeholders كـ بداية) كل كارت فيه:
  - SVG placeholder بدل صورة
  - اسم مشروع placeholder (مثلاً "Living Room 2023")
  - وصف قصير placeholder (Lorem ipsum خفيف)

### Profile (profile.html)
- نص "About Us" الأطول من البراند بوك:
  > "Our mission is to provide Hosni Arc Studio© with a comprehensive branding and art direction package that includes a visual identity, creative direction, and brand guidelines. We will work closely with them to understand their unique needs and create a visual identity that reflects their vision and style. At our design studio, we are committed to excellence in every project we undertake."
- ممكن تضيف: سنين الخبرة (+6 years)، القيم (client-centric, collaborative, environmentally responsible — من نص البراندنج جايدلاينز)

### Contact (contact.html)
- فورم تواصل (Name, Email, Phone, Message) → Formspree
- معلومات تواصل ثابتة (من كروت الفيزيت في البراند بوك):
  - Phone: +20 01016070633
  - Email: Hosni@hosniarcstudio.com
  - Address: Mansoura, Jehan St., Jehan Medical Center, 2nd Floor
  - Website: hosniarcstudio.com

---

## ملاحظات تصميم عامة
- الموضوع العام: **dark, minimal, geometric, luxury/tech feel** — خلفيات داكنة غالبًا (Cold Black / Jungle Green) مع لمسات Quick Silver للنصوص
- خطوط قطرية/geometric shapes كعناصر ديكور (زي الخط القطري اللي في صفحة "Hosni Arc Studio©" بالبراند بوك)
- الفوتر يحتوي: "all rights reserved © 2025" + روابط تواصل

---

## هيكل الملفات المقترح
```
hosni-arc-studio/
├── index.html
├── projects.html
├── profile.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── logo.svg
│   ├── project-01.svg ... project-06.svg
│   └── hero-bg.svg
└── README.md
```

---

## خطوات النشر بعد البناء
1. `git init` في مجلد المشروع
2. `git remote add origin <repo-url>`
3. `git add . && git commit -m "Initial site" && git push -u origin main`
4. من إعدادات الـ GitHub repo: Settings → Pages → Source: اختار الـ branch (main) والـ folder (root أو /docs)
5. الموقع هيبقى متاح على `https://username.github.io/hosni-arc-studio/`
6. سجل حساب على Formspree.io، اعمل فورم جديد، خد الـ Form ID، حطه في `contact.html`

---

## حاجات لسه هتتعمل لاحقًا (خارج نطاق النسخة الأولى)
- ربط دومين مخصص (hosniarcstudio.com)
- استبدال SVG placeholders بصور مشاريع حقيقية
- تحسين SEO (meta tags, sitemap)
