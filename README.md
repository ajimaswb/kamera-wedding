# Kamera Tamu — Khairunnisa & Ajimas

Tamu scan QR → kamera HP terbuka → maks 5 jepretan per tamu → foto masuk ke album privat kalian.

| Halaman | Untuk | Isi |
|---|---|---|
| `index.html` | Tamu | Isi nama, jepret, kirim. Kalau sinyal jelek, foto disimpan di HP dan dikirim ulang otomatis |
| `album.html` | Kalian berdua | Login via link email, lihat semua foto, filter per tamu, hapus, unduh .zip |
| `qr.html` | Kalian | Kartu QR siap cetak (4 per A4) + unduh PNG |
| `filter.js` | — | Filter Noir (Tri-X pushed) dipakai di pratinjau tamu & album |

**Filter & ukuran foto:** tamu melihat pratinjau Noir; yang tersimpan adalah foto asli berwarna, diperkecil ke maks 2048px JPEG 82% (~0,5–0,9 MB) supaya muat di storage gratis 1 GB. Di album ada pilihan *Noir / Warna asli* untuk tampilan, unduhan, dan .zip.

## Backend (Supabase project `wedding-khairunnisa-ajimas`, region Singapore)
- Tabel `guests`, `photos`, `admins`; bucket privat `wedding-photos`
- Batas 5 foto dijaga di server (trigger + policy storage), bukan cuma di tampilan
- Tamu tidak bisa melihat foto siapa pun; hanya email di tabel `admins` yang bisa membuka album

## Online-kan (sekali saja)
1. Hosting statis gratis: drag folder ini ke https://app.netlify.com/drop (atau Vercel / GitHub Pages).
2. Di Supabase Dashboard → Authentication → URL Configuration:
   - **Site URL**: alamat situs kamu (mis. `https://kamera-khairunnisa-ajimas.netlify.app`)
   - **Redirect URLs**: tambahkan `https://<situs-kamu>/album.html`
3. Tambah email Khairunnisa sebagai admin (SQL Editor):
   ```sql
   insert into public.admins (email) values ('email-khairunnisa@contoh.com');
   ```
4. Buka `https://<situs-kamu>/qr.html`, cek link-nya, lalu cetak.
5. Isi tanggal acara di `config.js` (`date`).

## Tes lokal
```bash
python3 -m http.server 3000
```
lalu buka http://localhost:3000 (login album lokal berfungsi karena Site URL default Supabase = localhost:3000).
