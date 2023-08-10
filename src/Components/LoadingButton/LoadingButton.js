import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingButton({
  loading,
  children,
  iconProps,
  ...props
}) {
  return (
    <button disabled={loading} {...props}>
      {loading ? (
        <AiOutlineLoading className="loading" {...iconProps} />
      ) : (
        children
      )}
    </button>
  );
}
