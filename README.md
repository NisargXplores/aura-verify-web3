🧠 Project Overview – [AuraVerify](https://aura-verify-web3.vercel.app/)

🌐 What is AuraVerify?
AuraVerify is a decentralized biometric identity verification system built on the Solana blockchain. It combines wallet-based identity, biometric facial recognition, and blockchain immutability to enable secure, trustless, and reusable digital identity verification.

🔁 How It Works – The Full Flow
1. Wallet Connection
The user connects any Solana wallet (Phantom, Backpack, etc.) using @jup-ag/unified-wallet-adapter.

The wallet address is the unique identity anchor for the user.

2. Personal Details Entry
Users enter their:

Full Name

Email Address

Date of Birth

Driving License Number

This data is linked to the user’s wallet address and stored securely in Firebase.

3. Biometric Registration
Users register their face using a webcam/camera.

A custom facial recognition API (Flask) captures and stores the biometric encoding (not the raw image) in Firebase for security.

4. Biometric Verification
On subsequent access or verification attempts:

The user is prompted to re-scan their face.

Facial encodings are compared.

If a match is found, the identity is verified.

5. Verified Identity
Upon successful biometric verification, the user gets a “Verified” status.

This identity can be reused for other dApps, platforms, or KYC flows in the future.

⚙️ Technology Stack
Layer	Stack Used
Frontend	TypeScript, React (Vite), Tailwind CSS, Lucide Icons
Wallet Auth	@jup-ag/unified-wallet-adapter (multi-wallet support)
Backend	Flask (Python), RESTful APIs
Biometric	Custom Facial Recognition API (face encodings using face_recognition)
Database	Firebase (Realtime DB + Authentication)
Blockchain	Solana, wallet public key acts as identity anchor
🧠 Core Innovation
✅ Web3 Native Identity: No need for passwords. Wallet + biometrics = future.

✅ Biometric Layer: Security like never before. Face is the new key.

✅ Decentralized & Reusable: One-time registration, infinite verifications.

✅ DLT Security: Immutable and trustless — powered by blockchain technology.

🔮 What’s Coming Next?
In the upcoming hours of the hackathon:

🔐 Write-back of verification hash to Solana for on-chain identity anchoring.

📊 Admin Dashboard for verifying and tracking user submissions.

🔁 Implement re-verification & timestamped logs.

📱 Make UI fully responsive and mobile-ready.

🚨 Add fallback for failed biometric attempts (OTP / email validation).

🏆 Why This Project?
With rising fraud and privacy issues, AuraVerify offers:

A self-sovereign identity layer.

Built on blockchain + biometrics.

Useable across any Web3 or traditional platform needing trust-based onboarding.

AuraVerify is the trust bridge between humans and decentralized systems.
