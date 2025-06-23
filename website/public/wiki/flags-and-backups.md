## 🚩 Flags and Backups

### 🔧 Flags: The Control Layer

A feature flag in Instagram’s ecosystem acts as a server-controlled boolean (on/off) or parameterized switch for features. Meta doesn’t roll out features by shipping new code alone — instead, the client listens to flag values that determine behavior.

Instafel exposes these flags on-device and lets users override values manually. This can simulate the experience of being part of a test group that Meta hasn’t opened to the public.

---

### 📚 Flag & Backup Libraries

To make working with flags easier, Instafel includes access to two centralized libraries:

- **Flag Library:**  
  A browsable database of known flags discovered in Alpha versions. Flags usually come with descriptions, affected UI modules, and known versions.

- **Backup Library:**  
  Saved flag configurations (.JSON or .IBACKUP files) that can be imported directly. These backups activate pre-tested combinations of flags known to work well together or unlock specific features.

Users can:  
- Save their current configuration as a backup  
- Share backups with others  
- Restore from a backup to revert to a known-good state  

This enables community-based experimentation and shared discoveries.

---

### 🔍 How to Access the Flag Library and Backup Library?

- The Flag Library is being established on the website (still WIP) at [instafel.app/library/flags](https://instafel.app/library/flags)  
- The most used flags can also be found via the [Telegram Community](https://t.me/instafel/34335)  
- The Backup Library is accessible here: [instafel.app/library_backup](https://instafel.app/library_backup)  
- You can apply any backup files via the Instafel Menu.

---

## 🛠️ Accessing and Using the Instafel Menu

### 🔑 What Is the Instafel Menu?

The Instafel Menu is a custom, enhanced settings panel added on top of the standard Instagram Alpha app. It exposes powerful developer tools, experimental feature toggles, backup management, and update controls — all designed to give you full control over the hidden aspects of Instagram’s Alpha builds.

---

### 🚪 How to Access the Instafel Menu

1. **Open Instafel App:** Launch Instafel on your device.  
2. **Go to Your Profile:** Tap your profile icon at the bottom right.  
3. **Open the Side Navigation Drawer:** **Press and hold** the hamburger (☰) icon in the top-right corner to open the Instafel menu.  
4. **Access Instafel Features:** The hidden developer options and advanced menus will appear, giving you access to flags, backups, updater controls, and more.

---

### 🔍 Key Sections Inside the Instafel Menu

- **Flag Library:**  
  Browse a curated database of known feature flags discovered by the community, with descriptions and stability notes.

- **Backup Library:**  
  Import or export JSON files containing saved flag configurations. Quickly switch between setups or share your configurations.

- **Updater:**  
  Manage Over-The-Air (OTA) updates directly inside the app. Enable auto-updates or adjust checking frequency.

- **Crash Reports:**  
  Capture crash logs and send them to developers to help improve stability over time.

---

### ⚡ Why the Instafel Menu Matters

The Instafel Menu acts as the central control hub for everything that makes Instafel different from the stock Instagram Alpha client. It’s not just about toggling flags — it’s a unified interface that empowers users to explore, customize, and stabilize their experience in ways Meta never intended for the public.

This menu matters because it offers:

- **Backup Library Integration:** Access backups with summaries, descriptions, and changelogs maintained by Instafel admins.  
- **Backup Import/Export:** Export your current flag configuration or import others’ backups instantly — essential for recovery and sharing.  
- **OTA Updater Control:** Manage updates in-app without manual APK downloads.  
- **Crash Reporting:** Send logs to help improve future releases.  

The true power lies in this **integration**, providing a single point of access instead of fragmented or root-only tools.

---

### ⚠️ Warnings and Tips

- Some flags may **cause crashes or UI glitches**; enable with caution.  
- Always **backup your current flag setup** before experimenting.  
- Instafel menus may receive updates; keep your app updated for best experience.

---

### 🚨 Risks and Limitations

Not all flags are safe to enable. Because these features are under active development:

- Some flags may **crash the app** immediately.  
- Others may **break navigation or layouts**.  
- A few flags are **server-dependent** and won’t activate locally without server response.

Instafel does **not fake** server responses; it only allows local control over flags already built into the APK.

---

### ✅ Summary

Instafel turns a black-box Alpha app into a transparent developer sandbox. For users who want to tinker, experiment, or analyze Instagram's evolution, access to developer features and internal flags is transformative. It demystifies how the Instagram app functions internally and enables community-powered advanced feature discovery.

---