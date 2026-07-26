# Kutirchar EcoFarm

**Agricultural technology platform for sustainable farming and circular economy integration.**

*Note: This is an archived version. See KutircharEcoFarm (current version) for the latest.*

## Overview

Kutirchar EcoFarm is a comprehensive agricultural technology platform designed to:
- Support sustainable farm practices
- Integrate biogas and energy solutions
- Manage goat breeding programs
- Support silage production
- Enable circular economy workflows

## Tech Stack

- **Frontend:** React/Next.js
- **Backend:** Node.js/Express
- **Database:** PostgreSQL
- **Authentication:** JWT/OAuth
- **Hosting:** Vercel/AWS

## Project Structure

```
src/
├── components/       # React components
├── pages/           # Next.js pages
├── services/        # API services
├── utils/           # Utilities
├── hooks/           # Custom React hooks
└── styles/          # Styling

public/
├── images/          # Static images
└── assets/          # Static assets
```

## Features

### Farm Management
- Farm profile management
- Land and resource tracking
- Seasonal planning

### Livestock Management
- Goat breed management
- Breeding records
- Health tracking
- Performance metrics

### Biogas & Energy
- Biogas production tracking
- Energy generation logs
- Efficiency calculations
- Carbon credit tracking

### Sustainability
- Silage production management
- Waste management
- Sustainability metrics
- Environmental impact tracking

## Development

### Prerequisites
- Node.js 16+
- npm or pnpm

### Installation

```bash
npm install
# or
pnpm install
```

### Start Development

```bash
npm run dev
# Server runs on http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## Environment Configuration

```bash
cp .env.example .env.local
# Configure with your settings
```

## Deployment

### To Vercel
```bash
vercel --prod
```

### To AWS
Build and deploy using your preferred AWS deployment method.

## API Endpoints

See `/docs/API.md` for complete API documentation.

Key endpoints:
- `GET /api/farms` - List farms
- `GET /api/farms/:id` - Farm details
- `POST /api/livestock` - Add livestock
- `GET /api/biogas` - Biogas data
- `POST /api/sustainability` - Sustainability records

## Database

See `/docs/DATABASE.md` for schema.

Key tables:
- farms
- livestock
- biogas_production
- sustainability_metrics
- users
- user_farms

## Testing

```bash
npm test              # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Contributing

See `CONTRIBUTING.md`

## Support

- **Email:** support@kuticshareecofarm.com
- **Website:** https://kutichareecofarm.com

## Archive Notice

This version is archived. Active development continues in the `KutircharEcoFarm` project. Please refer to that project for the latest features and updates.

## License

Private - SYSmoAI. All rights reserved.

---

Built in Dhaka, Bangladesh 🇧🇩
