// Konfigurasi publik (aman ditaruh di frontend — akses dijaga oleh RLS di Supabase)
window.WEDDING = {
  supabaseUrl: "https://xbsnvmgdsifmugjsbwle.supabase.co",
  supabaseKey: "sb_publishable_ui4TlL7SawZMii6wNfvhJQ_LusSjOAU",
  bucket: "wedding-photos",
  maxPhotos: 5, // harus sama dengan batas di database (trigger enforce_photo_limit)
  couple: "Khairunnisa & Ajimas",
  date: "", // contoh: "22 November 2026"
};
