import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/cocktails';

const CocktailsPage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [editingCocktail, setEditingCocktail] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // New state for form visibility

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
      setShowAddForm(false); // Hide form after submission
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
    setShowAddForm(true); // Show form when editing
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

  // State for the filter
  const [drinkType, setDrinkType] = useState('all');

  // Filter function
  const filteredCocktails = cocktails.filter(cocktail => {
    if (drinkType === 'all') return true;
    if (drinkType === 'alcoholic') return cocktail.alcoholic===true;
    if (drinkType === 'non-alcoholic') return cocktail.alcoholic===false
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
      
      {/* Cocktail Form - Conditionally rendered */}
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
          <div key={cocktail.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {cocktail.image && (
              <img 
                src={cocktail.image} 
                alt={cocktail.name} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{cocktail.name}</h3>
              <div className="mb-3">
                <h4 className="font-medium text-gray-700">Ingredients:</h4>
                <ul className="list-disc list-inside">
                  {cocktail.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{renderIngredient(ingredient)}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                 <h4 className="font-medium text-gray-700">Instructions:</h4>
                 <p>{cocktail.instructions}</p>
               </div>
               <div className="flex space-x-2">
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
  </>
  );
};

export default CocktailsPage;

