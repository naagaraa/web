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
      "Performed in-depth maintenance and bug fixing for a legacy website built using CodeIgniter 3. Responsibilities included resolving pagination issues, fixing index display logic, and ensuring consistency across dynamic routes. The task required careful debugging without breaking existing features in a live production environment.",
    image: Porto11,
  },
  {
    id: 2,
    title: "CMS System Rebuild – Backend Migration (Laravel 8)",
    description:
      "Led the backend migration of a legacy CMS from raw PHP version 5 to Laravel 8. The first phase included restructuring the database schema, implementing proper MVC patterns, and introducing middleware and validation layers to improve maintainability, security, and performance. This work laid the foundation for the full system rewrite.",
    image: Porto10,
  },
  {
    id: 3,
    title: "CMS Rewrite – Frontend & UI Enhancement",
    description:
      "Focused on frontend development during the second phase of the CMS rewrite. Tasks involved refactoring Blade templates, enhancing user interaction with dynamic components, and improving responsiveness using Tailwind CSS. The goal was to modernize the user interface while maintaining compatibility with the updated backend.",
    image: Porto9,
  },
  {
    id: 4,
    title: "Custom CMS Development for News Platform",
    description:
      "Developed a tailored CMS solution for a news-based website using Laravel. Implemented custom admin tools, string parsing utilities for slug generation, and SEO-friendly routing. Integrated roles and permissions with flexible content creation workflows designed specifically for non-technical editors.",
    image: Porto1,
  },
  {
    id: 5,
    title: "Performance Management System (Multi-role Feedback)",
    description:
      "Built a full-featured performance management system (PMS) from scratch. The system supported multi-role assessments including peer-to-peer, manager-to-employee, and self-evaluations. Designed custom input forms, evaluation metrics, and email reminders, all integrated within a secure and scalable Laravel framework.",
    image: Porto2,
  },
  {
    id: 6,
    title: "PMS Administrative Dashboard Interface",
    description:
      "Designed and implemented the PMS administrative dashboard, allowing HR and team leads to manage assessment schedules, assign evaluators, and monitor progress in real time. Incorporated data visualization tools and filters for enhanced user control and accessibility.",
    image: Porto3,
  },
  {
    id: 7,
    title: "Employee Evaluation Portal (PMS)",
    description:
      "Developed the employee-facing portal of the PMS, providing a clean and intuitive interface for completing evaluations. Integrated real-time validation, auto-save functionality, and role-based content display. Ensured the experience remained seamless across devices.",
    image: Porto7,
  },
  {
    id: 8,
    title: "Confidential Review System (PMS Module)",
    description:
      "Implemented a confidential review module within the PMS that allowed for restricted access to sensitive assessments. The system used permission-based access control and encrypted record storage to ensure only authorized reviewers could view specific submissions.",
    image: Porto8,
  },
  {
    id: 9,
    title: "Landing Page for Cipta Mandiri Gas (Oil & Gas Industry)",
    description:
      "Designed and delivered a responsive one-page landing site for a company in the oil and gas sector. Built in under 24 hours using pure PHP and Tailwind CSS, the page included key company highlights, service offerings, and contact information optimized for mobile and desktop users.",
    image: Porto12,
  },
];
