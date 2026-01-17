# BrainVLM (Laravel 12) – Front-end Starter

Paket ini berisi **front-end** (Blade + CSS/JS statis) untuk halaman aplikasi seperti demo BrainVLM: panel instruksi, chat UI, upload 4 modality (T1c/T1/T2/FLAIR), input Age/Gender, serta tombol **Full modality Diagnosis**, **Missing Modality Diagnosis**, dan **Restart**.

**UI saja:** belum ada inference / pemrosesan MRI. Tombol Diagnosis saat ini hanya menambahkan pesan dummy ke chat dan menampilkan status validasi sederhana.

## Cara pakai (Laravel 12)
1. Buat project Laravel 12 baru (di mesin kamu):
   ```bash
   composer create-project laravel/laravel brainvlm-app
   cd brainvlm-app
   ```

2. Copy isi ZIP ini ke root project `brainvlm-app/` (merge folder). Pastikan file berikut tertimpa/terbuat:
   - `routes/web.php`
   - `app/Http/Controllers/BrainVlmController.php`
   - `resources/views/layouts/app.blade.php`
   - `resources/views/brainvlm/index.blade.php`
   - `resources/views/components/dropzone.blade.php`
   - `public/css/brainvlm.css`
   - `public/js/brainvlm.js`
   - `public/assets/brainvlm-logo.svg`

3. Jalankan server:
   ```bash
   php artisan serve
   ```

4. Buka di browser:
   - `http://127.0.0.1:8000/` (default diarahkan ke halaman BrainVLM)
   - atau `http://127.0.0.1:8000/brainvlm`

## Integrasi backend (nanti)
UI ini sudah menyiapkan struktur form + input file. Saat kamu siap menghubungkan ke backend inference:
- arahkan tombol Diagnosis untuk submit ke endpoint (misalnya `POST /diagnose`)
- di controller, validasi input (file type/size/modality)
- simpan file ke storage, panggil pipeline inference, lalu kirim balik hasil (via JSON / SSE / WebSocket) dan render ke chat.

## Catatan desain
Tampilan dibuat bergaya “rumah sakit”: warna netral, kontras tinggi, tipografi rapi, dan layout bersih.

