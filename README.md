# Clinical MRI Assistant (Laravel 12) — Clean Chat UI

UI **single-page chatbot** bergaya **rumah sakit (clean, dominan putih, tanpa gradasi)** untuk alur input kasus + upload MRI (multi-modality) + tombol diagnosis.  
Proyek ini fokus ke **front-end (Blade + CSS + JS)** dan **belum menyertakan model/engine diagnosis**.

> ⚠️ **Disclaimer Klinis:** Template ini **bukan** perangkat medis dan **tidak** boleh dipakai sebagai dasar keputusan klinis tanpa validasi, approval, dan integrasi sistem yang sesuai regulasi.

---

## Preview

- Layout: **1 halaman** (chat utama + panel “Case Setup” di kanan)
- Tema: **hospital-grade**, minimal, readable untuk dokter
- Aksi: Full Modality Diagnosis / Missing Modality Diagnosis / Reset

📸 Tambahkan screenshot setelah build:
- `docs/screenshot-1.png`
- `docs/screenshot-2.png`

---

## Fitur

- ✅ **Single-page chat interface** (dokter fokus ke percakapan)
- ✅ Panel **Case Setup**:
  - Identitas pasien: **Age** & **Gender** (opsional)
  - Upload MRI modalities: **T1c, T1, T2, FLAIR** (drag & drop / click)
- ✅ Tombol aksi:
  - **Full Modality Diagnosis**
  - **Missing Modality Diagnosis**
  - **Reset Case**
- ✅ UI clean: dominan putih, spacing rapi, tipografi nyaman
- ✅ Responsive (laptop klinik/PC radiologi)

---

## Tech Stack

- **Laravel 12**
- Blade Templates
- Vanilla JS (AJAX-ready)
- Custom CSS (tanpa framework UI berat)

---

## Persyaratan

- PHP **8.2+**
- Composer
- (Opsional) Node.js jika kamu mau bundling asset sendiri

---

## Instalasi (Local)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
