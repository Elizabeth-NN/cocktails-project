import CocktailCard from './CocktailCard';

const CocktailList = ({ cocktails, isLoading, handleViewDetails, handleEdit, handleDelete }) => {
  if (!cocktails.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No cocktails found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cocktails.map(cocktail => (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CocktailList;