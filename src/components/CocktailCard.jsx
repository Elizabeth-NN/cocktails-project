const CocktailCard = ({ cocktail, isLoading, onViewDetails, onEdit, onDelete }) => {
  const renderIngredient = (ingredient) => {
    if (typeof ingredient === 'object') {
      return (
        <span>
          <strong>{ingredient.name}</strong>
          {ingredient.amount && `: ${ingredient.amount}`}
        </span>
      );
    }
    return ingredient;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {cocktail.image && (
        <img 
          src={cocktail.image} 
          alt={cocktail.name} 
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onViewDetails(cocktail)}
        />
      )}
      <div className="p-4">
        <h3 
          className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600"
          onClick={() => onViewDetails(cocktail)}
        >
          {cocktail.name}
        </h3>
        <div className="mb-3">
          <h4 className="font-medium text-gray-700">Contents:</h4>
          <ul className="list-disc list-inside">
            {cocktail.ingredients.slice(0, 3).map((ingredient, idx) => (
              <li key={idx}>{renderIngredient(ingredient)}</li>
            ))}
            {cocktail.ingredients.length > 3 && (
              <li className="text-blue-600">+ {cocktail.ingredients.length - 3} more</li>
            )}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-medium text-gray-700">price
            :</h4>
          <p className="line-clamp-2">${cocktail.price
            }</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(cocktail)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(cocktail)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:bg-yellow-300"
            disabled={isLoading}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(cocktail.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;