const btn = {
  backgroundColor: "purple",
  borderRadius: "5px",
  cursor: "pointer",
  width: "150px",
  padding: "5px 10px 5px 10px",
  color: "white",
};
const flexAlignJustifyCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const styles = (theme) => ({
  container: {
    ...flexAlignJustifyCenter,
    flexDirection: "column",
    overflow: "auto",
  },

  row: {
    display: "flex",
    flexDirection: "column",

    width: "80%",
    margin: "10px 0px 10px 0px",
  },
  header: { fontSize: "20px" },

  btn: {
    ...btn,
    ...flexAlignJustifyCenter,
  },
  extendedBtn: {
    ...btn,
    ...flexAlignJustifyCenter,
    width: "98%",
  },
  blueText: {
    color: "blue",
  },
  orangeText: {
    color: "orange",
  },
  dialogRow: {
    ...flexAlignJustifyCenter,
    justifyContent: "space-between",
    width: "70%",
    marginTop: "10px",
  },
});
export default styles;
