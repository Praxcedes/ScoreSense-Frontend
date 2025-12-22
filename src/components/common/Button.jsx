const Button = ({ children }) => {
  return (
    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
      {children}
    </button>
  );
};

export default Button;
