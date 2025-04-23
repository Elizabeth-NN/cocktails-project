import { Link } from 'react-router-dom';

const CocktailCard = ({ cocktail }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Cocktail Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={cocktail.image} 
          alt={cocktail.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; // Fallback image
          }}
        />
      </div>

      {/* Cocktail Details */}
      <div className="p-4">
        {/* Name and Category */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{cocktail.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            cocktail.alcoholic ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
          }`}>
            {cocktail.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
          </span>
        </div>

        {/* Glass Type */}
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Glass:</span> {cocktail.glass}
        </p>

        {/* Ingredients  */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {cocktail.ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.amount}
              </li>
            ))}
            {cocktail.ingredients.length > 3 && (
              <li className="text-amber-600">+{cocktail.ingredients.length - 3} more</li>
            )}
          </ul>
        </div>

        {/* Price and Details Link */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-amber-600">${cocktail.price.toFixed(2)}</span>
          
          <Link 
            to={`/cocktails/${cocktail.id}`}
            className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;