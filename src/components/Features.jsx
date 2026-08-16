
const Features = () => {
    return (
             <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose SokoPlus?
              </h2>

              <p className="text-gray-600 mt-2">
                Everything you need for a safe and simple shopping experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-[#FF6A00] font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  01
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Independent Sellers
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover products directly from independent merchants.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-[#FF6A00] font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  02
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Protected Payments
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Shop with confidence using our protected payment system.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-[#FF6A00] font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">
                  03
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trusted Marketplace
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Transparent transactions between buyers and sellers.
                </p>
              </div>
            </div>
          </div>
        </section>
    );
};

export default Features;