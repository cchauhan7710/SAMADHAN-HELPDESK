const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Chatbot.jsx',
  'src/pages/TechDashboard.jsx',
  'src/pages/Signup.jsx',
  'src/pages/Login.jsx',
  'src/pages/HeadAdminDashboard.jsx',
  'src/pages/ForgotPassword.jsx',
  'src/pages/Contact.jsx',
  'src/pages/AdminDashboard.jsx',
  'src/pages/Dashboard.jsx'
];

files.forEach(f => {
  const filePath = path.join('Frontend', f);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (f.includes('AdminDashboard') || f.includes('HeadAdminDashboard')) {
    content = content.replace(/const API_BASE = "http:\/\/localhost:5000";/g, 'const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";');
  } else {
    // Replace double quotes
    content = content.replace(/"http:\/\/localhost:5000([^"\n]*)"/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
    // Replace backticks
    content = content.replace(/`http:\/\/localhost:5000([^`\n]*)`/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
    // Replace single quotes
    content = content.replace(/'http:\/\/localhost:5000([^'\n]*)'/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${f}`);
  }
});
