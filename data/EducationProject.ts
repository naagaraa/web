export const EducationProjectItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Orion Scanner",
    subtitle:
      "An OCR scanner app using PHP and Tesseract to extract text from documents.",
    description: "Document and text scanner using OCR and Tesseract in PHP.",
    content: `
      <p>Software development isn't just about building CRUD apps—it's about solving real-world problems through smart use of logic, algorithms, and available technologies. One of the projects I found most insightful was building an OCR (Optical Character Recognition) scanner using PHP and the Tesseract engine.</p>

      <p>The motivation came from the need to extract text from scanned academic documents—transcripts, forms, and printed data sheets—which are often stored as images or PDFs. While there are many high-level tools available, I deliberately chose a lower-level approach to better understand the mechanics of OCR.</p>

      <h2>The Technical Challenge</h2>
      <p>The core challenge was in preprocessing the image data: resizing, binarization, and dealing with inconsistent formatting. Integrating Tesseract into a PHP application required executing system commands securely and handling a range of file types. I also built a simple interface to preview, crop, and process scanned images directly from the browser.</p>

      <p>From managing fonts and language data to optimizing recognition accuracy, every step taught me how text recognition works behind the scenes. I even experimented with training custom character sets for better support of Bahasa Indonesia, which proved to be both difficult and fascinating.</p>

      <h2>Why It Matters</h2>
      <p>This project isn’t polished for production—it’s a learning tool. I wasn’t building it to be perfect, I was building it to learn, and I did. I learned about OCR pipelines, PHP system functions, and the incredible complexity that lies behind what looks like “just reading text from an image.”</p>

      <p>Most importantly, it deepened my appreciation for the kinds of invisible tech we rely on every day—from Google Translate’s camera scan feature to PDF editors—and made me want to explore more areas where code meets the physical world.</p>
    `,
    author: {
      name: "Eka Jaya Nagara",
      avatar: "/assets/hero.png",
      bio: "Fullstack Developer",
    },
    publishedAt: "2024-11-18",
    readTime: 4,
    tags: ["PHP", "OCR", "Tesseract", "Learning"],
    video: "bOJDWDc8t2E",
    link: "",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1556792189-55769c8dfbac?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Metodeskripshit",
    subtitle:
      "A PHP library to assist academic research with automation tools.",
    description: "PHP library of common academic and statistical methods.",
    content: `
      <p>Writing an undergraduate thesis can feel overwhelming—especially when it comes to applying academic methodologies or statistical calculations. During my final year, I decided to tackle that challenge head-on by building a reusable PHP library to automate many of those repetitive tasks.</p>

      <h2>Building the Toolkit</h2>
      <p><code>Metodeskripshit</code> started as a personal toolkit: a set of functions to calculate means, medians, standard deviations, and common correlation coefficients. Over time, it grew into a more complete package that other students could benefit from as well.</p>

      <p>I modularized it, added Composer support, and documented it in Bahasa Indonesia to make it accessible for fellow classmates. It covers basic descriptive statistics, frequency tables, scoring conversions, and even Likert scale calculations—all of which are commonly used in student research papers.</p>

      <h2>Why PHP?</h2>
      <p>The idea wasn’t to reinvent the wheel, but to localize it—simplifying tools that often require Python, SPSS, or R into something students with limited tech background could still use, through PHP, which is widely taught in our local universities.</p>

      <h2>What I Learned</h2>
      <p>Working on this library taught me how to think in terms of public APIs, documentation, and user empathy. I had to consider: what functions are intuitive? What parameters make sense? How do you document math in a way that's easy to follow?</p>

      <p>Though it's a small project, it made a big impact. A few classmates used it in their own thesis projects, and I gained valuable experience in packaging code for reuse—an essential skill in any real-world software environment.</p>
    `,
    author: {
      name: "Eka Jaya Nagara",
      avatar: "/assets/hero.png",
      bio: "Fullstack Developer",
    },
    publishedAt: "2023-07-03",
    readTime: 3,
    tags: ["PHP", "Academic", "Library"],
    video: "",
    link: "https://naagaraa.github.io/web-metode-skripsi/",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mini MVC PHP Framework",
    subtitle:
      "A lightweight PHP framework inspired by Laravel and CodeIgniter.",
    description:
      "A lightweight MVC PHP framework inspired by CodeIgniter and Laravel.",
    content: `
      <p>During my university studies, we were taught basic PHP—mostly procedural style, lots of copy-paste, and minimal structure. I found myself increasingly frustrated with the lack of organization in our projects. That’s when I decided to build my own MVC framework, heavily inspired by CodeIgniter and Laravel.</p>

      <h2>How It Started</h2>
      <p>I wanted something that would teach me how a framework works under the hood. I started with the router: mapping URLs to controller methods. Then I added a simple templating engine using output buffering. Next came a base controller and model system with basic database query helpers.</p>

      <p>Every feature I added—CSRF protection, validation, session management—gave me a deeper understanding of what modern frameworks actually do. Even simple things like handling form errors or flashes taught me how to build developer-friendly experiences.</p>

      <h2>Lessons and Outcomes</h2>
      <p>The final product was called <code>CodeZero</code>, and I wrote the documentation entirely in Bahasa Indonesia to help others in my cohort. It’s not production-ready, but it served as the backend of my final exam system, and it worked well under academic pressure.</p>

      <p>One unexpected benefit was that it helped me later pick up Laravel more quickly. Concepts like middleware, service containers, and migrations made much more sense because I’d implemented simpler versions myself. And it’s incredibly satisfying to build something from scratch, no matter how small.</p>

      <h2>Takeaway</h2>
      <p>More than anything, this project reminded me that frameworks aren’t magic—they’re patterns. And once you understand the patterns, you can build your own tools to fit any project’s needs.</p>
    `,
    author: {
      name: "Eka Jaya Nagara",
      avatar: "/assets/hero.png",
      bio: "Fullstack Developer",
    },
    publishedAt: "2022-12-10",
    readTime: 5,
    tags: ["PHP", "Framework", "MVC", "Laravel"],
    video: "",
    link: "https://nagara.gitbook.io/code-zero-project",
  },
];
