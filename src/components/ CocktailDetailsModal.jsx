const CocktailDetailsModal = ({ cocktail, onClose, onEdit, onDelete }) => {
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
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{cocktail.name}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {cocktail.image && (
              <img 
                src={cocktail.image} 
                alt={cocktail.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="space-y-1">
                  {cocktail.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                      {renderIngredient(ingredient)}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Category:</span> {cocktail.category || 'N/A'}</p>
                  <p><span className="font-medium">Glass:</span> {cocktail.glass || 'N/A'}</p>
                  <p><span className="font-medium">Alcoholic:</span> {cocktail.alcoholic ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <p className="whitespace-pre-line">{cocktail.instructions}</p>
            </div>
  
            <div className="mt-6 flex space-x-2">
              <button
                onClick={onEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit This Cocktail
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete This Cocktail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CocktailDetailsModal;