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
    name: "AI Triage Agent",
    description:
      "Web-based platform that allows userAn AI-based web application that analyzes user-reported symptoms and provides preliminary health guidance such as self-care advice, doctor consultation, or emergency alerts. It helps users make quick and informed decisions about seeking medical attention.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "HTML",
        color: "green-text-gradient",
      },
      {
        name: "CSS",
        color: "pink-text-gradient",
      },
      {
        name: "JavaScript",
        color: "purple-text-gradient",
      },
    ],
    image: aitriage,
    source_code_link: "https://github.com/aryan4046/AI_Healthcare_Agent.git",
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
];

export { technologies, projects };
