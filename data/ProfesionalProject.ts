import Porto1 from "@/assets/portofolio-1.jpeg";
import Porto2 from "@/assets/portofolio-2.jpeg";
import Porto3 from "@/assets/portofolio-3.jpeg";
import Porto7 from "@/assets/portofolio-7.jpeg";
import Porto8 from "@/assets/portofolio-8.jpeg";
import Porto9 from "@/assets/portofolio-9.jpg";
import Porto10 from "@/assets/portofolio-10.jpg";
import Porto11 from "@/assets/portofolio-11.jpg";
import Porto12 from "@/assets/portofolio-12.jpg";

export const ProfessionalProjects = [
  {
    id: 1,
    title: "Website Maintenance & Bug Fixing (CodeIgniter 3)",
    description:
      "Performed in-depth maintenance and bug fixing for a legacy website built using CodeIgniter 3. Responsibilities included resolving pagination issues, fixing index display logic, and ensuring consistency across dynamic routes.",
    image: Porto11,
    content: `
      <h2>Legacy Website Maintenance & Bug Fixing</h2>
      <p>This project involved working with an older CodeIgniter 3 codebase that had been live for years without major maintenance. Several issues had accumulated over time, ranging from broken pagination to inconsistent dynamic route behavior.</p>
      <p>I was tasked with identifying and fixing these bugs without introducing regressions to the production environment. Debugging legacy code is always a delicate process, requiring both caution and patience.</p>
      <p>Among the biggest challenges was fixing pagination logic that failed when filters were applied, as well as correcting index numbering across views. I also optimized the route logic to ensure URL parameters were handled cleanly and predictably across different modules.</p>
      <p>This experience strengthened my ability to maintain legacy systems while preparing for future migration work.</p>
    `,
  },
  {
    id: 2,
    title: "CMS System Rebuild – Backend Migration (Laravel 8)",
    description:
      "Led the backend migration of a legacy CMS from raw PHP version 5 to Laravel 8. Restructured the database schema, implemented proper MVC patterns, middleware, and validation.",
    image: Porto10,
    content: `
      <h2>Rebuilding a Legacy CMS with Laravel 8</h2>
      <p>This project began as a backend modernization initiative, converting an old CMS built in raw PHP 5 into a more maintainable structure using Laravel 8.</p>
      <p>I redesigned the database schema for normalization and scalability, and implemented Laravel's MVC architecture to improve separation of concerns. Middleware was used for access control and request filtering, and custom validation rules were added for cleaner form handling.</p>
      <p>The migration also allowed us to introduce features like request throttling, route grouping, and more robust error handling.</p>
      <p>This foundational work significantly improved the long-term sustainability of the CMS and paved the way for the next phase: frontend modernization.</p>
    `,
  },
  {
    id: 3,
    title: "CMS Rewrite – Frontend & UI Enhancement",
    description:
      "Refactored Blade templates, enhanced UI with Tailwind CSS, and improved responsive design and interactivity during CMS rewrite phase two.",
    image: Porto9,
    content: `
      <h2>Modernizing CMS Frontend with Tailwind & Blade</h2>
      <p>After completing the backend rewrite in Laravel 8, I shifted focus to revamping the frontend using Blade templating and Tailwind CSS.</p>
      <p>Major UI improvements included making the admin dashboard mobile-responsive, improving form accessibility, and introducing dynamic components for a better user experience.</p>
      <p>I also cleaned up existing views to follow a consistent component-based structure, which reduced repetition and simplified future UI maintenance.</p>
      <p>This phase not only modernized the look and feel of the CMS but also brought the UX up to par with current standards.</p>
    `,
  },
  {
    id: 4,
    title: "Custom CMS Development for News Platform",
    description:
      "Developed a Laravel-based CMS with tools for content creation, slug generation, and SEO optimization, tailored for news editors.",
    image: Porto1,
    content: `
      <h2>Custom CMS for News Publishing</h2>
      <p>I designed and built a custom CMS from scratch using Laravel, tailored for the needs of a digital news publishing platform.</p>
      <p>The system included an intuitive admin panel, automatic slug generation, SEO-friendly routes, and a clean WYSIWYG editor for content creation.</p>
      <p>Permissions and role management were integrated to separate editors, contributors, and administrators. The platform was optimized to handle large volumes of content with categorization and tagging systems.</p>
      <p>By prioritizing simplicity and flexibility, this CMS empowered non-technical editors to manage content efficiently and independently.</p>
    `,
  },
  {
    id: 5,
    title: "Performance Management System (Multi-role Feedback)",
    description:
      "Built a Laravel-based PMS for handling peer, manager, and self-assessments. Custom metrics, dynamic forms, and evaluation logic included.",
    image: Porto2,
    content: `
      <h2>Multi-role Feedback PMS System</h2>
      <p>This project centered around building a comprehensive Performance Management System that allowed for evaluations from various perspectives: self, peer, and supervisor.</p>
      <p>I architected the system in Laravel, introducing custom scoring logic, dynamic form builders, and a robust backend for managing evaluation cycles.</p>
      <p>Evaluations were role-based and configurable, supporting optional anonymity. Reminder systems and progress tracking were added to increase participation and completeness.</p>
      <p>This tool was key in digitizing and standardizing a formerly manual process.</p>
    `,
  },
  {
    id: 6,
    title: "PMS Administrative Dashboard Interface",
    description:
      "Designed the dashboard for managing performance reviews, with real-time monitoring, data filters, and assignment tools for HR teams.",
    image: Porto3,
    content: `
      <h2>PMS Admin Dashboard for HR Control</h2>
      <p>I created the administrative interface of the PMS system to give HR departments complete control over review periods, evaluator assignments, and progress tracking.</p>
      <p>The dashboard provided real-time overviews of submission rates, pending evaluations, and cycle progress. Filters and search tools made large datasets manageable.</p>
      <p>Custom components were built for assigning evaluators and scheduling review phases with email notifications. This significantly improved the administrative workflow.</p>
    `,
  },
  {
    id: 7,
    title: "Employee Evaluation Portal (PMS)",
    description:
      "Built a mobile-friendly portal for employees to submit evaluations. Included auto-save, real-time validation, and role-based view rendering.",
    image: Porto7,
    content: `
      <h2>Responsive Employee Evaluation Portal</h2>
      <p>As part of the PMS ecosystem, I developed a front-facing portal where employees could securely and conveniently complete their evaluations.</p>
      <p>The UI was designed to be responsive and minimal, focusing on clarity and ease of navigation. Real-time form validation and auto-save features prevented data loss.</p>
      <p>Views were dynamically rendered based on user role and assigned tasks, ensuring personalized access. This module improved user satisfaction and completion rates.</p>
    `,
  },
  {
    id: 8,
    title: "Confidential Review System (PMS Module)",
    description:
      "Built a secure, permission-controlled PMS module for sensitive reviews. Used encrypted storage and restricted reviewer access logic.",
    image: Porto8,
    content: `
      <h2>Secure Confidential Review Module</h2>
      <p>This PMS module handled highly sensitive feedback, such as managerial performance reviews or anonymous suggestions.</p>
      <p>Access was strictly controlled using permission gates and encrypted record storage. Only authorized users could view or comment on confidential assessments.</p>
      <p>This module helped reinforce trust and data integrity within the performance management process.</p>
    `,
  },
  {
    id: 9,
    title: "Landing Page for Cipta Mandiri Gas (Oil & Gas Industry)",
    description:
      "Created a responsive, single-page website in less than 24 hours using PHP and Tailwind CSS. Targeted mobile optimization and company branding.",
    image: Porto12,
    content: `
      <h2>Fast Delivery Landing Page for Oil & Gas Company</h2>
      <p>This was a time-critical project where I designed and launched a landing page for Cipta Mandiri Gas, an oil and gas company, within 24 hours.</p>
      <p>The page was built using pure PHP and styled with Tailwind CSS to ensure responsiveness across devices. Key sections included company overview, service offerings, and contact forms.</p>
      <p>The goal was to create a clean, brand-aligned digital presence quickly—mission accomplished on time and within spec.</p>
    `,
  },
];
