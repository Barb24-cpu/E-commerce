export default function CustomerInfo({
  fullName, email, phone,
  setFullName, setEmail, setPhone, errors
}) {
  return (
    <section className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-bold mb-4">
        👤 Customer Information
      </h2>

      <Field label="Full Name *" value={fullName}
        change={setFullName} error={errors.fullName} />

      <Field label="Email *" value={email}
        change={setEmail} error={errors.email} type="email" />

      <Field label="Phone *" value={phone}
        change={setPhone} error={errors.phone} type="tel" />
    </section>
  );
}

function Field({ label, value, change, error, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => change(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-lg outline-none"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
