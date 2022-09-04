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
  container: { height: "700px", overFlowY: "auto" },
  capitalize: {
    textTransform: "capitalize",
  },
  darkRow: { backgroundColor: "#DDD" },
  paginationContainer: {
    ...flexAlignJustifyCenter,
    marginTop: "10px",
  },
  paginationToast: {
    ...flexAlignJustifyCenter,
  },
  archived: {
    backgroundColor: "aquamarine",
    color: "cornflowerblue",
    padding: "2px 5px 2px 5px",
    borderRadius: "5px",
    ...flexAlignJustifyCenter,
  },
  unArchive: {
    backgroundColor: "darkgrey",
    color: "darkslategrey",
    padding: "2px 5px 2px 5px",
    borderRadius: "5px",
    ...flexAlignJustifyCenter,
  },
  blueText: {
    color: "blue",
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
  durationContainer: {
    ...flexAlignJustifyCenter,
    flexDirection: "column",
  },
  btn: {
    ...btn,
    ...flexAlignJustifyCenter,
  },
});
export default styles;
