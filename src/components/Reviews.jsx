import React from 'react';

const Reviews = ({ reviews }) => {
    return(
          <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                What Our Customers Say
              </h2>

              <p className="text-gray-600 mt-2">
                Trusted by buyers and independent sellers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <div>
                  key={review.id}
                  className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
                
                  /* Rating Stars */
                  <div className="flex mb-4">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span>
                        key={index}
                        className="text-[#FF6A00] text-xl mr-1"
                      
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-5 italic">
                    "{review.comment}"
                  </p>

                  <h4 className="font-bold text-gray-900">
                    {review.name}
                  </h4>

                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
};

export default Reviews;