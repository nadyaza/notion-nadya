# Notion Workshop - Registration Website

Website pendaftaran workshop Notion dengan design aesthetic ala Notion, menggunakan Next.js, Tailwind CSS, dan Prisma.

## Features

- 🎨 **Notion-style Design** - Aesthetic beige/cream dengan monospace typography
- 📱 **Fully Responsive** - Mobile-friendly design
- 📝 **Registration Form** dengan validasi:
  - Nama Lengkap
  - Email (dengan format validation)
  - No. WhatsApp (dengan format validation Indonesia)
  - Institusi / Pekerjaan
  - Kebutuhan / Tujuan mengikuti workshop
  - Saran Topik kedepannya (optional)
- 💾 **Database Integration** - SQLite dengan Prisma ORM
- ✅ **Form Validation** - Client & server-side validation
- 📊 **Admin Dashboard** - Halaman untuk melihat semua pendaftar
- ⚡ **Modern Stack** - Next.js 16, TypeScript, Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite
- **ORM**: Prisma
- **Font**: Monospace (ui-monospace, Cascadia Code, Source Code Pro, Menlo, Courier New)

## Getting Started

### Prerequisites

- Node.js 18.x atau lebih tinggi
- npm atau yarn

### Installation

1. Clone repository ini
2. Install dependencies:

```bash
npm install
```

3. Setup database:

```bash
npx prisma migrate dev
```

4. Run development server:

```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Pages

### Landing Page (/)
- Informasi tentang workshop Notion
- Form pendaftaran
- Responsive design

### Admin Dashboard (/registrations)
- Melihat semua data pendaftar
- Sorted by newest first
- Menampilkan semua informasi pendaftar

## Database Schema

```prisma
model Registration {
  id         Int      @id @default(autoincrement())
  nama       String
  email      String
  whatsapp   String
  institusi  String
  kebutuhan  String
  saranTopik String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## API Endpoints

### POST /api/register
Submit form pendaftaran

**Request Body:**
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "whatsapp": "08123456789",
  "institusi": "Universitas Indonesia",
  "kebutuhan": "Belajar produktivitas",
  "saranTopik": "Advanced Notion features"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil!",
  "data": { ... }
}
```

## Database Management

### View database with Prisma Studio

```bash
npx prisma studio
```

Prisma Studio akan membuka di browser dan Anda bisa melihat/edit data secara visual.

### Reset database

```bash
npx prisma migrate reset
```

### Generate Prisma Client (after schema changes)

```bash
npx prisma generate
```

## Project Structure

```
notion-nadya/
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts          # API endpoint
│   ├── registrations/
│   │   └── page.tsx              # Admin dashboard
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── lib/
│   └── prisma.ts                 # Prisma client instance
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── .env                          # Environment variables
└── package.json
```

## Customization

### Update Event Information
Edit `app/page.tsx` di bagian "Tentang Acara" untuk mengubah tanggal, waktu, lokasi, dan harga.

### Change Color Theme
Edit `app/globals.css` di bagian `:root` untuk mengubah warna:
- `--background`: Background color
- `--foreground`: Text color
- `--accent`: Accent color
- `--border`: Border color

### Modify Form Fields
1. Update `app/page.tsx` - tambah/hapus form fields
2. Update `prisma/schema.prisma` - sesuaikan database schema
3. Update `app/api/register/route.ts` - tambah validasi
4. Run `npx prisma migrate dev` untuk apply changes

## Deploy to Production

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Vercel akan auto-detect Next.js dan setup build
4. Untuk production database, ganti dari SQLite ke PostgreSQL:
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Add PostgreSQL DATABASE_URL di Vercel environment variables
   - Run migration di production

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Open Prisma Studio
npx prisma studio
```

## License

MIT

## Support

Jika ada pertanyaan atau issues, silakan buat issue di repository ini.
