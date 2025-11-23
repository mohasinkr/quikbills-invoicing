# QuikBills - Modern Invoicing System

QuikBills is a modern, user-friendly invoicing system built with Next.js and Supabase. It allows businesses to create, manage, and track invoices and customers efficiently.

## Features

- **User Authentication**: Secure login and signup with email/password and OAuth providers (Google, GitHub)
- **Dashboard**: Overview of key metrics and recent invoices
- **Invoice Management**: Create, edit, delete, and track invoices
- **Customer Management**: Manage customer information and history
- **PDF Generation**: Generate and download professional PDF invoices
- **Dark/Light Mode**: Customizable theme with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Visualization**: Charts and graphs for revenue tracking

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Lucide React icons
- **Backend**: Next.js Server Actions, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **PDF Generation**: PDF-lib, React-PDF
- **State Management**: Zustand
- **Form Handling**: React Hook Form, Zod validation
- **Testing**: Cypress

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PNPM package manager
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohasinkr/quikbills-invoicing.git
   cd quikbills-invoicing
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses the following main tables in Supabase:

- **invoices**: Stores invoice data including amount, status, and customer reference
- **customers**: Contains customer information
- **payments**: Tracks payments associated with invoices

## Testing

Run Cypress tests:

```bash
# Open Cypress test runner
pnpm cypress:open

# Run tests in headless mode
pnpm cypress:run
```

## Deployment

The application can be deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the required environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
