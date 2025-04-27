const CocktailForm = ({
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    editingCocktail,
    resetForm,
    setShowAddForm
  }) => (
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
              Contents (comma separated)
            </label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">price</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            type="number"
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
  );
  
  export default CocktailForm;