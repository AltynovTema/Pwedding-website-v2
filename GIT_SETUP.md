# Git & GitHub Setup Guide

## 📋 Quick Setup Instructions

### Step 1: Initialize Git Repository

Open Terminal and run:

```bash
cd /Users/artem/My_files/Info_Tec/My_Project/Pwedding-website-v2
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Make First Commit

```bash
git commit -m "Initial commit: Wedding website project setup"
```

### Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Pwedding-website-v2` (or your preferred name)
3. Choose: Private or Public
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 5: Connect Local to GitHub

GitHub will show you commands like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Pwedding-website-v2.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 6: Verify

Visit your repository on GitHub to see all files uploaded!

---

## 🔄 Daily Workflow

### After Making Changes:

```bash
# 1. Check what changed
git status

# 2. Add changed files
git add .

# 3. Commit with message
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push
```

### Example Commit Messages:

```bash
git commit -m "Update hero section text size"
git commit -m "Add transportation section"
git commit -m "Fix mobile navigation menu"
git commit -m "Update wedding date in content.json"
```

---

## 📸 Managing Images with Git

⚠️ **Important:** Large image files can make your repository slow.

### Option 1: Include Images (Recommended for < 10MB total)

Images are already tracked. Just commit normally:

```bash
git add media/
git commit -m "Add wedding photos"
git push
```

### Option 2: Use Git LFS for Large Images

If you have many high-resolution photos:

```bash
# Install Git LFS
brew install git-lfs

# Initialize LFS
git lfs install

# Track image files
git lfs track "*.jpg"
git lfs track "*.png"

# Commit the tracking config
git add .gitattributes
git commit -m "Configure Git LFS for images"

# Now add and commit media normally
git add media/
git commit -m "Add large wedding photos via LFS"
git push
```

---

## 🔧 Useful Git Commands

### View History

```bash
# See commit history
git log

# See recent changes
git log --oneline -10
```

### Undo Changes

```bash
# Undo uncommitted changes to a file
git checkout -- filename.html

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Remove file from tracking (keep file)
git rm --cached filename.jpg
```

### Branches

```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Merge branch into main
git checkout main
git merge feature-name
```

---

## 🌐 Working from Multiple Computers

### On Second Computer:

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/Pwedding-website-v2.git

# Navigate to folder
cd Pwedding-website-v2

# Install dependencies
npm install

# Start working
npm run dev
```

### Before Starting Work:

```bash
# Always pull latest changes first
git pull
```

### After Finishing Work:

```bash
git add .
git commit -m "Your changes"
git push
```

---

## 💡 Best Practices

1. **Commit Often**: Small, frequent commits are better than large ones
2. **Clear Messages**: Describe WHAT and WHY you changed
3. **Pull Before Push**: Always `git pull` before starting work
4. **Test Before Commit**: Make sure site works before committing
5. **Backup Images**: Keep original photos elsewhere too

---

## 🎯 Common Scenarios

### Scenario 1: Updated Photos

```bash
# Replace photos in media/ folder
git add media/
git commit -m "Update wedding photos"
git push
```

### Scenario 2: Changed Content

```bash
# Edited data/content.json
git add data/content.json
git commit -m "Update venue address and contact info"
git push
```

### Scenario 3: Added New Section

```bash
git add index.html
git commit -m "Add FAQ section with 4 questions"
git push
```

---

## 🔗 Helpful Resources

- GitHub Desktop (GUI): https://desktop.github.com/
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf
- Learn Git: https://learngitbranching.js.org/

---

**Ready to start? Follow Steps 1-6 above!** 🚀
