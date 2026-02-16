# Quick Start Guide - New Features

## 🌙 Theme Toggle

**Where:** Top-right corner of header (next to "Profile & Billing" button)

**What to do:**
1. Click the moon 🌙 button to switch to light mode
2. Click the sun ☀️ button to switch back to dark mode
3. Your preference is automatically saved

**It affects:**
- Background color
- Text color
- Border colors
- All visual elements on the page

---

## ❤️ Favorites System

**Where:** On each frequency card in the Library

**What to do:**
1. Look for the heart icon (🤍 or ❤️) on the right side of each frequency name
2. Click the white heart to favorite a frequency
3. The heart turns red ❤️ and the card gets a gold border
4. Click again to remove from favorites

**What happens:**
- Favorites are saved automatically
- Your favorites persist even after closing the browser
- You can favorite as many frequencies as you want
- Each favorited card shows a gold glow effect

---

## 🎯 Use Cases

### Organizing Your Practice
1. **Theme:** Use light mode during the day, dark mode at night
2. **Favorites:** Mark your preferred healing frequencies for quick access
3. **Reference:** Check which frequencies work best for you

### Quick Access
- Favorite your top 5-10 frequencies
- Toggle theme based on environment
- Smooth transitions make it easy on your eyes

---

## 💾 Your Data

### What Gets Saved
- Your theme preference (light/dark)
- Your favorite frequency IDs
- Saved in your browser (not on any server)

### What Doesn't Get Saved
- Theme preference is per-device (not synced across devices)
- Favorites are per-device (not synced across devices)
- Only your device has access to your data

### How to Reset
- **Clear favorites:** Open browser DevTools (F12), paste: `localStorage.removeItem('tones_favorites')`
- **Clear theme:** Open browser DevTools (F12), paste: `localStorage.removeItem('tones_theme')`

---

## 🔄 Switching Devices

Currently, your preferences don't sync between devices. To use the same theme and favorites on a different device:

**Future Feature:** Cloud sync coming soon!

For now:
- Light/Dark mode is per-device
- Favorites are per-device
- Same frequency catalog on all devices

---

## 🎨 Customization (For Developers)

Want to customize the experience?

### Change the Colors
Edit `app.html` lines 34-45 to change the gold accent, text colors, etc.

### Change the Icons
- Theme toggle: Edit `themeToggle.textContent` (line 451)
- Favorite button: Edit `favIcon` (line 1133)

### Add More Features
- Cloud sync to Supabase
- Favorites sharing
- Collections/playlists
- Analytics

---

## ⚠️ Known Limitations

1. **Per-Device Storage Only**
   - Favorites don't sync to other devices
   - Theme preference doesn't sync to other devices
   - Solution: Coming in v1.2 with Supabase sync

2. **Browser Cache**
   - Clearing browser cache will clear favorites
   - Clearing browser history might clear preferences
   - Solution: Export favorites to JSON file (future)

3. **Private Browsing**
   - Some private browsing modes don't persist localStorage
   - Preferences may reset when you close the private window
   - Solution: Use normal browsing mode for persistence

---

## 🆘 Quick Troubleshooting

### Theme button not working
1. Refresh the page (F5)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try a different browser
4. Check that JavaScript is enabled

### Hearts not showing or not clickable
1. Ensure you're logged in
2. Refresh the page
3. Check browser console for errors (F12)
4. Try opening in incognito mode to test

### Favorites disappearing
1. Check if in private browsing mode (use normal mode)
2. Check browser privacy settings
3. Make sure localStorage is enabled
4. Try another browser

### Colors wrong after theme toggle
1. Hard refresh (Ctrl+Shift+R) to clear cache
2. Clear browser cache completely
3. Check if using custom browser extensions affecting colors

---

## 📞 Need Help?

- **Feature not working?** Run diagnostic: Open DevTools (F12), Console tab, paste test code
- **Want to report a bug?** Include screenshot and browser info (F12 → About)
- **Want a new feature?** Check Slack/Discord for feature request channel

---

## 🚀 Coming Soon (Planned Features)

- ☁️ Cloud sync for theme and favorites
- 📱 Mobile app with same features
- 📊 Favorites analytics (most used frequencies)
- 🎵 Create custom collections/playlists
- 🔗 Share favorites with friends
- 📥 Export/import favorites
- 🎯 Advanced filtering and search

---

**Version:** 1.1.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready
