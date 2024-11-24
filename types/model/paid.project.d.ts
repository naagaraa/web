export type paidProjectModel = {
  id: number | string;
  date: string;
  title: string;
  stack: string;
  content?: string;
  link?: string | url;
  cover?: string | url;
  jobs: string;
  part: Array[];
};
