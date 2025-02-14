export default function FormSection() {
  return (
    <section id="form-section" className="container mx-auto px-6 md:px-12 py-12 border-b border-gray-300">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <input type="radio" name="option" value="nnn" className="mr-2" />
              I'm just getting started, and looking for an NNN
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <input type="radio" name="option" value="protect-business" className="mr-2" />
              I'm looking to protect my business
            </label>
          </div>
          <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
