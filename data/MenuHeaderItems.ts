export const menuItems = [
  { title: "Home", link: "/" },
  {
    title: "Apps",
    megaMenu: false,
    children: [
      {
        title: "Lihat Semua",
        children: [
          {
            title: "Apps",
            link: "/apps",
          },
        ],
        link: "/apps",
      },
      {
        title: "Alarm Online",
        link: "/apps/daily/alarm-online",
      },
      {
        title: "Podomoro Timer",
        link: "/apps/daily/pomodoro-timer",
      },
      {
        title: "Image Compressor",
        link: "/apps/image/compressor",
      },
      {
        title: "BMI Calculator",
        link: "/apps/calculator/bmi",
      },
      {
        title: "Comming Soon",
        link: "/coming-soon",
      },

      // {
      //   title: "Mental Health",
      //   children: [
      //     { title: "Anxiety", link: "/apps/mental-health/anxiety" },
      //     { title: "Depression", link: "/apps/mental-health/depression" },
      //   ],
      // },
      // {
      //   title: "Image Tools",
      //   children: [
      //     { title: "Compressor", link: "/apps/image/compressor" },
      //     { title: "Watermark", link: "/apps/image/watermark" },
      //   ],
      // },
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
  { title: "Pricing", link: "/pricing" },
  { title: "Contact", link: "/contact" },
];
