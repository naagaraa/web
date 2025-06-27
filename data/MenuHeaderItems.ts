export const menuItems = [
  { title: "Home", link: "/" },
  {
    title: "Apps",
    megaMenu: true,
    children: [
      {
        title: "Lihat Semua",
        children: [
          {
            title: "Apps",
            link: "/apps",
          },
        ],
      },

      {
        title: "Mental Health",
        children: [
          { title: "Anxiety", link: "/apps/mental-health/anxiety" },
          { title: "Depression", link: "/apps/mental-health/depression" },
        ],
      },
      {
        title: "Documents",
        children: [
          { title: "PDF Tools", link: "/apps/pdf" },
          { title: "Text Tools", link: "/apps/text" },
        ],
      },
      {
        title: "Image Tools",
        children: [
          { title: "Compressor", link: "/apps/image/compressor" },
          { title: "Watermark", link: "/apps/image/watermark" },
        ],
      },
      {
        title: "Calculator",
        children: [
          { title: "Blood Glucose", link: "/apps/calculator/blood-glucose" },
          { title: "BMI", link: "/apps/calculator/bmi" },
          { title: "Calorie", link: "/apps/calculator/calorie" },
        ],
      },
    ],
  },
  {
    title: "About",
    children: [
      { title: "Developer", link: "/about" },
      { title: "Sponsorship", link: "/sponsorship" },
    ],
  },
  { title: "Blog", link: "https://medium.com/@naagaraa" },
  { title: "Contact", link: "/contact" },
];
