export function validate(form) {
  const errors = {};

  if (!form.fullName.trim())
    errors.fullName = "Full name is required.";

  if (!form.email.trim())
    errors.email = "Email is required.";

  if (!form.phone.trim())
    errors.phone = "Phone is required.";

  if (!form.deliveryMethod)
    errors.deliveryMethod = "Select delivery method.";

  if (!form.paymentMethod)
    errors.paymentMethod = "Select payment method.";

  if (form.deliveryMethod === "Home Delivery") {
    if (!form.address.trim())
      errors.address = "Address is required.";

    if (!form.city.trim())
      errors.city = "City is required.";

    if (!form.country.trim())
      errors.country = "Country is required.";
  }

  if (form.deliveryMethod === "Pick Up" && !form.pickupLocation)
    errors.pickupLocation = "Select pickup location.";

  return errors;
}