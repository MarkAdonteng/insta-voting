# E-Voting Web Application

A modern and responsive voting web application that allows administrators to create and manage polls with QR code-based access for participants.

## 🚀 Features

### 👤 Admin Interface
- **Create New Polls**: Input questions and dynamically add multiple voting options
- **Poll Configuration**: Toggle between single choice and multiple choice voting
- **Deadline Management**: Set optional voting deadlines or manual end control
- **QR Code Generation**: Generate unique QR codes for each poll with downloadable options
- **Real-time Monitoring**: View vote counts in real-time during active polling
- **Results Visualization**: Display results in interactive bar charts and pie charts
- **Export Functionality**: Export results as PDF or CSV files

### 📱 Voter Interface
- **QR Code Access**: Scan QR codes or click links to access polls
- **Responsive Design**: Optimized for mobile and desktop devices
- **Vote Confirmation**: Clear confirmation messages after vote submission
- **Duplicate Prevention**: Browser fingerprinting prevents multiple votes
- **User-friendly UI**: Intuitive interface with clear voting instructions

### 📊 Results and Analytics
- **Interactive Charts**: Bar charts and pie charts for result visualization
- **Detailed Statistics**: Vote counts, percentages, and total participation
- **Export Options**: PDF reports and CSV data export
- **Real-time Updates**: Live vote counting during active polls

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **QR Codes**: react-qr-code
- **PDF Export**: jsPDF with html2canvas
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Hooks with localStorage persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-voting
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Creating a Poll (Admin)

1. **Navigate to Create Poll Tab**
   - Enter a descriptive poll title
   - Write your poll question
   - Add multiple voting options (minimum 2 required)
   - Choose between single or multiple choice voting
   - Optionally set a deadline

2. **Start Voting**
   - Go to the "Manage Polls" tab
   - Click "Start Voting" on your created poll
   - A QR code will be generated automatically
   - Share the QR code or copy the voting link

3. **Monitor Progress**
   - View real-time vote counts
   - Stop voting at any time
   - Access results immediately after stopping

### Voting (Participants)

1. **Access the Poll**
   - Scan the QR code with your mobile device
   - Or click the shared voting link

2. **Cast Your Vote**
   - Read the poll question carefully
   - Select your preferred option(s)
   - Click "Submit Vote" to confirm

3. **Confirmation**
   - Receive immediate confirmation
   - Note: You can only vote once per poll

### Viewing Results (Admin)

1. **Navigate to Results Tab**
   - Select a completed poll from the dropdown
   - View interactive charts (bar or pie chart)
   - See detailed statistics and percentages

2. **Export Data**
   - Download results as PDF report
   - Export raw data as CSV file
   - Charts and tables included in exports

## 🔒 Security Features

- **Duplicate Vote Prevention**: Browser fingerprinting technology
- **Anonymous Voting**: No personal data collection
- **Secure Data Storage**: Local storage with data persistence
- **Poll Access Control**: Unique URLs for each poll

## 📱 Mobile Responsiveness

- Fully responsive design for all screen sizes
- Touch-friendly interface for mobile voting
- Optimized QR code scanning experience
- Mobile-first approach for voter interface

## 🎨 UI/UX Features

- Modern, clean interface design
- Intuitive navigation with tab-based layout
- Real-time feedback and loading states
- Accessible design with proper focus management
- Smooth animations and transitions

## 📊 Data Management

- **Local Storage**: All data persisted in browser localStorage
- **Real-time Updates**: Automatic data synchronization
- **Export Capabilities**: Multiple export formats available
- **Data Structure**: Organized poll and vote data models

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
