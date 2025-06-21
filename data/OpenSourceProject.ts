export const OpenSourceProject = [
  {
    id: "1",
    image:
      "https://eluminoustechnologies.com/blog/wp-content/uploads/2023/11/2.png",
    title: "PHP Libraries",
    description:
      "PHP libraries commonly used in final projects. See detail for more information.",
    link: "https://naagaraa.github.io/web-metode-skripsi/",
    content: `
      <p>During my final year, I encountered a recurring challenge—manually calculating statistical formulas and applying basic research methods for academic reports. To streamline this, I created a custom PHP library designed specifically for undergraduate students and academic researchers.</p>

      <h2>Why I Built It</h2>
      <p>Most tools like SPSS or Python packages can be intimidating for students without a programming background. Since PHP was widely used at my university, I saw an opportunity to simplify complex concepts into reusable and localized PHP functions.</p>

      <h2>Features and Functions</h2>
      <p>This library includes:</p>
      <ul>
        <li>Descriptive statistics (mean, median, mode, standard deviation)</li>
        <li>Frequency tables and Likert scale support</li>
        <li>Scoring and conversion helpers</li>
        <li>Correlation and basic inferential tools</li>
      </ul>

      <p>I added Composer support and wrote clear documentation in Bahasa Indonesia so students could easily integrate it into their projects.</p>

      <h2>Impact</h2>
      <p>Several classmates adopted it in their theses, and it helped reduce time spent on repetitive calculations. More importantly, it taught me the value of thinking about reusability, documentation, and end-user clarity in software development.</p>
    `,
  },
  {
    id: "2",
    image:
      "https://eluminoustechnologies.com/blog/wp-content/uploads/2023/11/2.png",
    title: "Mini MVC PHP",
    description:
      "A lightweight PHP framework built as a learning journey to better understand PHP architecture. See detail for more information.",
    link: "https://nagara.gitbook.io/code-zero-project",
    content: `
      <p>In university, most projects used unstructured PHP. I quickly realized how unsustainable this was for anything larger than a simple form. That realization sparked the creation of my own mini PHP MVC framework, heavily inspired by Laravel and CodeIgniter.</p>

      <h2>Project Goals</h2>
      <p>I wanted to understand how frameworks worked internally, so I built each part from scratch:</p>
      <ul>
        <li>A router to map URLs to controller methods</li>
        <li>A view engine using basic output buffering</li>
        <li>Base Controller and Model classes with a lightweight query builder</li>
        <li>Session management and basic CSRF protection</li>
      </ul>

      <h2>Documentation and Community</h2>
      <p>The final version, called <code>CodeZero</code>, was documented fully in Bahasa Indonesia. It was used as the backend for an academic grading system I built, and held up well under real student load.</p>

      <h2>Lessons Learned</h2>
      <p>This experience gave me deeper insights into routing logic, service containers, request handling, and more. It also prepared me to quickly understand more advanced tools like Laravel.</p>

      <p>Although not meant for production, it was a turning point in my journey from procedural to structured software development thinking.</p>
    `,
  },
];
