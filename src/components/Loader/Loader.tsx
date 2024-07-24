import spinner from "../../assets/spinner.svg";

function Loader() {
  return (
    <img
      src={spinner}
      style={{
        alignSelf: "center",
        position: "relative",
        top: "35%",
      }}
    />
  );
}

export default Loader;
