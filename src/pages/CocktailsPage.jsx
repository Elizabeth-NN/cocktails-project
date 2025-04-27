
import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/cocktails';

const CocktailsPage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [editingCocktail, setEditingCocktail] = useState(null);
  const [selectedCocktail, setSelectedCocktail] = useState(null); // New state for viewing details
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [drinkType, setDrinkType] = useState('all');

  // Fetch all cocktails
  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch cocktails');
      }
      const data = await response.json();
      setCocktails(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cocktails:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Convert ingredient input string to array of ingredients
  const parseIngredients = (ingredientsString) => {
    return ingredientsString.split(',')
      .map(item => {
        const trimmed = item.trim();
        const parts = trimmed.split(',').map(part => part.trim());
        if (parts.length > 1) {
          return { 
            name: parts[0], 
            amount: parts.slice(1).join(', ')
          };
        }
        return trimmed;
      });
  };

  // Convert ingredients array back to display string for editing
  const formatIngredientsForDisplay = (ingredientsArray) => {
    return ingredientsArray.map(ingredient => {
      if (typeof ingredient === 'object') {
        return `${ingredient.name}${ingredient.amount ? `, ${ingredient.amount}` : ''}`;
      }
      return ingredient;
    }).join(', ');
  };

  // Create or Update a cocktail
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const ingredientsArray = parseIngredients(formData.ingredients);
      
      const cocktailData = {
        name: formData.name,
        ingredients: ingredientsArray,
        instructions: formData.instructions,
        image: formData.image
      };

      let response;
      if (editingCocktail) {
        response = await fetch(`${API_URL}/${editingCocktail.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cocktailData),
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cocktailData),
        });
      }

      if (!response.ok) {
        throw new Error(editingCocktail ? 'Failed to update cocktail' : 'Failed to create cocktail');
      }

      fetchCocktails();
      resetForm();
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
      console.error('Error saving cocktail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit a cocktail
  const handleEdit = (cocktail) => {
    setEditingCocktail(cocktail);
    setFormData({
      name: cocktail.name,
      ingredients: formatIngredientsForDisplay(cocktail.ingredients),
      instructions: cocktail.instructions,
      image: cocktail.image || ''
    });
    setShowAddForm(true);
  };

  // View cocktail details
  const handleViewDetails = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  // Close details view
  const handleCloseDetails = () => {
    setSelectedCocktail(null);
  };

  // Delete a cocktail
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cocktail?')) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete cocktail');
      }

      fetchCocktails();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting cocktail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      image: ''
    });
    setEditingCocktail(null);
  };

  // Toggle add form visibility
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (editingCocktail) {
      resetForm();
    }
  };

  // Render ingredient item
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

  // Filter function
  const filteredCocktails = cocktails.filter(cocktail => {
    if (drinkType === 'all') return true;
    if (drinkType === 'alcoholic') return cocktail.alcoholic === true;
    if (drinkType === 'non-alcoholic') return cocktail.alcoholic === false;
    return true;
  });

  return (
    <>
      {/* Filter Dropdown */}
      <div className="mb-6 flex items-center">
        <span className="mr-2 font-medium">FILTER-BY:</span>
        <select
          value={drinkType}
          onChange={(e) => setDrinkType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Drinks</option>
          <option value="alcoholic">Alcoholic</option>
          <option value="non-alcoholic">Non-Alcoholic</option>
        </select>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available-Cocktails</h1>
          <button
            onClick={toggleAddForm}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {showAddForm ? 'Hide Form' : 'Add New Cocktail'}
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Cocktail Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingCocktail ? 'Edit Cocktail' : 'Add New Cocktail'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredients (comma separated, use "name, amount" for measurements)
                  </label>
                  <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={isLoading}
                    placeholder="e.g. Tequila, 2 oz, Lime juice, 1 oz, Triple sec, 1 oz"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : editingCocktail ? 'Update' : 'Add'} Cocktail
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowAddForm(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && !cocktails.length && (
          <div className="text-center py-8">Loading cocktails...</div>
        )}
        
        {/* Cocktails List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCocktails.map(cocktail => (
            <div key={cocktail.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {cocktail.image && (
                <img 
                  src={cocktail.image} 
                  alt={cocktail.name} 
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleViewDetails(cocktail)}
                />
              )}
              <div className="p-4">
                <h3 
                  className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => handleViewDetails(cocktail)}
                >
                  {cocktail.name}
                </h3>
                <div className="mb-3">
                  <h4 className="font-medium text-gray-700">Ingredients:</h4>
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
                  <h4 className="font-medium text-gray-700">Instructions:</h4>
                  <p className="line-clamp-2">{cocktail.instructions}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(cocktail)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isLoading}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEdit(cocktail)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:bg-yellow-300"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cocktail.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {!isLoading && !cocktails.length && (
          <div className="text-center py-8 text-gray-500">
            No cocktails found. <button 
              onClick={() => setShowAddForm(true)} 
              className="text-green-600 hover:underline"
            >
              Add your first cocktail!
            </button>
          </div>
        )}
      </div>

      {/* Cocktail Details Modal */}
      {selectedCocktail && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedCocktail.name}</h2>
                <button 
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedCocktail.image && (
                <img 
                  src={selectedCocktail.image} 
                  alt={selectedCocktail.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedCocktail.ingredients.map((ingredient, idx) => (
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
                    <p><span className="font-medium">Category:</span> {selectedCocktail.category || 'N/A'}</p>
                    <p><span className="font-medium">Glass:</span> {selectedCocktail.glass || 'N/A'}</p>
                    <p><span className="font-medium">Alcoholic:</span> {selectedCocktail.alcoholic ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <p className="whitespace-pre-line">{selectedCocktail.instructions}</p>
              </div>

              <div className="mt-6 flex space-x-2">
                <button
                  onClick={() => {
                    handleCloseDetails();
                    handleEdit(selectedCocktail);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit This Cocktail
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this cocktail?')) {
                      handleDelete(selectedCocktail.id);
                      handleCloseDetails();
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete This Cocktail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CocktailsPage;

