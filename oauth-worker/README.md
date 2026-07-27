# بوابة الدخول للوحة التحكم (/admin) — خطوة بخطوة

عشان العميل يقدر يدخل على `www.hosniarcstudio.com/admin` ويعدّل المشاريع، محتاجين
نظبط "بوابة دخول" مرة واحدة بس. الخطوات دي بتتعمل مرة واحدة وتفضل شغّالة للأبد.

الكود جاهز في المجلد ده (`worker.js`). إنت بس هتنسخه وتحط قيمتين سريتين.

---

## المطلوب منك (4 خطوات)

### الخطوة 1 — اعمل GitHub OAuth App

1. ادخل: https://github.com/settings/developers
2. اضغط **OAuth Apps** → **New OAuth App**
3. املا الخانات:
   - **Application name:** `Hosni Arc Studio CMS`
   - **Homepage URL:** `https://www.hosniarcstudio.com`
   - **Authorization callback URL:** سيبها مؤقتًا `https://example.com/callback`
     (هنرجع نعدّلها في الخطوة 3 بعد ما ياخد الـ Worker رابط)
4. اضغط **Register application**
5. هتلاقي **Client ID** — انسخه.
6. اضغط **Generate a new client secret** — انسخ الـ **Secret** فورًا (بيظهر مرة واحدة).

> احتفظ بالـ Client ID و Secret في مكان آمن. **متحطهمش في الكود ولا في الريبو.**

---

### الخطوة 2 — انشر الـ Worker على Cloudflare (مجاني)

**الطريقة الأسهل (من المتصفح، من غير تنصيب حاجة):**

1. اعمل حساب مجاني على https://dash.cloudflare.com (لو معندكش)
2. من القائمة: **Workers & Pages** → **Create** → **Create Worker**
3. سمّيه `hosni-cms-auth` → **Deploy**
4. اضغط **Edit code**، امسح الكود الافتراضي، والصق **كامل محتوى ملف `worker.js`**
   اللي في المجلد ده → **Deploy**
5. دلوقتي ظبط القيمتين السريتين:
   - افتح الـ Worker → **Settings** → **Variables and Secrets**
   - أضف متغير: الاسم `GITHUB_CLIENT_ID` والقيمة = الـ Client ID (من الخطوة 1)،
     واختر النوع **Secret** → Save
   - أضف متغير تاني: الاسم `GITHUB_CLIENT_SECRET` والقيمة = الـ Secret → Save
6. انسخ رابط الـ Worker (شكله زي:
   `https://hosni-cms-auth.<حسابك>.workers.dev`)

**البديل (لو بتحب سطر الأوامر):**

```bash
cd oauth-worker
npx wrangler login
npx wrangler secret put GITHUB_CLIENT_ID       # الصق الـ Client ID
npx wrangler secret put GITHUB_CLIENT_SECRET   # الصق الـ Secret
npx wrangler deploy
```

---

### الخطوة 3 — اربط الطرفين

1. ارجع لـ GitHub OAuth App (الخطوة 1) → عدّل **Authorization callback URL** لتبقى:
   ```
   https://hosni-cms-auth.<حسابك>.workers.dev/callback
   ```
   (رابط الـ Worker + `/callback`) → **Update application**

2. ابعتلي رابط الـ Worker، وأنا أحط `base_url` في `public/admin/config.yml`.
   (أو عدّلها بنفسك: بدّل السطر `base_url:` بالرابط بتاعك.)

---

### الخطوة 4 — ادّي العميل صلاحية

عشان العميل يقدر يحفظ تعديلاته، لازم يبقى عنده صلاحية على الريبو:

1. الريبو → **Settings** → **Collaborators** → **Add people**
2. اكتب يوزر العميل على GitHub → **Add**
3. العميل يقبل الدعوة من إيميله.

> لو العميل معندوش حساب GitHub، يعمل واحد مجاني الأول.

---

## خلاص كده

العميل يفتح `https://www.hosniarcstudio.com/admin` → **Login with GitHub** →
يعدّل أي مشروع → **Publish**. التعديل بيتحفظ على `main` والموقع بيتحدث لوحده خلال
دقيقة أو دقيقتين.

## لو حصلت مشكلة

- **بيقول "Missing authorization code" أو ماكملش دخول:** اتأكد إن الـ callback URL
  في GitHub مطابق تمامًا لرابط الـ Worker + `/callback`.
- **بيدخل بس مبيحفظش:** اتأكد إن العميل اتضاف collaborator وقبل الدعوة.
- **النافذة بتقفل من غير ما يحصل حاجة:** اتأكد إن `base_url` في `config.yml`
  هو رابط الـ Worker الصح.
