const Card = ({ children }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow">
      {children}
    </div>
  );
};

export default Card;
