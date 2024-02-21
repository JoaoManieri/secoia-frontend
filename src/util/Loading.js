import { Hourglass } from "react-loader-spinner";

export default function LoadingComponent() {
  return (
    <Hourglass
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  );
}
