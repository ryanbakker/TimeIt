export const headerLinks = [
  {
    label: "Dashboard",
    route: "/",
  },
  {
    label: "Tasks",
    route: "/tasks",
  },
  {
    label: "Notes",
    route: "/notes",
  },
  {
    label: "Grades",
    route: "/grades",
  },
  {
    label: "Schedule",
    route: "/schedule",
  },
];

export const noteDefaultValues = {
  title: "",
  content: "",
  categoryId: "",
};

export const gradeDefaultValues = {
  assignment: "",
  credits: 0,
  letter: "",
};

export const eventDefaultValues = {
  title: "",
  description: "",
  dateTime: new Date(),
};
