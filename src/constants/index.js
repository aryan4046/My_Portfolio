import {
  javascript,
  html,
  css,
  reactjs,
  nodejs,
  git,
  figma,
  python,
  cloud,
  aitriage,
  ecobudget,
  web,
  mobile,
  backend,
  creator,
  ai_health,
  projexly,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "AI / ML Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI / UX Designer",
    icon: creator,
  },
];



const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "GCP",
    icon: cloud,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
];



const projects = [
  {
    name: "AI Health Assistant",
    description:
      "AI-powered web application that analyzes user-reported symptoms using Logistic Regression and TF-IDF, classifies risk levels, and recommends specialist doctors along with real doctors from Ahmedabad. Built using React, Flask, MySQL, and Scikit-learn, this project demonstrates full-stack development combined with machine learning integration.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Flask",
        color: "green-text-gradient",
      },
      {
        name: "MySQL",
        color: "pink-text-gradient",
      },
      {
        name: "Scikit-learn",
        color: "purple-text-gradient",
      },
    ],
    image: ai_health,
    source_code_link: "https://github.com/aryan4046/AI-Triage-System.git",
  },
  {
    name: "EcoBudget",
    description:
      "A Streamlit-based web application to track personal expenses and calculate carbon footprint by spending category. It provides real-time dashboards, eco-scores, and chatbot-based suggestions to promote a sustainable lifestyle.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Streamlit",
        color: "green-text-gradient",
      },
    ],
    image: ecobudget,
    source_code_link: "https://github.com/aryan4046/EcoBudget-Smart-Money-Carbon-Planner.git",
  },
  {
    name: "Projexly",
    description:
      "Projexly is a full-stack freelance marketplace web application built for students and freelancers. Students can post projects with budget and deadline, while freelancers can browse projects, send proposals, and complete assigned work. The platform includes separate dashboards, role-based authentication using JWT, and secure project management. Built using React, Tailwind CSS, Node.js, Express, and MongoDB.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "MongoDB",
        color: "yellow-text-gradient",
      },
    ],
    image: projexly,
    source_code_link: "https://github.com/aryan4046/Projexly.git",
  },
];

export { technologies, projects };
