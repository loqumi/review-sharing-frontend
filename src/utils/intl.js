export const intl = (item = {}) => {
  const lang = localStorage.getItem("lang") || "en";

  return item[lang] || "";
};
