import CocktailCard from './CocktailCard';

const CocktailList = ({ cocktails }) => {
  return (
    <>
    <h2 className="text-3xl font-bold text-amber-800 mt-8 mb-8 text-center">
            <span className="border-b-4 border-amber-600 pb-2">Our Cocktails</span>
          </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {cocktails.map(cocktail => (
        <CocktailCard key={cocktail.id} cocktail={cocktail} />
      ))}
    </div>
    </>
  );
};

export default CocktailList;