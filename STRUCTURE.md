# Wedding Website Project Structure

```
Pwedding-website-v2/
│
├── 📄 index.html                    # Main HTML file - сайт готов!
│   ├── Navigation (меню)
│   ├── Hero Section (главный экран)
│   ├── Countdown Timer (таймер)
│   ├── Our Story (история любви)
│   ├── Event Details (детали)
│   ├── Program Timeline (программа)
│   ├── Gift Preferences (подарки)
│   ├── RSVP Form (форма подтверждения)
│   └── Footer & Contacts (контакты)
│
├── 📁 styles/
│   └── main.css                     # Custom CSS стили
│       ├── Fonts (шрифты)
│       ├── Hero background (фон)
│       └── Animations (анимации)
│
├── 📁 scripts/
│   └── main.js                      # JavaScript функционал
│       ├── Countdown timer (таймер обратного отсчёта)
│       ├── Scroll animations (анимации при скролле)
│       ├── Form handling (обработка формы)
│       └── Navbar effects (эффекты меню)
│
├── 📁 data/
│   └── content.json                 # ВСЕ ТЕКСТЫ И ДАННЫЕ ⭐
│       ├── Couple info (имена пары)
│       ├── Wedding date (дата свадьбы)
│       ├── Venue details (место проведения)
│       ├── Schedule (программа)
│       ├── RSVP settings (настройки формы)
│       ├── Contacts (контакты)
│       └── Story items (истории)
│
├── 📁 images/                       # (создать для ваших фото)
│   └── [add your photos here]
│
├── 📄 package.json                  # NPM конфигурация
├── 📄 vite.config.js                # Vite настройки
├── 📄 .gitignore                    # Git игнорирование
│
├── 📄 example.html                  # Исходный пример (для справки)
│
└── 📚 Documentation:
    ├── README.md                    # Основная документация
    ├── DEVELOPMENT.md               # Руководство разработчика
    ├── PROJECT_SETUP.md             # Чек-лист настройки
    └── БЫСТРЫЙ_СТАРТ.md            # Quick start guide (Russian)
```

## 🎯 Key Files to Edit

### 1. Content (90% of changes)
```
data/content.json
```
Edit this file to change:
- Names, dates, locations
- Texts, descriptions
- Contact information
- Schedule items

### 2. Structure (if needed)
```
index.html
```
Edit this file to:
- Add/remove sections
- Change layout
- Modify HTML structure

### 3. Styling (if needed)
```
styles/main.css
```
Edit this file to:
- Change colors
- Modify fonts
- Add custom styles
- Adjust animations

### 4. Functionality (if needed)
```
scripts/main.js
```
Edit this file to:
- Change timer behavior
- Modify form handling
- Add new interactions
- Customize animations

## 🔄 Data Flow

```
content.json (data)
    ↓
index.html (structure)
    ↓
main.css (styling) + main.js (functionality)
    ↓
Browser Display
```

## 🎨 Technology Stack

```
HTML5 → Structure
Tailwind CSS → Styling (via CDN)
JavaScript → Interactivity
Vite → Development server & build tool
Google Fonts → Typography
```

## 📱 Responsive Breakpoints

```
Mobile:   320px - 767px  (phones)
Tablet:   768px - 1023px (tablets)
Desktop:  1024px+        (computers)
```

## 🚀 Development Workflow

```
1. Edit content.json
        ↓
2. Save file (Ctrl+S)
        ↓
3. Browser auto-reloads (Vite HMR)
        ↓
4. Check result in browser
        ↓
5. Repeat until satisfied
```

## 📦 Build Process

```
Source Files (dev)
    ↓
npm run build
    ↓
Optimized Files (dist/)
    ↓
Deploy to hosting
```

## 🌟 Features Implemented

✅ Responsive navigation with mobile menu
✅ Smooth scroll between sections
✅ Countdown timer to wedding date
✅ Fade-in animations on scroll
✅ Image hover effects
✅ RSVP form with validation
✅ Success modal popup
✅ Parallax hero background
✅ Timeline program display
✅ Contact information footer

## 🎨 Color Palette

```
Coral:   #7D2826  (accents, buttons)
Candle:  #EFE9D7  (background)
Leaf:    #898861  (secondary elements)
Juniper: #343723  (text, dark backgrounds)
Gold:    #D4AF37  (highlights, decorations)
```

## 🔤 Typography

```
Headings: Playfair Display (serif)
Body:     Montserrat (sans-serif)
```

## 📊 File Sizes (approximate)

```
index.html:    ~24 KB
main.css:      ~1 KB
main.js:       ~2 KB
content.json:  ~2 KB
Total:         ~29 KB (very fast loading!)
```

## 💡 Quick Reference

**Change text?** → `data/content.json`
**Change layout?** → `index.html`
**Change colors?** → `index.html` (tailwind.config) or `styles/main.css`
**Change behavior?** → `scripts/main.js`
**Add photos?** → Create `images/` folder and update paths in `content.json`

---

Ready to start? Open `БЫСТРЫЙ_СТАРТ.md` for step-by-step guide! 🚀
