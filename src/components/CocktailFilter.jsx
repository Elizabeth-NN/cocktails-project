const CocktailFilter = ({ drinkType, setDrinkType }) => (
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
  );
  
  export default CocktailFilter;