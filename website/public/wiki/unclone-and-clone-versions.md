## 🧬 Clone & Unclone Explained

One of Instafel’s most powerful features is its support for **cloning**, allowing you to install multiple versions of the Instagram Alpha app side by side. This is particularly useful for users who want to avoid conflicts with the official Instagram app.

### 📦 What Does “Clone” Mean?

Cloning refers to modifying the app’s package name (and sometimes its digital signature) so that it can work with other Instagram-based apps on the same device. A cloned app behaves like a completely separate application:

- It has its own app data and cache
- You can run multiple setups with different feature flags in parallel
- It does **not** interfere with your official Instagram installation
- You can log in with a different account
- You can run multiple setups with different feature flags in parallel

This is especially valuable for power users and testers running experiments or comparing behaviors between builds.

### 🛠️ How Cloning Works in Instafel

When downloading or installing Instafel, you may see two different variants:

- **Unclone Version** (com.instagram.android)

  - This version **replaces** the stock Instagram app
  - Cannot be installed alongside the official app
  - Useful for mimicking the original Instagram environment

- **Clone Version** (com.instafel.android)
  - Has a different package name
  - Can be installed side by side with the original app
  - Safe for testing and experimental use

You can install both types at once. For example:

- Use **stock Instagram** for daily use
- Use **Instafel Clone** for exploring developer flags and unreleased features

### 🔄 What Is “Unclone”?

“Unclone” refers to using the original Instagram package name. You might want this if:

- You want Instafel to replace your official Instagram app
- Some experimental server-side flags only activate on `com.instagram.android`
- You’re debugging behaviors that only occur in the official app context

**Note:** You cannot install the unclone build if the stock Instagram app is already installed. You must uninstall it first.

### ✅ Summary

Clone and unclone builds allow Instafel to adapt to your use case. The clone version is ideal for testing and multi-instance use, while unclone version behaves exactly like the official app. The choice depends on how you want to use Instafel — either as a standalone experiment platform or a full Instagram replacement.
