import { Link } from 'react-router-dom';
import { FaCocktail, FaLeaf, FaStar, FaGlassCheers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-amber-50">
   
      {/* Our Story */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">
            <span className="border-b-4 border-amber-600 pb-2">Our Story</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-4">
                Founded in Nairobi, Maji-Mazuri (Swahili for "excellent waters") began as a small 
                rooftop bar with a passion for reinventing classic cocktails using local ingredients.
              </p>
              <p className="text-lg mb-6">
                Today, we're a award-winning mixology hub featured in 
                <span className="font-semibold"> "Top 50 Bars in Africa 2023"</span>.
              </p>
              <Link 
                to="/cocktails" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Explore Our Creations
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Maji-Mazuri bar interior" 
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-800 mb-12 text-center">
            <span className="border-b-4 border-amber-600 pb-2">Why Choose Us</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaCocktail className="text-4xl mb-4 text-amber-600" />,
                title: "100+ Recipes",
                desc: "From timeless classics to innovative signatures"
              },
              {
                icon: <FaLeaf className="text-4xl mb-4 text-amber-600" />,
                title: "Locally Sourced",
                desc: "Fresh ingredients from Kenyan farms"
              },
              {
                icon: <FaStar className="text-4xl mb-4 text-amber-600" />,
                title: "Expert Mixologists",
                desc: "Trained in world-class cocktail techniques"
              },
              {
                icon: <FaGlassCheers className="text-4xl mb-4 text-amber-600" />,
                title: "Sustainability",
                desc: "Zero-waste bar program"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                {item.icon}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;