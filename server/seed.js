require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'Stock GPT',
    subtitle: 'AI based MCP App',
    description:
      'Developed an AI-based application that integrates the Zerodha trading server for direct interaction with Claude AI via the Model Context Protocol (MCP). Enables natural language queries against live market data.',
    tags: ['JavaScript', 'Node.js', 'MCP', 'Claude API', 'Zerodha'],
    category: ['AI'],
    githubUrl: 'https://github.com/BondeYash',
    liveUrl: '',
    featured: true,
    order: 1,
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #1e1b4b 50%, #3730a3 100%)'
  },
  {
    title: 'Token Master',
    subtitle: 'Blockchain Event Management DApp',
    description:
      'Built a decentralized web application to track and manage events using blockchain tokens. Uses Ethereum smart contracts for trustless event ticketing and ownership verification, eliminating centralized control.',
    tags: ['Solidity', 'Ethereum', 'React.js', 'Web3.js', 'Smart Contracts'],
    category: ['BLOCKCHAIN'],
    githubUrl: 'https://github.com/BondeYash',
    liveUrl: '',
    featured: true,
    order: 2,
    gradient: 'linear-gradient(135deg, #1a0533 0%, #4c1d95 50%, #059669 100%)'
  },
  {
    title: 'AI Code Analyzer',
    subtitle: 'Full Stack MERN Web App',
    description:
      'Built an AI-powered code analysis tool using the MERN stack. Accepts code input, analyzes structure, detects potential issues, and provides intelligent improvement suggestions powered by AI language models.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI', 'MERN'],
    category: ['MERN', 'AI'],
    githubUrl: 'https://github.com/BondeYash',
    liveUrl: '',
    featured: true,
    order: 3,
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
  },
  {
    title: 'Yellow Stone',
    subtitle: 'Full Stack MERN & AI Web App',
    description:
      'Full-stack AI-based project management application serving students, employees, and companies. Features AI-driven task suggestions, progress tracking, team collaboration, and smart deadline management.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI', 'MERN'],
    category: ['MERN', 'AI'],
    githubUrl: 'https://github.com/BondeYash',
    liveUrl: '',
    featured: false,
    order: 4,
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)'
  },
  {
    title: 'CodeHawks Eggstravaganza 2025',
    subtitle: 'Smart Contract Auditing — CTF',
    description:
      "Participated in Cyfrin's CodeHawks Eggstravaganza CTF challenge focused on discovering and exploiting vulnerabilities in Solidity smart contracts. Applied manual code review and fuzzing techniques to identify critical security flaws.",
    tags: ['Solidity', 'Smart Contracts', 'Security', 'CTF', 'Cyfrin'],
    category: ['BLOCKCHAIN'],
    githubUrl: 'https://github.com/BondeYash',
    liveUrl: '',
    featured: false,
    order: 5,
    gradient: 'linear-gradient(135deg, #8e0e00 0%, #1f1c18 100%)'
  },
  {
    title: 'Women Safety App',
    subtitle: 'Android Application — Final Year Project',
    description:
      'Developed an Android application focused on women\'s safety featuring real-time emergency alerts, GPS location sharing, and one-tap SOS functionality. Built during Polytechnic final year in Bharuch, India.',
    tags: ['Android', 'Java', 'GPS', 'Firebase', 'Emergency Alerts'],
    category: ['JAVA', 'MOBILE'],
    githubUrl: 'https://github.com/BondeYash',
    liveUrl: '',
    featured: false,
    order: 6,
    gradient: 'linear-gradient(135deg, #1d4350 0%, #a43931 100%)'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    const inserted = await Project.insertMany(projects);
    console.log(`Seeded ${inserted.length} projects`);

    await mongoose.disconnect();
    console.log('Done. MongoDB disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
