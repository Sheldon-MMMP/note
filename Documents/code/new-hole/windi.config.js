
// 颜色设置
const color = {
  primary: "rgba(var(--primary-color))",
  'primary-light': "var(--primary80-color)",
  "icon": "var(--icon-color)",
  "primary-black": "rgb(var(--primary-black-color))",
  white: "rgba(var(--white-color))"
}

export default {
  /* configurations... */
  preflight: true,
  theme: {
      colors: {
        ...color,
      },
      backgroundColor: {
        ...color,
      },
      borderColor: {
        ...color,
      }
    
  },
  shortcuts: {
    flexCC: "flex justify-center items-center",
    flexAC: "flex justify-around items-center",
    flexBC: "flex justify-between items-center",
  }
}
