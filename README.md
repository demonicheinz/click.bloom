<div align="center">

<!-- ![Banner](/assets/banner.png) -->

<br>

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&labelColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript&labelColor=black)
![React](https://img.shields.io/badge/React-black?logo=react&labelColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss&labelColor=black)

![GitHub License](https://img.shields.io/github/license/demonicheinz/click.bloom?logo=creative-commons&logoColor=white&label=License)
![GitHub last commit](https://img.shields.io/github/last-commit/demonicheinz/click.bloom?logo=github&label=Last%20Commit)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/demonicheinz/click.bloom/CodeQL.yml?branch=main&logo=github&label=Build)
[![Live Preview](https://img.shields.io/badge/Live%20Preview-🔗-blue?logo=vercel&logoColor=white)](https://links.heinz.id/)

</div>

## Table of Content

1. [Deskripsi](#deskripsi)
2. [Fitur](#feature)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Deployment](#deployment)
6. [Kontribusi](#kontribusi)
7. [Lisensi](#lisensi)
8. [Kontak](#kontak)


## Deskripsi

Click Bloom adalah aplikasi berbagi tautan pribadi yang mirip dengan Linktree. Aplikasi ini memungkinkan Anda membuat halaman bio dengan tautan-tautan yang dapat dikustomisasi sepenuhnya.

## Fitur

### Halaman Bio Publik
- Header profil dengan foto, nama, dan bio singkat
- Icon media sosial yang dapat dikustomisasi
- Tautan yang responsif dengan animasi hover/klik
- Pengelompokkan tautan berdasarkan kategori
- Penghitung klik untuk setiap tautan
- Tampilan yang sepenuhnya responsif untuk mobile dan desktop

### Dasbor Admin
- Login yang aman menggunakan Supabase Auth
- Manajemen tautan lengkap (tambah, edit, hapus)
- Pengurutan tautan dengan drag-and-drop
- Pengaturan status aktif/tidak aktif untuk setiap tautan
- Upload ikon/gambar untuk tautan
- Analitik klik dan statistik pengunjung

### Kustomisasi Tampilan
- Pengaturan tema (warna dan font)
- Upload dan edit foto profil
- Pengaturan bio dan media sosial

## Tech Stack

ClickBloom dibangun dengan:

- **Frontend**:
  - Next.js 15 dengan App Router
  - TypeScript
  - TailwindCSS
  - shadcn/ui & RadixUI
  - React Query

- **Backend**:
  - Supabase untuk database PostgreSQL
  - Supabase Auth untuk autentikasi
  - Supabase Storage untuk penyimpanan media

## Getting Started

### Prasyarat

- **Node.js** `v18` atau yang lebih baru → [Download Node.js](https://nodejs.org/)
- **Package Manager**:  
  - [`pnpm`](https://pnpm.io/) (disarankan)  
  - [`npm`](https://www.npmjs.com/)  
  - [`yarn`](https://yarnpkg.com/)  
  - [`bun`](https://bun.sh/)
- **Akun Supabase** → [Daftar di Supabase](https://supabase.com/)

### Instalasi

1. Clone repositori:
    ```bash
    git clone https://github.com/yourusername/click.boom.git
    cd click.boom
    ```

2. Instal dependensi:
    ```bash
    pnpm install
    # atau
    npm install
    # atau
    yarn install
    # atau
    bun install
    ```

3. Buat file `.env.local`:\
    Linux & macOS:
    ```bash
    # (bash/zsh)
    cp .env.example .env.local
    ```

    Windows:
    ```bash
    # (CMD/Command Prompt)
    copy .env.example .env.local
    
    # (PowerShell)
    Copy-Item .env.example -Destination .env.local
    ```

4. Edit `.env.local` dan tambahkan konfigurasi berikut:
    ```ini
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
    ```

5. Setup Supabase:
   - Buat proyek baru di Supabase
   - Jalankan SQL yang ada di `supabase/schema.sql` untuk membuat tabel dan kebijakan akses
   - Aktifkan autentikasi email dan buat akun admin pertama

6. Jalankan aplikasi:
    ```bash
    pnpm dev
    # atau
    npm run dev
    # atau
    yarn dev
    # atau
    bun dev
    ```

6. Buka `http://localhost:3000` di browser Anda

### Setup Database

Jalankan SQL berikut di SQL Editor Supabase Anda:

<details>
<summary>📃 SQL</summary>

```sql
-- Tabel Admin Profile
CREATE TABLE public.admin_profile (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Links
CREATE TABLE public.links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  position INTEGER NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Categories (opsional)
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Setup Row Level Security
ALTER TABLE public.admin_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk Admin Profile
CREATE POLICY "Admin profile is viewable by everyone" 
ON public.admin_profile FOR SELECT USING (true);

CREATE POLICY "Only admin can update profile" 
ON public.admin_profile FOR UPDATE USING (auth.uid() = id);

-- Kebijakan untuk Links
CREATE POLICY "Links are viewable by everyone" 
ON public.links FOR SELECT USING (true);

CREATE POLICY "Only admin can insert links" 
ON public.links FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_profile WHERE id = auth.uid())
);

CREATE POLICY "Only admin can update links" 
ON public.links FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_profile WHERE id = auth.uid())
);

CREATE POLICY "Only admin can delete links" 
ON public.links FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_profile WHERE id = auth.uid())
);

-- Kebijakan untuk Categories
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Only admin can manage categories" 
ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_profile WHERE id = auth.uid())
);
```

</details>

## Deployment

Click Bloom dapat dengan mudah di-deploy ke layanan hosting seperti Vercel atau Netlify:

1. Buat repositori GitHub untuk proyek Anda
2. Hubungkan repositori ke Vercel atau Netlify
3. Konfigurasikan `.env.local` yang diperlukan
4. Deploy!

## Kontribusi

Kontribusi selalu disambut! Silakan ikuti langkah-langkah ini:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## Kontak

Jika ada pertanyaan atau ingin berkontribusi, jangan ragu untuk menghubungi saya!  

Email: [contact@heinz.id](mailto:contact@heinz.id)
GitHub: [Heinz](https://github.com/demonicheinz)

Made with ❤️ by [Heinz](https://github.com/demonicheinz)

Terima kasih telah melihat proyek ini! **Happy coding**🚀
