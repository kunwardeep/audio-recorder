// eslint-disable-next-line @arthurgeron/react-usememo/require-memo
const ErrorComponent = ({ error }: { error: Error }) => {
  return <div>ERROR - {error.message}</div>;
};

export default ErrorComponent;
