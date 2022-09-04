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
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",

    alignItems: "center",
    borderBottom: "2px solid #DDD",
  },
  logo: {
    marginLeft: "100px",
  },
  SignoutContainer: {
    marginRight: "100px",
  },
  btn: {
    ...btn,
    ...flexAlignJustifyCenter,
  },
});
export default styles;
