## 🚩 Flags and Backups

### 🔧 What Does Flags Mean?

Flag in Instagram are like an on/off switch controlled by Meta’s servers. Instead of sending new code every time, Instagram turns features on or off remotely using these flags, without an app update.

Instafel makes these flags inside the app accessible by users and lets you change them yourself. In this way, you can try out features even if Meta hasn’t officially released them to everyone. However, some features are completely server based and you cannot enable some experimental things without Meta's roll outs.

### 📚 Flag & Backup Libraries

To make using feature flags easier, Instafel provides two main libraries:

- **Flag Library:**  
  A searchable collection of known flags found in Alpha versions. Each flag includes a description, which parts of the app it affects, and the versions where it appears or starts to work.

- **Backup Library:**  
  Saved flag configurations (.JSON or .IBACKUP files) that can be imported directly. These backups activate pre-tested combinations of flags known to work well together or unlock specific features.

Users can:

- Save their current configuration as a backup
- Share backups with others
- Restore from a backup to revert to a known-good state

This enables community-based experimentation and shared discoveries.

### 🔍 How to Access the Flag Library and Backup Library?

- The Flag Library is being established on the website (still WIP) at [Flag Library](https://instafel.app/library_flag)
- The most used flags can also be found via the [Telegram Community](https://t.me/instafel/34335)
- The Backup Library is accessible here: [Backup Library](https://instafel.app/library_backup)
- You can apply any backup files via the Instafel Menu.

## 🛠️ Accessing and Using the Instafel Menu

### 🔑 What Is the Instafel Menu?

The Instafel Menu is a special settings panel added to the regular Instagram Alpha app. It reveals powerful tools, lets you import, export, or apply backups, and control updates—giving you full access to Instagram Alpha’s unique experience.

### 🚪 How to Access the Instafel Menu

1. **Open Instafel App:** Launch Instafel on your device.
2. **Go to Your Profile:** Tap your profile icon at the bottom right.
3. **Open the Side Navigation Drawer:** **Press and hold** the hamburger (☰) icon in the top-right corner to open the Instafel menu.
4. **Access Instafel Features:** The hidden developer options and advanced menus will appear, giving you access to flags, backups, updater controls, and more.

### 🔍 Key Features on Instafel Menu

- **Flag Library:**  
  Explore a hand-picked database of known feature flags found by the community, with descriptions and notes on how stable they are.

- **Backup Library:**  
  Import or export JSON files containing saved flag configurations. Quickly switch between setups or share your configurations.

- **Updater:**  
  Manage Over-The-Air (OTA) updates directly inside the app. Enable auto-updates or adjust checking frequency.

- **Crash Reports:**  
  Capture crash logs and send them to developers to help improve stability over time.

### ⚡ Why the Instafel Menu Matters

The Instafel Menu acts as the central control hub for everything that makes Instafel different from the stock Instagram Alpha client. It’s not just about toggling flags — it’s a unified interface that empowers users to explore, customize, and stabilize their experience in ways Meta never intended for the public.

This menu matters because it offers:

- **Backup Library Integration:** Access backups with summaries, descriptions, and changelogs maintained by Instafel admins.
- **Backup Import/Export:** Export your current flag configuration or import others’ backups instantly — essential for recovery and sharing.
- **OTA Updater Control:** Manage updates in-app without manual APK downloads.
- **Crash Reporting:** Send logs to help improve future releases.

The true power lies in this **integration**, providing a single point of access instead of fragmented or root-only tools.

### ⚠️ Warnings and Tips

- Some flags may **cause crashes or UI glitches**; enable with caution.
- Always **backup your current flag setup** before experimenting.
- Instafel menus may receive updates; keep your app updated for best experience.

### 🚨 Risks and Limitations

Not all flags are safe to enable. Because these features are under active development:

- Some flags may **crash the app** immediately.
- Others may **break navigation or layouts**.
- A few flags are **server-dependent** and won’t activate locally without server response.

Instafel does **not fake** server responses; it only allows local control over flags already built into the APK.

### ✅ Summary

Instafel turns a black-box Alpha app into a transparent developer sandbox. For users who want to tinker, experiment, or analyze Instagram's evolution, access to developer features and internal flags is transformative. It demystifies how the Instagram app functions internally and enables community-powered advanced feature discovery.
