import React, { useState, useEffect } from 'react';
import CocktailList from '../components/CocktailList';
import CocktailDetailsModal from '../components/ CocktailDetailsModal';
import CocktailFilter from '../components/CocktailFilter';
import CocktailForm from '../components/CocktailForm';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';


const API_URL = 'http://localhost:3000/cocktails';

const CocktailsPage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [editingCocktail, setEditingCocktail] = useState(null);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
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

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch cocktails');
      const data = await response.json();
      setCocktails(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cocktails:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parseIngredients = (ingredientsString) => {
    return ingredientsString.split(',')
      .map(item => {
        const trimmed = item.trim();
        const parts = trimmed.split(',').map(part => part.trim());
        if (parts.length > 1) return { name: parts[0], amount: parts.slice(1).join(', ') };
        return trimmed;
      });
  };

  const formatIngredientsForDisplay = (ingredientsArray) => {
    return ingredientsArray.map(ingredient => {
      if (typeof ingredient === 'object') {
        return `${ingredient.name}${ingredient.amount ? `, ${ingredient.amount}` : ''}`;
      }
      return ingredient;
    }).join(', ');
  };

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

      const url = editingCocktail ? `${API_URL}/${editingCocktail.id}` : API_URL;
      const method = editingCocktail ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cocktailData),
      });

      if (!response.ok) throw new Error(editingCocktail ? 'Failed to update' : 'Failed to create');
      
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cocktail?')) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      fetchCocktails();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting cocktail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', ingredients: '', instructions: '', image: '' });
    setEditingCocktail(null);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (editingCocktail) resetForm();
  };

  const filteredCocktails = cocktails.filter(cocktail => {
    if (drinkType === 'all') return true;
    if (drinkType === 'alcoholic') return cocktail.alcoholic === true;
    if (drinkType === 'non-alcoholic') return cocktail.alcoholic === false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <CocktailFilter 
        drinkType={drinkType} 
        setDrinkType={setDrinkType} 
      />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Cocktails</h1>
        <button
          onClick={toggleAddForm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showAddForm ? 'Hide Form' : 'Add New Cocktail'}
        </button>
      </div>
      
      <ErrorMessage error={error} />
      
      {showAddForm && (
        <CocktailForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          editingCocktail={editingCocktail}
          resetForm={resetForm}
          setShowAddForm={setShowAddForm}
        />
      )}
      
      {isLoading && !cocktails.length ? (
        <LoadingSpinner />
      ) : (
        <CocktailList
          cocktails={filteredCocktails}
          isLoading={isLoading}
          handleViewDetails={setSelectedCocktail}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      
      {selectedCocktail && (
        <CocktailDetailsModal
          cocktail={selectedCocktail}
          onClose={() => setSelectedCocktail(null)}
          onEdit={() => {
            setSelectedCocktail(null);
            handleEdit(selectedCocktail);
          }}
          onDelete={() => {
            if (window.confirm('Are you sure you want to delete this cocktail?')) {
              handleDelete(selectedCocktail.id);
              setSelectedCocktail(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default CocktailsPage;