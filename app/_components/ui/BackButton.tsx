const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="touch-manipulation text-black cursor-pointer h-10 font-light mb-2"
    >
      {" "}
      {`<-`} Go back
    </button>
  );
};

export default BackButton;
