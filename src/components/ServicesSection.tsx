export default function ServicesSection() {
  return (
    <section id="services" className="container mx-auto px-6 md:px-12 py-12 border-b border-gray-300">
      <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-2">Service 1</h3>
          <p className="text-gray-700">Description of Service 1.</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-2">Service 2</h3>
          <p className="text-gray-700">Description of Service 2.</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-2">Service 3</h3>
          <p className="text-gray-700">Description of Service 3.</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <a href="/services" className="text-blue-600 font-medium hover:underline">
          See More Products
        </a>
      </div>
    </section>
  );
}
