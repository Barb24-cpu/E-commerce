export default function DeliveryInfo({
  deliveryMethod, setDeliveryMethod,
  address, setAddress, city, setCity,
  country, setCountry, pickupLocation,
  setPickupLocation, pickupLocations, errors
}) {
  return (
    <section className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-bold mb-4">
        🚚 Delivery Information
      </h2>

      <label className="flex gap-3 p-3 border rounded-lg mb-3">
        <input type="radio" name="delivery" value="Home Delivery"
          checked={deliveryMethod === "Home Delivery"}
          onChange={(e) => setDeliveryMethod(e.target.value)} />
        <span>Home Delivery — KSh 300</span>
      </label>

      <label className="flex gap-3 p-3 border rounded-lg">
        <input type="radio" name="delivery" value="Pick Up"
          checked={deliveryMethod === "Pick Up"}
          onChange={(e) => setDeliveryMethod(e.target.value)} />
        <span>Pick Up — Free</span>
      </label>

      {errors.deliveryMethod && <Error text={errors.deliveryMethod} />}

      {deliveryMethod === "Home Delivery" && (
        <HomeFields address={address} setAddress={setAddress}
          city={city} setCity={setCity} country={country}
          setCountry={setCountry} errors={errors} />
      )}

      {deliveryMethod === "Pick Up" && (
        <select value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="w-full mt-4 p-3 border rounded-lg">
          <option value="">Select pickup location</option>
          {pickupLocations.map((loc) => <option key={loc}>{loc}</option>)}
        </select>
      )}

      {errors.pickupLocation && <Error text={errors.pickupLocation} />}
    </section>
  );
}

function Error({ text }) {
  return <p className="text-red-500 text-xs mt-1">{text}</p>;
}

function HomeFields({ address, setAddress, city, setCity, country, setCountry, errors }) {
  return (
    <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg">
      <Input label="Address" value={address} set={setAddress} error={errors.address} />
      <Input label="City" value={city} set={setCity} error={errors.city} />
      <Input label="Country" value={country} set={setCountry} error={errors.country} />
    </div>
  );
}

function Input({ label, value, set, error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label} *</label>
      <input value={value} onChange={(e) => set(e.target.value)}
        className="w-full p-2.5 border rounded-lg" />
      {error && <Error text={error} />}
    </div>
  );
}