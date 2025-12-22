const Card = ({ children }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-green-900">
      {children}
    </div>
  );
};

export default Card;
